// app/api/tasks/generate-ai-recommendations/route.ts
// Generate AI task recommendations based on patient activity

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateAIRecommendations } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { patientId } = body;

    if (!patientId) {
      return NextResponse.json(
        { error: "Patient ID required" },
        { status: 400 }
      );
    }

    // Get patient details
    const { data: patient } = await supabase
      .from("patients")
      .select("*")
      .eq("id", patientId)
      .eq("therapist_id", user.id)
      .single();

    if (!patient) {
      return NextResponse.json(
        { error: "Patient not found" },
        { status: 404 }
      );
    }

    // Get recent sessions
    const { data: recentSessions } = await supabase
      .from("sessions")
      .select(
        `
        *,
        session_notes(final_note, follow_up_actions)
      `
      )
      .eq("patient_id", patientId)
      .eq("therapist_id", user.id)
      .order("appointment_date", { ascending: false })
      .limit(5);

    // Get pending pre-auths
    const { data: pendingPreauths } = await supabase
      .from("insurance_preauths")
      .select("insurance_company, status")
      .eq("patient_id", patientId)
      .eq("therapist_id", user.id)
      .eq("status", "pending");

    // Get unpaid invoices
    const { data: unpaidInvoices } = await supabase
      .from("invoices")
      .select("id, amount")
      .eq("patient_id", patientId)
      .eq("therapist_id", user.id)
      .eq("status", "pending");

    // Get incomplete notes
    const { data: incompleteNotes } = await supabase
      .from("session_notes")
      .select("id, session_id")
      .eq("patient_id", patientId)
      .eq("therapist_id", user.id)
      .is("final_note", null);

    // Generate recommendations
    const recommendations = await generateAIRecommendations({
      patientName: `${patient.first_name} ${patient.last_name}`,
      recentSessions: (recentSessions || []).map((s) => ({
        date: new Date(s.appointment_date).toLocaleDateString(),
        notes: s.session_notes?.[0]?.final_note || "Session completed",
        issues: s.presenting_issue ? [s.presenting_issue] : [],
      })),
      pendingPreauths: (pendingPreauths || []).map((p) => p.insurance_company),
      unpaidInvoices: (unpaidInvoices || []).map((i) => `$${i.amount}`),
      incompleteNotes: (incompleteNotes || []).map((n) => `Session ${n.id}`),
    });

    // Save recommendations as tasks
    const tasksToCreate = recommendations.map((rec: any) => ({
      therapist_id: user.id,
      patient_id: patientId,
      title: rec.title,
      description: rec.description,
      task_type: rec.taskType || "admin",
      priority: rec.priority || "medium",
      ai_generated: true,
      status: "open",
    }));

    if (tasksToCreate.length > 0) {
      const { data: createdTasks, error: createError } = await supabase
        .from("tasks")
        .insert(tasksToCreate)
        .select();

      if (createError) {
        console.error("Error creating tasks:", createError);
      } else {
        return NextResponse.json({
          success: true,
          tasksCreated: createdTasks.length,
          tasks: createdTasks,
        });
      }
    }

    return NextResponse.json({
      success: true,
      tasksCreated: 0,
      tasks: [],
    });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
