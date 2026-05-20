# Therapist Admin Automation Suite - Complete System Design

## Design System Overview

### Product Classification
- **Type:** Healthcare SaaS + Automation Platform
- **Primary Users:** Solo/small group therapists (120% accuracy focus, reliability critical)
- **Platform:** Web (primary) + Mobile app (secondary, for on-the-go)
- **Tone:** Trustworthy, calm, professional, empathetic (healthcare context)
- **Complexity:** Medium (many workflows, but designed for busy practitioners with limited tech time)

---

## Visual Design System

### Style Choice: **Minimalist + Warm Professional**

**Why this style:**
- Therapists are overwhelmed; complex UX adds to burnout
- Healthcare requires trustworthiness (not playful)
- Warm tones reduce clinic coldness, feel human
- Clean layouts minimize cognitive load

### Color Palette

**Primary Colors:**
- `Primary-Blue`: `#2563EB` (trust, calm, medical)
- `Success-Green`: `#10B981` (insurance approved, session completed)
- `Warning-Amber`: `#F59E0B` (pre-auth missing, action needed)
- `Error-Red`: `#EF4444` (claim denied, critical alert)
- `Neutral-50`: `#F9FAFB` (background)
- `Neutral-900`: `#111827` (text)

**Dark Mode:**
- Reduce saturation; use desaturated variants
- Primary-Blue → `#1E40AF` (darker, easier on eyes)
- Backgrounds → `#1F2937` (dark gray, not pure black)
- Text → `#F3F4F6` (light gray, not white)

### Typography

**Font Pairing:**
- **Headings:** Inter (geometric, modern, clean)
- **Body:** Inter (consistent, readable, accessible)
- **Monospace:** JetBrains Mono (for codes, session IDs, amounts)

**Type Scale:**
- H1: 32px, 700 weight (page title)
- H2: 24px, 600 weight (section header)
- H3: 18px, 600 weight (subsection)
- Body: 16px, 400 weight (default reading)
- Small: 14px, 400 weight (helper text, labels)
- Tiny: 12px, 400 weight (captions, timestamps)

**Line Height:** 1.5 for body text, 1.3 for headings

### Spacing Scale
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px

### Elevation & Shadows
- **Subtle**: `0 1px 3px rgba(0,0,0,0.1)` (cards, dropdowns)
- **Medium**: `0 4px 12px rgba(0,0,0,0.15)` (modals, sheets)
- **Elevated**: `0 10px 25px rgba(0,0,0,0.2)` (tooltips)

### Border Radius
- Buttons: `8px`
- Cards: `12px`
- Modals: `16px`
- Inputs: `6px`

---

## Core User Journeys

### Journey 1: **Patient Intake (New Patient)**
```
Landing Page → Email → Intake Form Link Sent → 
Patient Completes Form → Insurance Verified → 
Payment Collected → Session Booked → Therapist Notified
```

### Journey 2: **Weekly Session Workflow**
```
Appointment Reminder (48h) → Session Date → 
Session Notes (AI-assisted) → Insurance Pre-Auth Check → 
Auto-Invoice Generated → Payment Collected → 
Follow-up Email Sent to Client
```

### Journey 3: **Insurance Management**
```
New Patient → Verify Eligibility → Request Pre-Auth → 
Submit Claim → Track Status → Collect Payment
```

### Journey 4: **Dashboard Analytics**
```
Open App → See Key Metrics → Drill into specific client → 
Review past sessions → Export report
```

---

## Main Dashboard Layout

### Desktop Layout (1200px+)

```
┌─────────────────────────────────────────────────────────┐
│ Header: Logo | Search | Notifications | Profile          │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ Sidebar (fixed)        │  Main Content Area              │
│ ├─ Dashboard           │                                 │
│ ├─ Patients            │  ┌─────────────────────────┐   │
│ ├─ Sessions            │  │ Welcome Back, [Name]    │   │
│ ├─ Insurance           │  │                         │   │
│ ├─ Billing             │  │ Key Metrics Row:        │   │
│ ├─ Reports             │  │ ┌──┬──┬──┬──┐          │   │
│ ├─ Settings            │  │ │●1│●2│●3│●4│          │   │
│ ├─ Integrations        │  │ └──┴──┴──┴──┘          │   │
│ └─ Help                │  │                         │   │
│                        │  │ Upcoming Sessions:      │   │
│                        │  │ ┌──────────────────┐   │   │
│                        │  │ │ Client: John D.  │   │   │
│                        │  │ │ 2:00 PM Today    │   │   │
│                        │  │ └──────────────────┘   │   │
│                        │  │                         │   │
│                        │  │ Recent Actions:         │   │
│                        │  │ • Pre-auth approved     │   │
│                        │  │ • Invoice sent          │   │
│                        │  └─────────────────────────┘   │
│                        │                                 │
└─────────────────────────────────────────────────────────┘
```

### Mobile Layout (375px)

```
┌─────────────────┐
│ ≡ | Title | ◉   │  ← Top bar
├─────────────────┤
│ Welcome Back    │
│                 │
│ Today's         │
│ Appointments    │
│ ┌─────────────┐ │
│ │ 2:00 PM     │ │
│ │ John D.     │ │
│ └─────────────┘ │
│                 │
│ Key Metrics     │
│ ┌──┬──────────┐ │
│ │24│Patients  │ │
│ ├──┼──────────┤ │
│ │6 │Sessions  │ │
│ ├──┼──────────┤ │
│ │8 │Pre-auths │ │
│ └──┴──────────┘ │
│                 │
│ [Quick Actions] │
│ • New Patient   │
│ • New Session   │
│ • Insurance     │
│ • Send Invoice  │
└─────────────────┘
    Bottom Nav: ↓
    Home | Patients | Sessions | Billing | Me
```

---

## Key Screen Designs

### 1. Dashboard - At-a-Glance View

**Purpose:** Therapist opens app, sees everything they need in 3 seconds

**Components:**

**Welcome Section:**
```
┌─────────────────────────────────────────┐
│ 👋 Welcome back, Sarah                  │
│                                         │
│ You have 2 sessions today               │
│ 1 pre-auth waiting for approval         │
└─────────────────────────────────────────┘
```

**Key Metrics Cards (4 in a row on desktop, 2x2 on mobile):**
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ This Month  │   Revenue   │  Pre-auths  │  Invoices   │
│             │             │             │             │
│    6        │  $1,200     │      1      │    4 paid   │
│  Sessions   │   (+12%)    │  pending    │   1 late    │
│             │             │             │             │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

**Upcoming Sessions (Scrollable list):**
```
Today
┌──────────────────────────────────────┐
│ 2:00 PM - John D. (60 min)          │
│ ✓ Insurance verified | Notes: Pending│
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│ 3:30 PM - Sarah M. (45 min)         │
│ ⚠ Pre-auth missing | Notes ready    │
└──────────────────────────────────────┘

Tomorrow
┌──────────────────────────────────────┐
│ 10:00 AM - Mike R. (60 min)         │
│ ✓ All set | Follow-up email pending │
└──────────────────────────────────────┘
```

**Action Items Widget:**
```
┌─────────────────────────────────────┐
│ 🎯 Action Items                     │
│                                     │
│ [ ] Insurance pre-auth for Sarah M. │
│ [ ] Review intake form for New Pt.  │
│ [ ] Follow up: John D. (from 3 wks) │
│ [ ] Send invoice reminder to 2 pts  │
│ [ ] Approve 3 treatment plans       │
│                                     │
│ [View all tasks] →                  │
└─────────────────────────────────────┘
```

---

### 2. Patient List & Client Card

**Patient List View:**
```
┌─────────────────────────────────────────────────────────┐
│ [Search by name] 🔍  [Filter by status ▼]              │
├─────────────────────────────────────────────────────────┤
│ Name         │ Status    │ Last Session │ Next Appt   │
├──────────────┼───────────┼──────────────┼─────────────┤
│ John D.      │ ✓ Active  │ 2 days ago   │ Today 2pm   │
│ Sarah M.     │ ✓ Active  │ 1 week ago   │ Tomorrow    │
│ Mike R.      │ ⏸ Paused  │ 3 weeks ago  │ Unscheduled │
│ New Patient  │ 🆕 Setup  │ Never        │ In intake   │
├──────────────┼───────────┼──────────────┼─────────────┤
│ [+ New Patient]                      [View all →]   │
└─────────────────────────────────────────────────────────┘
```

**Expanded Client Card (Click on patient):**
```
┌────────────────────────────────────────────────────────┐
│ ← Back                                  [Menu ⋮]      │
├────────────────────────────────────────────────────────┤
│ John D. (Age 28)                                       │
│ Client since: Jan 2024 (52 sessions)                  │
│ Last session: 2 days ago at 2:00 PM                   │
├────────────────────────────────────────────────────────┤
│ 📊 Health Snapshot                                     │
│ ├─ Presenting Issue: Anxiety, Depression              │
│ ├─ Modality: Cognitive Behavioral Therapy             │
│ ├─ Frequency: Weekly                                  │
│ └─ Status: On Track (No flags)                        │
├────────────────────────────────────────────────────────┤
│ 💰 Billing Status                                      │
│ ├─ Insurance: Blue Cross                              │
│ ├─ Pre-auth: ✓ Active (expires Mar 15)               │
│ ├─ Unpaid Invoices: $0                                │
│ ├─ Total Billed YTD: $1,200                           │
│ └─ Monthly Rate: $200 per session                     │
├────────────────────────────────────────────────────────┤
│ 📋 Recent Sessions                                     │
│ ├─ Jan 22: Discussed family dynamics (notes ↓)        │
│ ├─ Jan 15: Anxiety management exercises               │
│ └─ Jan 8: Initial assessment & goals                  │
├────────────────────────────────────────────────────────┤
│ [Schedule Next] [View Notes] [Edit] [Send Message]   │
└────────────────────────────────────────────────────────┘
```

---

### 3. Session Notes (AI-Assisted)

**Session Note Template:**
```
┌────────────────────────────────────────────────────────┐
│ Session Note - John D.                    Jan 22, 2024 │
│ Duration: 60 min | Fee: $200 | Status: ⏳ Draft      │
├────────────────────────────────────────────────────────┤
│ [🎙️ Record Session] or [📝 Manual Entry]              │
│                                                        │
│ If Recording:                                          │
│ ┌──────────────────────────────────────┐             │
│ │ Recording... (02:34)                 │             │
│ │ [Stop] [Pause] [⊙ Microphone on]    │             │
│ └──────────────────────────────────────┘             │
│                                                        │
│ AI will auto-generate notes from transcript            │
│ (Therapist reviews and edits)                         │
├────────────────────────────────────────────────────────┤
│ Auto-Generated Note Preview:                           │
│                                                        │
│ Chief Complaint: Client reported increased anxiety    │
│ about upcoming work presentation.                      │
│                                                        │
│ Session Focus: Reviewed cognitive distortions,        │
│ practiced grounding techniques.                        │
│                                                        │
│ Homework: Daily 5-min breathing exercises             │
│                                                        │
│ Progress: Client demonstrates improved awareness      │
│ of anxiety triggers. Responding well to CBT.          │
│                                                        │
│ Next Session Focus: Exposure work                     │
│                                                        │
│ [Edit] [AI Refine] [Save]                           │
├────────────────────────────────────────────────────────┤
│ Linked Documents:                                      │
│ ├─ Treatment Plan (signed)                            │
│ ├─ Progress Assessment                                │
│ └─ Client Outcome Form                                │
│                                                        │
│ [Save & Finalize] [Save as Draft] [Cancel]           │
└────────────────────────────────────────────────────────┘
```

---

### 4. Insurance Pre-Authorization Flow

**Step 1: Verify Eligibility**
```
┌─────────────────────────────────────────┐
│ Verify Insurance Eligibility             │
│ Client: John D.                          │
│ Insurance: Blue Cross Blue Shield        │
├─────────────────────────────────────────┤
│                                         │
│ 🔄 Checking eligibility...              │
│    (Contacting insurance company)        │
│                                         │
│ Status: ✓ Verified                      │
│                                         │
│ Coverage Details:                        │
│ ├─ Plan Type: PPO                       │
│ ├─ Copay: $30 per session               │
│ ├─ Deductible: $1,000 (Remaining: $250) │
│ ├─ Out-of-pocket max: $5,000            │
│ ├─ Visits covered/year: Unlimited       │
│ └─ Behavioral health: ✓ Covered         │
│                                         │
│ [Request Pre-Authorization] →           │
└─────────────────────────────────────────┘
```

**Step 2: Request Pre-Authorization**
```
┌─────────────────────────────────────────────┐
│ Request Pre-Authorization                   │
│ Client: John D.                             │
├─────────────────────────────────────────────┤
│                                             │
│ Treatment Details:                          │
│ ├─ Diagnosis Codes: [F41.1, F32.9]         │
│ ├─ Proposed Treatment: Individual Therapy  │
│ ├─ Frequency: Weekly (52 sessions/year)    │
│ ├─ Duration: 12 months                     │
│ └─ Medical Necessity: [Yes] (auto-filled)  │
│                                             │
│ Your Details:                               │
│ ├─ NPI: [Your NPI#]                        │
│ ├─ License #: [Auto-filled]                │
│ ├─ Tax ID: [Auto-filled]                   │
│                                             │
│ [Auto-Submit to Insurance]                 │
│ (Zapier automation)                        │
│                                             │
│ Status: ⏳ Submitted on Jan 22, 2:45 PM   │
│ Expected Response: 5-7 business days       │
│                                             │
│ [Check Status] [Resubmit] [Edit & Resend] │
└─────────────────────────────────────────────┘
```

**Step 3: Monitor Pre-Auth Status**
```
┌──────────────────────────────────────────────┐
│ Pre-Authorization Status                     │
│ John D. | Request ID: PA-2024-001           │
├──────────────────────────────────────────────┤
│                                              │
│ Timeline:                                    │
│ ├─ Jan 22 ✓ Submitted to Blue Cross         │
│ ├─ Jan 23 ✓ Received by insurance           │
│ ├─ Jan 24 ⏳ Under review (1/3 working days)│
│ ├─ Jan 25 ? Expected decision                │
│ └─ Jan 26 ? Final notification               │
│                                              │
│ Status: 🟡 PENDING                          │
│ Estimated Response: Jan 26, 2024             │
│                                              │
│ Action Items:                                │
│ □ Send follow-up if no response by Jan 29   │
│ □ Have backup plan ready                    │
│                                              │
│ [Refresh Status] [Call Insurance] [View ID] │
│                                              │
│ ✉️ Auto-notification: When approved,        │
│    you'll get email + in-app notification   │
└──────────────────────────────────────────────┘
```

---

### 5. Invoicing & Payment Collection

**Auto-Generated Invoice:**
```
┌──────────────────────────────────────────────────┐
│ Invoice #INV-2024-001                            │
│ John D. (Client)                                 │
│ Date: Jan 22, 2024                              │
├──────────────────────────────────────────────────┤
│                                                  │
│ Therapy Session - Individual (60 minutes)       │
│ Date: Jan 22, 2024                              │
│ Amount: $200.00                                 │
│                                                  │
│ Insurance Copay Due: $30.00                     │
│ Total Due from Client: $30.00                   │
│ (Remainder $170 goes to insurance)             │
│                                                  │
├──────────────────────────────────────────────────┤
│ Payment Status: 🟡 PENDING                      │
│ Due Date: Jan 29, 2024 (7 days)                 │
│                                                  │
│ [Send to Client] [Payment Reminder] [Mark Paid]│
│                                                  │
│ Client Payment Options:                         │
│ • [Pay via Stripe link]                        │
│ • [ACH Bank Transfer]                          │
│ • [Cash at next session]                       │
│                                                  │
│ Auto-Reminders:                                 │
│ ✓ Email reminder sent 1 day after invoice      │
│ ✓ SMS reminder in 3 days if unpaid             │
│ ⏳ Next reminder: Jan 26                         │
└──────────────────────────────────────────────────┘
```

**Payment Dashboard:**
```
┌─────────────────────────────────────────────────┐
│ 💰 Revenue & Collections                        │
│ January 2024                                    │
├─────────────────────────────────────────────────┤
│ Total Sessions: 22                              │
│ Gross Revenue: $4,400                           │
│ Collected from Clients: $660 (copays)           │
│ Awaiting from Insurance: $3,200                 │
│ Unpaid Invoices: $540 (1 month late)           │
│                                                 │
│ Collection Rate: 85%                            │
│ Days to Collect (Avg): 7 days                   │
│                                                 │
│ Breakdown:                                      │
│ ✓ Paid: $3,860                                  │
│ ⏳ Pending: $400 (insurance)                     │
│ 🔴 Overdue: $140 (1 client, payment plan)       │
│                                                 │
│ [View all invoices] [Send reminder] [Reports]  │
└─────────────────────────────────────────────────┘
```

---

### 6. Task Management & Action Items

**Daily Task List:**
```
┌──────────────────────────────────────────┐
│ 🎯 Your Tasks Today (Jan 23)              │
├──────────────────────────────────────────┤
│                                          │
│ 🔴 HIGH PRIORITY                         │
│ □ Request pre-auth for Sarah M.         │
│   Due: Today (Insurance needs it)        │
│   [Complete] [Snooze] [Reschedule]      │
│                                          │
│ □ Call Blue Cross about John D. PA      │
│   Due: Today (5 days pending)            │
│   [Complete] [Snooze]                    │
│                                          │
│ 🟡 MEDIUM PRIORITY                       │
│ □ Review new patient intake form        │
│   Due: Tomorrow                          │
│   [Complete] [Reschedule]               │
│                                          │
│ □ Schedule follow-up with Mike R.       │
│   Due: Tomorrow                          │
│   [Complete] [Reschedule]               │
│                                          │
│ 🟢 LOW PRIORITY                          │
│ □ Send appointment reminders            │
│   Due: Before end of day                │
│   (Usually auto-sent at 48h)            │
│                                          │
│ [Add Task] [View all] [Settings]        │
└──────────────────────────────────────────┘
```

---

### 7. Automated Workflows Dashboard

**Visible Automation Status:**
```
┌──────────────────────────────────────────────────┐
│ ⚙️ Automated Workflows                           │
│ (What's running 24/7 without you)               │
├──────────────────────────────────────────────────┤
│                                                  │
│ 📧 Appointment Reminders                         │
│ ✓ Active - Next run: Today 10am                 │
│ 48h before each appointment, SMS + Email        │
│ Last sent: Yesterday to 2 clients               │
│                                                  │
│ 💳 Payment Reminders                             │
│ ✓ Active - Next run: Daily at 9am              │
│ 1 day after invoice, then every 3 days         │
│ Last run: Yesterday (1 reminder sent)           │
│                                                  │
│ 📋 Insurance Pre-Auth Monitoring                 │
│ ✓ Active - Checks status every 4 hours         │
│ You'll get notified when status changes         │
│ Last check: 2 hours ago (1 approved!)           │
│                                                  │
│ 📊 Weekly Summary Report                         │
│ ✓ Active - Sends Sunday 8am                     │
│ Sessions held, revenue, invoiced, to-do items  │
│ Next report: Sunday Jan 28                      │
│                                                  │
│ 🔔 Client Follow-ups                            │
│ ✓ Active - 7 days after each session            │
│ Sends care message + outcome survey             │
│ Next scheduled: Jan 29 (2 clients)              │
│                                                  │
│ [Customize] [Pause All] [View Logs]            │
└──────────────────────────────────────────────────┘
```

---

### 8. Analytics & Reporting

**Practice Dashboard:**
```
┌────────────────────────────────────────────────┐
│ 📈 Practice Analytics                          │
│ View: [This Month ▼] [YTD] [Custom Date]     │
├────────────────────────────────────────────────┤
│                                                │
│ Key Performance Indicators:                    │
│ ┌──────────┬──────────┬──────────┬──────────┐ │
│ │ Sessions │ Revenue  │ Caseload │ Retention│ │
│ │    22    │ $4,400   │    6     │   100%   │ │
│ │ (↑ 20%)  │ (↑ 8%)   │ (stable) │ (↑ 15%) │ │
│ └──────────┴──────────┴──────────┴──────────┘ │
│                                                │
│ 📊 Session Volume (Last 12 Weeks)             │
│    ▂▃▄▅▆▇█ (graph)                           │
│    Avg: 21 sessions/month                     │
│    Peak: 28 (Nov)                             │
│    Low: 16 (Dec, holiday)                     │
│                                                │
│ 💰 Revenue Trend                              │
│    ▁▂▃▄▅▆▇ (graph)                           │
│    Avg: $4,200/month                          │
│    YTD Total: $50,400                         │
│                                                │
│ 👥 Client Demographics                        │
│    Age: 28-65 (avg: 42)                       │
│    New clients: 2 this month                  │
│    Returning: 95% (excellent retention)       │
│    Cancellation rate: 5% (below industry avg) │
│                                                │
│ 🎯 Top Presenting Issues                      │
│    1. Anxiety (50%)                           │
│    2. Depression (30%)                        │
│    3. Relationship Issues (20%)               │
│                                                │
│ [Export Report] [Share] [View Details]       │
└────────────────────────────────────────────────┘
```

---

### 9. Settings & Integrations

**Settings Hub:**
```
┌────────────────────────────────────────────┐
│ ⚙️ Settings                                 │
├────────────────────────────────────────────┤
│                                            │
│ 👤 Account                                 │
│ ├─ Profile                                 │
│ ├─ Credentials & License                   │
│ ├─ Billing & Subscription                  │
│ └─ Password & Security                     │
│                                            │
│ 🏢 Practice Settings                       │
│ ├─ Practice Name & Info                    │
│ ├─ Business Hours                          │
│ ├─ Default Session Duration                │
│ ├─ Default Fee Structure                   │
│ └─ Cancellation Policy                     │
│                                            │
│ 🔗 Integrations                            │
│ ├─ Calendly [Connected ✓]                  │
│ ├─ Stripe [Connected ✓]                    │
│ ├─ Insurance APIs [Setup]                  │
│ ├─ Twilio SMS [Connected ✓]               │
│ ├─ Gmail [Connected ✓]                     │
│ ├─ Slack [Optional]                        │
│ └─ Zapier [Connected ✓]                    │
│                                            │
│ 📬 Automation & Notifications               │
│ ├─ Reminder Timing                          │
│ ├─ Email Preferences                        │
│ ├─ SMS Alerts                               │
│ ├─ Workflow Rules                           │
│ └─ Notification Quiet Hours                 │
│                                            │
│ 🔐 Privacy & Compliance                     │
│ ├─ HIPAA Settings                           │
│ ├─ Data Backup                              │
│ ├─ Audit Logs                               │
│ └─ Data Export & Deletion                   │
│                                            │
│ 💬 Support & Feedback                      │
│ ├─ Help Center                              │
│ ├─ Contact Support                          │
│ ├─ Feature Requests                         │
│ └─ Report a Bug                             │
└────────────────────────────────────────────┘
```

**Integration Status:**
```
┌──────────────────────────────────────────────┐
│ 🔗 Connected Integrations                    │
├──────────────────────────────────────────────┤
│                                              │
│ ✅ Calendly (Scheduling)                    │
│    Last sync: 5 minutes ago                 │
│    [Reconnect] [Disconnect] [Settings]     │
│                                              │
│ ✅ Stripe (Payments)                        │
│    Last transaction: Today $30               │
│    [Reconnect] [Disconnect] [Settings]     │
│                                              │
│ ✅ Twilio (SMS Reminders)                   │
│    Messages sent this month: 47              │
│    [Reconnect] [Disconnect] [Settings]     │
│                                              │
│ ✅ Zapier (Automation Hub)                  │
│    10 automations active                     │
│    [Reconnect] [Manage Zaps] [Settings]    │
│                                              │
│ ⏳ Insurance Eligibility API (In Setup)     │
│    Status: Pending activation                │
│    [Complete Setup] [Learn More]            │
│                                              │
│ ➕ Add More Integrations                    │
│    • Google Drive (document backup)         │
│    • Slack (team notifications)             │
│    • Dropbox (file sync)                    │
│    • Microsoft Teams (messaging)            │
│    [Browse all →]                           │
└──────────────────────────────────────────────┘
```

---

## Mobile App Design (375px Viewport)

### Mobile Bottom Navigation
```
┌─────────────────────────────┐
│                             │
│     Main Content Area       │
│     (Flows here)            │
│                             │
├─────────────────────────────┤
│ 🏠 │ 👥 │ 📋 │ 💰 │ 👤    │ ← Fixed bottom nav
│Home│Pts │Sess│Bill│ Me     │
└─────────────────────────────┘
```

### Key Mobile Screens

**Mobile Home Screen:**
```
┌─────────────────────┐
│ ≡ │ Home │ 🔔        │ ← Header
├─────────────────────┤
│ 👋 Welcome, Sarah   │
│                     │
│ Today              │
│ ┌─────────────────┐ │
│ │ 2:00 PM         │ │
│ │ John D.         │ │
│ │ ✓ Insurance OK  │ │
│ │ [View] [Note]   │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ 3:30 PM         │ │
│ │ Sarah M.        │ │
│ │ ⚠ Pre-auth      │ │
│ │ [View] [Note]   │ │
│ └─────────────────┘ │
│                     │
│ Quick Stats        │
│ ┌──┐ ┌──┐          │
│ │22│ │6 │          │
│ │ Sessions │      │ │
│ ├──┐ ┌──┐          │
│ │$4.4K│              │
│ │ Revenue            │
│ └─────────────────┘ │
│                     │
│ [New Session] [See all] │
├─────────────────────┤
│ 🏠 👥 📋 💰 👤    │
└─────────────────────┘
```

**Mobile Session Note Entry:**
```
┌─────────────────────┐
│ ← │ Session Note │ ✓ │
├─────────────────────┤
│ John D.            │
│ Jan 22, 2:00 PM    │
│                     │
│ [🎙️ Record]        │
│ (Recording...)      │
│ [Stop] 02:34        │
│                     │
│ OR                  │
│                     │
│ [📝 Type Manually]  │
│ ┌─────────────────┐ │
│ │ Chief complaint:│ │
│ │                 │ │
│ │ Session notes:  │ │
│ │                 │ │
│ │ Homework:       │ │
│ │                 │ │
│ └─────────────────┘ │
│                     │
│ [Cancel] [Save]    │
└─────────────────────┘
```

---

## Component Library

### Buttons

**Primary Button** (Main CTAs):
```
┌──────────────────────┐
│  Save & Next Step    │  ← Blue (#2563EB), 16px Inter
└──────────────────────┘
44px height, 16px padding sides
```

**Secondary Button** (Alternative actions):
```
┌──────────────────────┐
│  Cancel              │  ← Gray outline, 16px Inter
└──────────────────────┘
```

**Danger Button** (Destructive):
```
┌──────────────────────┐
│  Delete Session      │  ← Red (#EF4444), 16px Inter
└──────────────────────┘
```

### Form Components

**Text Input:**
```
┌─────────────────────────┐
│ Patient Name            │  ← Label (14px, 600wt)
│ ┌─────────────────────┐ │
│ │ John Doe      │     │ │  ← 44px height, 8px padding
│ └─────────────────────┘ │
│ Helper text or error    │  ← 12px, red if error
└─────────────────────────┘
```

**Date Picker:**
```
┌──────────────────────┐
│ Session Date         │
│ ┌──────────────────┐ │
│ │ Jan 22, 2024 │📅 │ │
│ └──────────────────┘ │
└──────────────────────┘
(Tap opens native date picker)
```

**Toggle Switch:**
```
┌──────────────────────────┐
│ Auto-save drafts  [○━]   │  ← Slide right to enable
└──────────────────────────┘
```

**Dropdown:**
```
┌──────────────────────┐
│ Insurance Company     │
│ ┌──────────────────┐ │
│ │ Blue Cross ▼ │  │ │
│ └──────────────────┘ │
│ (Opens modal on mobile)
└──────────────────────┘
```

### Cards & Containers

**Info Card** (Status, metrics):
```
┌──────────────────────────┐
│ 6 Sessions This Month    │  ← Heading (18px, 600wt)
│                          │
│ +20% from last month     │  ← Subtext (14px)
│                          │
│ [View details →]         │  ← Optional link
└──────────────────────────┘
Subtle shadow, 12px radius, 16px padding
```

**Action Card** (Items needing action):
```
┌──────────────────────────┐
│ ⚠ Insurance Pre-Auth      │
│ Sarah M.                 │
│                          │
│ Request submitted 5 days │
│ ago, still pending.      │
│                          │
│ [Follow Up] [Details]    │
└──────────────────────────┘
Amber left border (4px), #F59E0B
```

### Modals & Sheets

**Confirmation Modal:**
```
┌───────────────────────────┐
│ Confirm Action             │
├───────────────────────────┤
│                           │
│ Are you sure you want to  │
│ cancel this session?      │
│                           │
│ This action cannot be     │
│ undone.                   │
│                           │
├───────────────────────────┤
│ [Cancel] [Delete]         │
└───────────────────────────┘
Focus on primary action, secondary grayed
```

### Tables (Desktop)

**Sessions Table:**
```
┌──────────┬──────────┬──────────┬──────────┬──────────┐
│ Date     │ Client   │ Duration │ Status   │ Action   │
├──────────┼──────────┼──────────┼──────────┼──────────┤
│ Jan 22   │ John D.  │ 60 min   │ ✓ Done   │ [View]   │
│ Jan 15   │ Sarah M. │ 45 min   │ ✓ Done   │ [View]   │
│ Jan 8    │ Mike R.  │ 60 min   │ ✓ Done   │ [View]   │
└──────────┴──────────┴──────────┴──────────┴──────────┘
Hover highlights row, striped backgrounds (odd rows: #F9FAFB)
```

---

## Animations & Microinteractions

### Loading States
```
Session Note Loading:
[████░░░░░] 40% ← Skeleton while loading
"Processing your notes..."

When complete:
✓ Notes saved successfully  ← Green checkmark, 300ms slide-in
(Auto-dismiss in 3s)
```

### Success/Error Feedback
```
Success Toast (bottom-right, mobile bottom-center):
┌──────────────────┐
│ ✓ Sent to client │  ← Green bg, 300ms fade-in
│   (Auto-dismiss)  │  ← 3s auto-dismiss
└──────────────────┘

Error Alert:
┌──────────────────────┐
│ ⚠ Failed to verify   │  ← Amber bg, 300ms shake
│   insurance          │  ← Manual dismiss
│ [Retry] [Help]       │
└──────────────────────┘
```

### Page Transitions
- **Forward navigation:** Slide in from right (200ms ease-out)
- **Back navigation:** Slide out to right (150ms ease-in)
- **Modal entrance:** Fade in + subtle scale (250ms ease-out)
- **Modal exit:** Fade out (150ms ease-in)

### Interactive States
- **Button press:** Scale 0.96, 80ms
- **Card hover:** Elevation increase, shadow deepen (150ms)
- **List item swipe:** Reveal action buttons on swipe (200ms)

---

## Accessibility (WCAG 2.1 AA Compliance)

### Color Contrast
- All text: 4.5:1 minimum (normal text)
- Large text (18pt+): 3:1 minimum
- UI elements: 3:1 minimum

### Keyboard Navigation
- Tab order follows visual order
- All interactive elements keyboard-accessible
- Focus rings visible (2px blue outline)
- Escape key closes modals

### Screen Readers
- Meaningful alt text on all icons
- ARIA labels on icon-only buttons
- Form labels associated via `for` attribute
- Dynamic content announced via `aria-live`

### Touch Targets
- Minimum 44×44px on all platforms
- 8px minimum spacing between targets
- Increased hit area for small icons

### Motion
- All animations respect `prefers-reduced-motion`
- No auto-playing videos or animations >5 seconds
- Motion conveys meaning, not decorative only

---

## Responsive Breakpoints

```
Mobile:     320px - 479px (phones)
Tablet:     480px - 1023px (tablets, landscape phone)
Desktop:    1024px+ (laptops, desktops)

Key breakpoints:
- 375px (iPhone SE base)
- 768px (iPad portrait)
- 1024px (desktop minimum)
- 1440px (large desktop)
```

---

## Data Hierarchy

**Information Priority (What therapists need to see first):**
1. **Critical alerts** (Pre-auth missing, unpaid invoices, compliance issues)
2. **Today's schedule** (What's happening right now)
3. **Key metrics** (Revenue, session count, open tasks)
4. **Upcoming items** (Next week, upcoming pre-auths)
5. **Historical data** (Past sessions, reports, archived items)

---

## Key Differentiators in UI

### vs. SimplePractice/TherapyNotes:
- **Better UX:** Cleaner, less clinical-feeling
- **Automation-first:** Automation status visible everywhere
- **Insurance focus:** Pre-auth workflow is seamless (not buried)
- **Therapist language:** Not physician-centric terms
- **Speed:** Designed for quick data entry (3-5 min session note)

### vs. Generic SaaS Tools:
- **Healthcare context:** Design acknowledges HIPAA, compliance
- **Therapy-specific workflows:** Intake forms, progress tracking, modality-specific notes
- **Emotional design:** Warm, calm aesthetic (not stark white)
- **Therapist safety:** Privacy settings, secure messaging, audit logs visible

---

## Implementation Notes

### Tech Stack Alignment
- **Frontend:** React with Tailwind CSS (matching color system above)
- **Icons:** Lucide React (clean, consistent style)
- **Forms:** React Hook Form + custom Tailwind components
- **Charts:** Recharts (for analytics dashboards)
- **Mobile:** React Native / Expo (shares design system)

### Design System Variables
```css
/* Colors */
--color-primary: #2563EB;
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #EF4444;
--color-bg-light: #F9FAFB;
--color-text-dark: #111827;

/* Spacing */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;

/* Typography */
--font-family: 'Inter', sans-serif;
--font-size-body: 16px;
--line-height-body: 1.5;

/* Shadows */
--shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
--shadow-md: 0 4px 12px rgba(0,0,0,0.15);
```

---

## Next Steps for Design Implementation

1. **Create Figma design system** with all components
2. **Build component library** in React/Tailwind
3. **Implement responsive layouts** across all screen sizes
4. **Add dark mode** variants
5. **User test** with 5-10 real therapists
6. **Iterate** based on feedback
7. **Accessibility audit** (WCAG 2.1 AA)

---

This design system keeps therapists focused, reduces cognitive load, and makes complex workflows feel simple.
