// app/api/sessions/[id]/notes/generate/route.ts
// API endpoint to generate AI session notes

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateSessionNotes } from "@/lib/openai";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get current user
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

    // Get session details
    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select(
        `
        *,
        patients(first_name, last_name),
        therapists(name)
      `
      )
      .eq("id", params.id)
      .eq("therapist_id", user.id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    // Get request body
    const body = await request.json();
    const { transcript, roughNotes } = body;

    if (!transcript && !roughNotes) {
      return NextResponse.json(
        { error: "Either transcript or roughNotes must be provided" },
        { status: 400 }
      );
    }

    // Generate AI notes
    const aiNotes = await generateSessionNotes({
      patientName: `${session.patients.first_name} ${session.patients.last_name}`,
      therapistName: session.therapists.name,
      sessionDate: new Date(session.appointment_date).toLocaleDateString(),
      sessionType: session.session_type,
      transcript,
      roughNotes,
      presentingIssue: session.presenting_issue || undefined,
    });

    if (!aiNotes) {
      return NextResponse.json(
        { error: "Failed to generate notes" },
        { status: 500 }
      );
    }

    // Save to database
    const { data: savedNote, error: saveError } = await supabase
      .from("session_notes")
      .upsert({
        session_id: params.id,
        therapist_id: user.id,
        patient_id: session.patient_id,
        transcript,
        ai_generated_draft: JSON.stringify(aiNotes),
        soap_subjective: aiNotes.soap_subjective,
        soap_objective: aiNotes.soap_objective,
        soap_assessment: aiNotes.soap_assessment,
        soap_plan: aiNotes.soap_plan,
      })
      .select()
      .single();

    if (saveError) {
      console.error("Error saving notes:", saveError);
      return NextResponse.json(
        { error: "Failed to save notes" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      notes: savedNote,
      aiGenerated: aiNotes,
    });
  } catch (error) {
    console.error("Error generating notes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
