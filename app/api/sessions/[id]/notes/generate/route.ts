// app/api/sessions/[id]/notes/generate/route.ts - Generate AI session notes

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateSessionNotes } from '@/lib/openai';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get auth header
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { transcript, roughNotes, presentingIssue } = body;

    if (!transcript && !roughNotes) {
      return NextResponse.json(
        { error: 'Either transcript or roughNotes is required' },
        { status: 400 }
      );
    }

    // Get session details
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database admin client not configured' },
        { status: 500 }
      );
    }

    const { data: session, error: sessionError } = await supabaseAdmin
      .from('sessions')
      .select(`
        *,
        patients(first_name, last_name),
        therapists(name)
      `)
      .eq('id', params.id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Generate AI notes
    const aiNotes = await generateSessionNotes({
      patientName: `${session.patients?.first_name} ${session.patients?.last_name}`,
      therapistName: session.therapists?.name || 'Therapist',
      sessionDate: session.appointment_date,
      sessionType: session.session_type,
      transcript: transcript || undefined,
      roughNotes: roughNotes || undefined,
      presentingIssue: presentingIssue || session.presenting_issue || undefined,
    });

    // Save to database
    const { data: sessionNote, error: noteError } = await supabaseAdmin
      .from('session_notes')
      .upsert({
        session_id: params.id,
        therapist_id: session.therapist_id,
        patient_id: session.patient_id,
        transcript: transcript || null,
        ai_generated_draft: JSON.stringify(aiNotes),
        soap_subjective: aiNotes?.soap_subjective || null,
        soap_objective: aiNotes?.soap_objective || null,
        soap_assessment: aiNotes?.soap_assessment || null,
        soap_plan: aiNotes?.soap_plan || null,
      }, {
        onConflict: 'session_id'
      })
      .select()
      .single();

    if (noteError) {
      console.error('Error saving session notes:', noteError);
      return NextResponse.json(
        { error: 'Failed to save session notes' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      sessionNote,
      aiNotes,
    });
  } catch (error) {
    console.error('Error generating session notes:', error);
    return NextResponse.json(
      { error: 'Failed to generate session notes' },
      { status: 500 }
    );
  }
}
