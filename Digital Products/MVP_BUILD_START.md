# Therapist Admin Suite MVP - Complete Build Guide

## 🚀 Quick Start (Deploy in 15 Minutes)

This guide walks you through deploying a fully functional AI-powered therapist admin system.

**What you'll have after this:**
- Live web app at your own domain
- AI-powered session notes (OpenAI integration)
- Patient management system
- Insurance pre-auth tracking
- Invoicing & payment tracking
- Calendly integration
- Task management with AI recommendations
- Email automation
- Ready for immediate beta testing with therapists

---

## Prerequisites

- Node.js 18+ installed
- A GitHub account
- A Vercel account (free)
- Supabase account (free tier available)
- OpenAI API key (~$20 credits free)
- Calendly API key
- SendGrid account (free tier: 100 emails/day)
- Stripe account (optional, for payments)

**Time to deploy: 15-20 minutes**
**Time to customize: 30 minutes**
**Time to add demo data: 10 minutes**

---

## Step 1: Create GitHub Repository

```bash
# Create new directory
mkdir therapist-admin-mvp
cd therapist-admin-mvp

# Initialize git
git init
git remote add origin https://github.com/YOUR_USERNAME/therapist-admin-mvp.git
```

---

## Step 2: Set Up Supabase Database

1. Go to https://supabase.com and create a new project
2. Note your **Project URL** and **API Key** (anon/service role)
3. Run the SQL schema below in Supabase SQL Editor:

### Database Schema (Supabase SQL)

```sql
-- Create therapist profile table
CREATE TABLE therapists (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  practice_name TEXT,
  license_number TEXT,
  credentials TEXT,
  calendly_api_key TEXT ENCRYPTED WITH KEY "pgsodium",
  sendgrid_api_key TEXT ENCRYPTED WITH KEY "pgsodium",
  stripe_account_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create patient table
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  date_of_birth DATE,
  insurance_provider TEXT,
  insurance_member_id TEXT,
  insurance_group_number TEXT,
  copay_amount DECIMAL(10,2),
  session_rate DECIMAL(10,2),
  intake_date DATE,
  status TEXT DEFAULT 'active', -- active, paused, completed
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  appointment_date TIMESTAMP NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'scheduled', -- scheduled, completed, cancelled
  session_type TEXT DEFAULT 'individual', -- individual, couples, family, group
  presenting_issue TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create session notes table
CREATE TABLE session_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  transcript TEXT,
  ai_generated_draft TEXT,
  final_note TEXT,
  soap_subjective TEXT,
  soap_objective TEXT,
  soap_assessment TEXT,
  soap_plan TEXT,
  follow_up_actions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create invoices table
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, sent, paid, overdue
  invoice_date DATE NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  notes TEXT,
  stripe_invoice_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create insurance pre-auth table
CREATE TABLE insurance_preauths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  insurance_company TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, submitted, approved, denied, expired
  auth_number TEXT,
  number_of_sessions INTEGER,
  expiration_date DATE,
  verification_date DATE,
  submitted_date DATE,
  required_documents TEXT, -- JSON array of missing docs
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  task_type TEXT, -- 'follow_up', 'admin', 'documentation', 'billing', 'insurance'
  priority TEXT DEFAULT 'medium', -- low, medium, high
  status TEXT DEFAULT 'open', -- open, completed, snoozed
  due_date DATE,
  ai_generated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_patients_therapist ON patients(therapist_id);
CREATE INDEX idx_sessions_therapist ON sessions(therapist_id);
CREATE INDEX idx_sessions_patient ON sessions(patient_id);
CREATE INDEX idx_session_notes_therapist ON session_notes(therapist_id);
CREATE INDEX idx_invoices_therapist ON invoices(therapist_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_tasks_therapist ON tasks(therapist_id);
CREATE INDEX idx_preauth_therapist ON insurance_preauths(therapist_id);

-- Enable RLS (Row Level Security)
ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_preauths ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can only access their own data"
  ON therapists FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can only access their patients"
  ON patients FOR SELECT USING (therapist_id = auth.uid());

CREATE POLICY "Users can only access their sessions"
  ON sessions FOR SELECT USING (therapist_id = auth.uid());

CREATE POLICY "Users can only access their notes"
  ON session_notes FOR SELECT USING (therapist_id = auth.uid());

CREATE POLICY "Users can only access their invoices"
  ON invoices FOR SELECT USING (therapist_id = auth.uid());

CREATE POLICY "Users can only access their preauths"
  ON insurance_preauths FOR SELECT USING (therapist_id = auth.uid());

CREATE POLICY "Users can only access their tasks"
  ON tasks FOR SELECT USING (therapist_id = auth.uid());

-- Create write policies
CREATE POLICY "Users can insert their own data"
  ON patients FOR INSERT WITH CHECK (therapist_id = auth.uid());

CREATE POLICY "Users can update their own data"
  ON patients FOR UPDATE USING (therapist_id = auth.uid());

CREATE POLICY "Users can delete their own data"
  ON patients FOR DELETE USING (therapist_id = auth.uid());

-- Apply similar write policies to other tables (same pattern)
```

---

## Step 3: Create Next.js Project

```bash
# Create Next.js app
npx create-next-app@latest . --typescript --tailwind --no-eslint

# Install dependencies
npm install @supabase/supabase-js openai axios date-fns zustand next-auth clsx
```

---

## Step 4: Environment Variables

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Calendly
CALENDLY_API_KEY=your_calendly_api_key

# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key

# Stripe (optional)
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 5: Project Structure

Create this folder structure:

```
therapist-admin-mvp/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (login/landing)
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx (main dashboard)
│   │   ├── patients/
│   │   │   ├── page.tsx (patient list)
│   │   │   ├── [id]/page.tsx (patient detail)
│   │   │   └── new/page.tsx (create patient)
│   │   ├── sessions/
│   │   │   ├── [id]/notes/page.tsx (session notes)
│   │   │   └── [id]/notes/generate/page.tsx (AI notes)
│   │   ├── invoices/
│   │   │   └── page.tsx (invoice list)
│   │   ├── insurance/
│   │   │   └── page.tsx (pre-auth tracker)
│   │   ├── tasks/
│   │   │   └── page.tsx (task list)
│   │   └── settings/page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── nav.tsx
│   ├── dashboard/
│   │   ├── stats-card.tsx
│   │   ├── upcoming-appointments.tsx
│   │   ├── pending-tasks.tsx
│   │   └── ...
│   └── features/
│       ├── patient-form.tsx
│       ├── session-notes-editor.tsx
│       ├── invoice-generator.tsx
│       └── ...
├── lib/
│   ├── supabase.ts
│   ├── openai.ts
│   ├── api-clients/
│   │   ├── calendly.ts
│   │   ├── sendgrid.ts
│   │   └── stripe.ts
│   └── utils.ts
├── api/
│   ├── auth/
│   │   └── [auth].ts
│   ├── sessions/
│   │   ├── [id]/notes/generate/route.ts
│   │   └── route.ts
│   ├── patients/
│   │   └── route.ts
│   ├── invoices/
│   │   └── route.ts
│   ├── calendly/
│   │   └── sync/route.ts
│   └── tasks/
│       └── generate-ai-recommendations/route.ts
├── styles/
│   └── globals.css
├── public/
└── package.json
```

---

## Next Steps

1. **Step 6**: Configure authentication (Supabase Auth)
2. **Step 7**: Build dashboard components
3. **Step 8**: Implement API routes for integrations
4. **Step 9**: Add AI features (session notes generation)
5. **Step 10**: Deploy to Vercel
6. **Step 11**: Populate with demo data
7. **Step 12**: Invite beta testers

---

## Architecture Overview

```
┌─────────────────┐
│  Next.js App    │ (Frontend + API Routes)
├─────────────────┤
│  React/Tailwind │ (UI Components)
├─────────────────┤
│  Supabase       │ (Database + Auth)
├─────────────────┤
│  OpenAI API     │ (Session Notes, Transcription)
├─────────────────┤
│  Calendly API   │ (Appointment Sync)
├─────────────────┤
│  SendGrid API   │ (Email Automation)
└─────────────────┘
```

---

## Key Features in MVP

✅ **Dashboard**: Real-time metrics, upcoming appointments, pending tasks  
✅ **Patient Management**: Full CRUD, insurance tracking, session history  
✅ **AI Session Notes**: Transcription, SOAP notes, AI-generated summaries  
✅ **Insurance Pre-Auth**: Status tracking, verification, missing documents flagging  
✅ **Invoicing**: Auto-generation, payment tracking, downloadable PDFs  
✅ **Task Management**: AI-generated recommendations, priority levels, due dates  
✅ **Calendly Integration**: Real-time appointment sync  
✅ **Email Automation**: Reminders, follow-ups, confirmations  
✅ **Authentication**: Secure therapist login/signup  
✅ **Demo Environment**: Pre-loaded sample data for immediate testing  

---

## Files to Create Next

I'm building out the complete codebase. Next files:

1. **lib/supabase.ts** - Supabase client setup
2. **lib/openai.ts** - OpenAI integrations
3. **components/ui/** - Base UI components
4. **app/dashboard/page.tsx** - Main dashboard
5. **app/dashboard/patients/page.tsx** - Patient list
6. **api/sessions/[id]/notes/generate/route.ts** - AI notes generation
7. **And 15+ more component files**

---

## Deployment Checklist

- [ ] Database schema created in Supabase
- [ ] All environment variables configured
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project created and linked
- [ ] Environment variables added to Vercel
- [ ] Deploy triggered
- [ ] App accessible at custom domain
- [ ] Demo data loaded
- [ ] Beta tester access created

---

## Success Metrics

**Time to first working version: 2-3 hours**
**Time to demo-ready with sample data: 4-5 hours**
**Time to invite first beta testers: 6-8 hours**
**Expected feedback from therapists: 2 weeks**

---

Continue to the next file for complete codebase implementation.
