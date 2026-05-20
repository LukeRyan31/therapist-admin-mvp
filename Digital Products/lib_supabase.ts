// lib/supabase.ts - Supabase client configuration

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side operations with elevated privileges
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Type definitions for database tables
export type Therapist = {
  id: string;
  email: string;
  name: string;
  practice_name: string | null;
  license_number: string | null;
  credentials: string | null;
  created_at: string;
  updated_at: string;
};

export type Patient = {
  id: string;
  therapist_id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  date_of_birth: string | null;
  insurance_provider: string | null;
  insurance_member_id: string | null;
  insurance_group_number: string | null;
  copay_amount: number | null;
  session_rate: number | null;
  intake_date: string | null;
  status: "active" | "paused" | "completed";
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Session = {
  id: string;
  therapist_id: string;
  patient_id: string;
  appointment_date: string;
  duration_minutes: number;
  status: "scheduled" | "completed" | "cancelled";
  session_type: "individual" | "couples" | "family" | "group";
  presenting_issue: string | null;
  created_at: string;
  updated_at: string;
};

export type SessionNote = {
  id: string;
  therapist_id: string;
  session_id: string;
  patient_id: string;
  transcript: string | null;
  ai_generated_draft: string | null;
  final_note: string | null;
  soap_subjective: string | null;
  soap_objective: string | null;
  soap_assessment: string | null;
  soap_plan: string | null;
  follow_up_actions: string | null;
  created_at: string;
  updated_at: string;
};

export type Invoice = {
  id: string;
  therapist_id: string;
  patient_id: string;
  session_id: string | null;
  amount: number;
  status: "pending" | "sent" | "paid" | "overdue";
  invoice_date: string;
  due_date: string;
  paid_date: string | null;
  notes: string | null;
  stripe_invoice_id: string | null;
  created_at: string;
  updated_at: string;
};

export type InsurancePreauth = {
  id: string;
  therapist_id: string;
  patient_id: string;
  insurance_company: string;
  status: "pending" | "submitted" | "approved" | "denied" | "expired";
  auth_number: string | null;
  number_of_sessions: number | null;
  expiration_date: string | null;
  verification_date: string | null;
  submitted_date: string | null;
  required_documents: string | null; // JSON array
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Task = {
  id: string;
  therapist_id: string;
  patient_id: string | null;
  title: string;
  description: string | null;
  task_type: "follow_up" | "admin" | "documentation" | "billing" | "insurance" | null;
  priority: "low" | "medium" | "high";
  status: "open" | "completed" | "snoozed";
  due_date: string | null;
  ai_generated: boolean;
  created_at: string;
  updated_at: string;
};

// Utility function to get current therapist
export async function getCurrentTherapist() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("therapists")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) return null;
  return data as Therapist;
}

// Utility function to check authentication
export async function isAuthenticated() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return !!user;
}

// Utility function to get current user ID
export async function getCurrentUserId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id || null;
}
