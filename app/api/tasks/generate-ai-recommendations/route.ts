// app/api/tasks/generate-ai-recommendations/route.ts - Generate AI task recommendations

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateAIRecommendations } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    // Get auth header
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { patientId } = body;

    if (!patientId) {
      return NextResponse.json(
        { error: 'patientId is required' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database admin client not configured' },
        { status: 500 }
      );
    }

    // Get patient info
    const { data: patient, error: patientError } = await supabaseAdmin
      .from('patients')
      .select('*')
      .eq('id', patientId)
      .single();

    if (patientError || !patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    // Get recent sessions
    const { data: sessions, error: sessionsError } = await supabaseAdmin
      .from('sessions')
      .select('appointment_date, presenting_issue')
      .eq('patient_id', patientId)
      .order('appointment_date', { ascending: false })
      .limit(5);

    // Get pending pre-auths
    const { data: preauths, error: preAuthError } = await supabaseAdmin
      .from('insurance_preauths')
      .select('insurance_company, status')
      .eq('patient_id', patientId)
      .eq('status', 'pending');

    // Get unpaid invoices
    const { data: invoices, error: invoicesError } = await supabaseAdmin
      .from('invoices')
      .select('id, amount, due_date')
      .eq('patient_id', patientId)
      .eq('status', 'unpaid');

    // Get incomplete session notes
    const { data: incompleteNotes, error: notesError } = await supabaseAdmin
      .from('session_notes')
      .select('id, session_id')
      .eq('patient_id', patientId)
      .is('final_note', null)
      .limit(5);

    // Prepare data for AI
    const recentSessions = (sessions || []).map((s) => ({
      date: s.appointment_date,
      notes: 'Session completed',
      issues: s.presenting_issue ? [s.presenting_issue] : [],
    }));

    const pendingPreauths = (preauths || []).map((p) => p.insurance_company);
    const unpaidInvoices = (invoices || []).map((i) => `Invoice #${i.id} - $${i.amount}`);
    const incompleteNotesList = (incompleteNotes || []).map((n) => `Session ${n.session_id}`);

    // Generate AI recommendations
    const aiRecommendations = await generateAIRecommendations({
      patientName: `${patient.first_name} ${patient.last_name}`,
      recentSessions: recentSessions.length > 0 ? recentSessions : [{
        date: new Date().toISOString().split('T')[0],
        notes: 'No recent sessions',
        issues: [],
      }],
      pendingPreauths,
      unpaidInvoices,
      incompleteNotes: incompleteNotesList,
    });

    // Create tasks in database
    const therapistId = patient.therapist_id;
    const createdTasks = [];

    for (const task of aiRecommendations) {
      const { data: createdTask, error: createError } = await supabaseAdmin
        .from('tasks')
        .insert({
          therapist_id: therapistId,
          patient_id: patientId,
          title: task.title,
          description: task.description,
          task_type: task.taskType || 'follow_up',
          priority: task.priority || 'medium',
          status: 'open',
          ai_generated: true,
        })
        .select()
        .single();

      if (!createError && createdTask) {
        createdTasks.push(createdTask);
      }
    }

    return NextResponse.json({
      success: true,
      tasksCreated: createdTasks.length,
      tasks: createdTasks,
      recommendations: aiRecommendations,
    });
  } catch (error) {
    console.error('Error generating AI recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
