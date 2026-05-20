// lib/openai.ts - OpenAI API integrations for AI-powered features

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate AI session notes from transcript or rough notes
export async function generateSessionNotes(input: {
  patientName: string;
  therapistName: string;
  sessionDate: string;
  sessionType:
    | "individual"
    | "couples"
    | "family"
    | "group";
  transcript?: string;
  roughNotes?: string;
  presentingIssue?: string;
}) {
  const content = `
You are an experienced clinical note-taking assistant for therapists. Generate professional, comprehensive session notes.

Patient: ${input.patientName}
Therapist: ${input.therapistName}
Date: ${input.sessionDate}
Session Type: ${input.sessionType}
${input.presentingIssue ? `Presenting Issue: ${input.presentingIssue}` : ""}

${input.transcript ? `Transcript:\n${input.transcript}` : ""}
${input.roughNotes ? `Therapist Notes:\n${input.roughNotes}` : ""}

Please generate:
1. A concise professional summary (2-3 paragraphs)
2. SOAP note format:
   - Subjective: What the client reported
   - Objective: Observations, behaviors
   - Assessment: Clinical impression
   - Plan: Next steps and interventions

Format as JSON with keys: summary, soap_subjective, soap_objective, soap_assessment, soap_plan

Ensure all notes are:
- Clinically appropriate and professional
- Compliant with documentation standards
- Focused on clinical relevance
- Free of unnecessary detail
- HIPAA-aware (minimal PII, focus on clinical content)
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content,
      },
    ],
    temperature: 0.5,
    max_tokens: 1500,
  });

  try {
    const text = response.choices[0].message.content || "";
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return {
      summary: text,
      soap_subjective: "",
      soap_objective: "",
      soap_assessment: "",
      soap_plan: "",
    };
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return null;
  }
}

// Transcribe audio to text using Whisper
export async function transcribeAudio(audioBuffer: Buffer) {
  const file = new File([audioBuffer], "audio.mp3", { type: "audio/mpeg" });

  const response = await openai.audio.transcriptions.create({
    model: "whisper-1",
    file: file,
  });

  return response.text;
}

// Generate AI recommendations for pending tasks
export async function generateAIRecommendations(input: {
  patientName: string;
  recentSessions: Array<{
    date: string;
    notes: string;
    issues: string[];
  }>;
  pendingPreauths: string[];
  unpaidInvoices: string[];
  incompleteNotes: string[];
}) {
  const content = `
You are an administrative assistant helping a therapist stay organized and efficient.

Patient: ${input.patientName}

Recent Sessions:
${input.recentSessions
  .map(
    (s) => `
- ${s.date}: ${s.issues.join(", ")}
  Notes: ${s.notes}
`
  )
  .join("")}

Pending Insurance Pre-auths: ${input.pendingPreauths.join(", ") || "None"}
Unpaid Invoices: ${input.unpaidInvoices.join(", ") || "None"}
Incomplete Notes: ${input.incompleteNotes.join(", ") || "None"}

Please provide 3-5 specific, actionable task recommendations. Focus on:
1. Follow-up actions from recent sessions
2. Documentation that needs completion
3. Insurance verifications
4. Billing/payment follow-ups
5. Treatment planning

Format as JSON with key "tasks" containing an array of objects with: title, description, priority (low/medium/high), taskType (follow_up/admin/documentation/billing/insurance)
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content,
      },
    ],
    temperature: 0.5,
    max_tokens: 1000,
  });

  try {
    const text = response.choices[0].message.content || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed.tasks || [];
    }
    return [];
  } catch (error) {
    console.error("Error parsing AI recommendations:", error);
    return [];
  }
}

// Extract insurance information from documents (mock for MVP)
export async function extractInsuranceInfo(documentText: string) {
  const content = `
Extract the following information from this insurance document. Return JSON with:
- provider_name
- member_id
- group_number
- plan_type
- copay_amount
- deductible
- out_of_pocket_max

Document:
${documentText}

Return only valid JSON with extracted values or null for missing fields.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content,
      },
    ],
    temperature: 0.3,
    max_tokens: 500,
  });

  try {
    const text = response.choices[0].message.content || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return {};
  } catch (error) {
    console.error("Error extracting insurance info:", error);
    return {};
  }
}

// Generate summary of patient progress
export async function generateProgressSummary(input: {
  patientName: string;
  startDate: string;
  endDate: string;
  sessionCount: number;
  presentingIssues: string[];
  completedGoals: string[];
  currentStatus: string;
}) {
  const content = `
Write a brief clinical progress summary for a therapy client.

Patient: ${input.patientName}
Period: ${input.startDate} to ${input.endDate}
Number of Sessions: ${input.sessionCount}

Presenting Issues: ${input.presentingIssues.join(", ")}
Completed Goals: ${input.completedGoals.join(", ")}
Current Status: ${input.currentStatus}

Generate a 2-3 paragraph professional summary suitable for:
- Insurance companies
- Treatment planning reviews
- Client progress reports

Ensure it's:
- Objective and factual
- Focused on therapeutic progress
- Appropriate for sharing with insurance
- HIPAA-compliant`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content,
      },
    ],
    temperature: 0.5,
    max_tokens: 800,
  });

  return response.choices[0].message.content || "";
}
