# Therapist Admin Suite MVP - Complete Implementation Guide (Part 2)

## Quick Summary: Files Created So Far

You now have these foundational files ready:

1. **MVP_BUILD_START.md** - Complete setup guide with database schema
2. **lib_supabase.ts** - Supabase client + TypeScript types
3. **lib_openai.ts** - AI integrations (notes, transcription, recommendations)
4. **lib_calendly.ts** - Calendly API for appointment syncing
5. **lib_sendgrid.ts** - Email automation (reminders, invoices, follow-ups)
6. **api_sessions_notes_generate_route.ts** - Backend API for AI notes generation
7. **api_tasks_generate_recommendations_route.ts** - AI task recommendation engine
8. **dashboard_page.tsx** - Main dashboard component (complete & production-ready)

---

## Architecture: How It All Works Together

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                        │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React Components)  │  Backend (API Routes)        │
│                               │                              │
│  dashboard/page.tsx ─────────→ /api/sessions/[id]/notes      │
│  patients/page.tsx ───────────→ /api/patients                │
│  invoices/page.tsx ───────────→ /api/invoices                │
│  tasks/page.tsx ──────────────→ /api/tasks                   │
│                               │                              │
│                          ↓ (calls)                           │
│                    ┌─────────────────┐                       │
│                    │  API Clients    │                       │
│                    ├─────────────────┤                       │
│                    │ • OpenAI        │ (AI)                  │
│                    │ • Calendly      │ (Scheduling)          │
│                    │ • SendGrid      │ (Email)               │
│                    │ • Stripe        │ (Payments)            │
│                    └─────────────────┘                       │
│                          ↓                                   │
│                    ┌─────────────────┐                       │
│                    │    Supabase     │                       │
│                    ├─────────────────┤                       │
│                    │ • Database      │                       │
│                    │ • Auth          │                       │
│                    │ • Row-level sec │                       │
│                    └─────────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Remaining Components to Build

### 1. Patient Management Page
**File: `app/dashboard/patients/page.tsx`**

```typescript
// Displays list of all patients with search/filter
// Shows: name, status, intake date, insurance, session count
// Actions: view patient, edit, delete, create new
```

**Features:**
- Search by name, email, insurance
- Filter by status (active/paused/completed)
- Sort by name, intake date, last visit
- Quick action buttons (call, email, view notes)

---

### 2. Patient Detail Page
**File: `app/dashboard/patients/[id]/page.tsx`**

```typescript
// Complete patient profile with tabs:
// - Overview (demographics, insurance, contact)
// - Session History (all sessions with dates)
// - Documents (uploaded files, insurance cards)
// - Billing (invoices, payment status)
// - Notes (all session notes)
// - Insurance (pre-auth tracking)
```

---

### 3. Session Notes Editor
**File: `app/dashboard/sessions/[id]/notes/page.tsx`**

```typescript
// AI-powered note taking interface with:
// - Textarea for rough notes or paste transcript
// - "Generate AI Draft" button (calls /api/sessions/[id]/notes/generate)
// - AI-generated SOAP notes (editable)
// - Save final note
// - Follow-up task creation
```

---

### 4. Invoice Management
**File: `app/dashboard/invoices/page.tsx`**

```typescript
// List all invoices with:
// - Invoice number, patient, amount, status
// - Create invoice button (auto-populate from session)
// - Send invoice via email
// - Mark paid
// - Download PDF
// - Track payment status
```

---

### 5. Insurance Pre-Auth Tracker
**File: `app/dashboard/insurance/page.tsx`**

```typescript
// Track all insurance pre-authorizations:
// - Status (pending/submitted/approved/denied/expired)
// - Authorization number
// - Number of approved sessions
// - Expiration date
// - Verification date
// - Required documents (AI-detected)
```

---

### 6. Task Management
**File: `app/dashboard/tasks/page.tsx`**

```typescript
// Personal task list with:
// - AI-generated recommendations
// - Manual task creation
// - Priority levels (low/medium/high)
// - Due dates with overdue warnings
// - Status tracking (open/completed/snoozed)
// - Task types (admin/documentation/billing/insurance/follow_up)
```

---

## Step-by-Step Implementation Path (Next 3-4 Hours)

### Phase 1: Core Components (1 hour)
1. Create `app/dashboard/layout.tsx` (sidebar navigation)
2. Create `app/dashboard/patients/page.tsx` (patient list)
3. Create `components/ui/button.tsx`, `card.tsx`, `input.tsx` (base components)

### Phase 2: CRUD Operations (1.5 hours)
1. Create `app/dashboard/patients/new/page.tsx` (patient form)
2. Create `app/dashboard/patients/[id]/page.tsx` (patient detail)
3. Create `components/features/patient-form.tsx` (reusable form)

### Phase 3: AI Features (1 hour)
1. Create `app/dashboard/sessions/[id]/notes/page.tsx` (AI notes)
2. Create `components/features/session-notes-editor.tsx` (notes UI)
3. Test AI integration

### Phase 4: Additional Features (0.5 hours)
1. Create invoices, insurance, tasks pages
2. Add email sending integration
3. Create demo data seed script

---

## File Structure You'll End Up With

```
therapist-admin-mvp/
├── app/
│   ├── layout.tsx (root layout)
│   ├── page.tsx (login/landing)
│   └── dashboard/
│       ├── layout.tsx (sidebar + nav)
│       ├── page.tsx ✅ (CREATED)
│       ├── patients/
│       │   ├── page.tsx (list)
│       │   ├── [id]/page.tsx (detail)
│       │   └── new/page.tsx (create form)
│       ├── sessions/
│       │   └── [id]/
│       │       └── notes/
│       │           ├── page.tsx (notes editor)
│       │           └── generate/ (AI generation)
│       ├── invoices/
│       │   └── page.tsx
│       ├── insurance/
│       │   └── page.tsx
│       ├── tasks/
│       │   └── page.tsx
│       └── settings/
│           └── page.tsx
│
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   └── modal.tsx
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── nav.tsx
│   ├── dashboard/
│   │   ├── stats-card.tsx ✅ (CREATED)
│   │   ├── upcoming-appointments.tsx ✅ (CREATED)
│   │   └── ...
│   └── features/
│       ├── patient-form.tsx
│       ├── session-notes-editor.tsx
│       ├── invoice-generator.tsx
│       ├── preauth-tracker.tsx
│       └── task-list.tsx
│
├── lib/
│   ├── supabase.ts ✅ (CREATED)
│   ├── openai.ts ✅ (CREATED)
│   ├── calendly.ts ✅ (CREATED)
│   ├── sendgrid.ts ✅ (CREATED)
│   ├── stripe.ts (optional)
│   └── utils.ts
│
├── api/
│   ├── auth/[auth].ts
│   ├── sessions/
│   │   └── [id]/
│   │       └── notes/
│   │           ├── route.ts (GET/POST notes)
│   │           └── generate/ ✅ (CREATED)
│   ├── patients/
│   │   └── route.ts (CRUD)
│   ├── invoices/
│   │   └── route.ts (CRUD)
│   ├── tasks/
│   │   └── generate-ai-recommendations/ ✅ (CREATED)
│   ├── calendly/
│   │   └── sync/route.ts (sync appointments)
│   └── webhooks/
│       ├── stripe.ts
│       └── sendgrid.ts
│
├── styles/
│   └── globals.css
├── public/
├── .env.local (🔐 secret)
└── package.json
```

---

## Quick Copy-Paste: Create Missing UI Components

You'll need these base components. Create them with this pattern:

### `components/ui/button.tsx`
```typescript
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'font-medium rounded-lg transition-colors';
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100',
      danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400',
    };
    const sizes = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);
```

---

## Next: Deploy to Vercel

Once you have the basic structure:

```bash
# Push to GitHub
git add .
git commit -m "Initial therapist admin mvp setup"
git push origin main

# Go to vercel.com, connect repo
# Add environment variables
# Deploy with one click
# Live in <2 minutes
```

---

## Demo Data Seed Script

Create `scripts/seed-demo-data.ts`:

```typescript
// Populates database with realistic sample data
// - 5 therapists (you're one)
// - 20 patients per therapist
// - 50+ sessions
// - 30+ invoices
// - 15+ pre-auth requests
// Run: npx ts-node scripts/seed-demo-data.ts
```

---

## Testing & Validation

### Self-Testing Checklist
- [ ] Create therapist account & login
- [ ] Add new patient
- [ ] Schedule session via Calendly
- [ ] Generate AI notes
- [ ] Create invoice
- [ ] Track insurance pre-auth
- [ ] Create tasks & get AI recommendations
- [ ] Send appointment reminder email
- [ ] View all metrics on dashboard

### With Real Therapist (Week 1)
- [ ] Recruit 1-2 therapists from r/therapists
- [ ] Give them free access
- [ ] Measure: time saved, features used, NPS
- [ ] Collect feedback
- [ ] Iterate based on feedback

---

## Success Metrics: First 2 Weeks

| Metric | Target | What It Means |
|--------|--------|---------------|
| **Setup Time** | <15 min | System is easy to onboard |
| **AI Notes Quality** | 8/10 rating | Notes are useful & accurate |
| **Time Saved** | 3+ hrs/week | Direct value demonstration |
| **Feature Adoption** | 80%+ | Users adopt most features |
| **NPS** | 7+ | Good product-market fit signal |
| **"When can I pay?" count** | ≥1 | Strong monetization signal |

---

## Monetization Path

**Month 1-2: Free Beta** (Validate with 5-10 therapists)  
**Month 3: Launch Pricing** ($99-199/month)
- Tier 1: Solo therapist ($99/mo) - 5 patients, basic AI
- Tier 2: Small group ($199/mo) - 20 patients, full AI
- Tier 3: Practice ($499/mo) - Unlimited, team access

**Projected:** 100 customers by month 6 = $10-20K MRR

---

## Remaining Files to Build

All component files follow the same pattern shown in `dashboard_page.tsx`:

1. Use `useEffect` + Supabase queries for data
2. Handle loading/error states  
3. Use Tailwind for styling
4. Link to other pages
5. Include action buttons
6. Show empty states

**Total time to complete:** 4-6 hours (Part 2)

---

## How to Use These Files

1. **Copy-paste the code** from each file into your Next.js project
2. **Install dependencies:** `npm install` (should auto-install from package.json)
3. **Create `.env.local`** with all API keys
4. **Run database schema** in Supabase SQL editor
5. **Test locally:** `npm run dev` then go to http://localhost:3000
6. **Deploy:** Push to GitHub, connect to Vercel, deploy

---

## You're 40% Complete

✅ Database designed  
✅ API clients configured  
✅ AI integrations ready  
✅ Main dashboard built  
✅ Supabase setup complete  

🔄 In Progress: Additional pages & components  
⏳ Coming: Demo data, email templates, payments  

Continue building using the patterns established in `dashboard_page.tsx` and the API routes.

---

## Questions?

Refer back to:
- **Setup Issues?** → `MVP_BUILD_START.md`
- **Database Questions?** → Database schema in `MVP_BUILD_START.md`
- **Component Questions?** → `dashboard_page.tsx` (reference implementation)
- **API Questions?** → API route files (`api_sessions_*`, `api_tasks_*`)

Next: Build remaining pages following the dashboard pattern.
