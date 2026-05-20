# Therapist Admin System - Information Architecture & User Flows

## Application Architecture Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    THERAPIST ADMIN PLATFORM                     │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                         MAIN NAVIGATION                          │
│  [🏠 Dashboard] [👥 Patients] [📋 Sessions] [💰 Billing]        │
│  [📊 Reports] [🔗 Integrations] [⚙️ Settings] [❓ Help]         │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ LEFT SIDEBAR (DESKTOP) / HAMBURGER MENU (MOBILE)               │
├──────────────────────────────────────────────────────────────────┤
│ 📊 DASHBOARD                                                     │
│  ├─ Overview (key metrics)                                       │
│  ├─ Calendar (today's schedule)                                  │
│  └─ Action Items (urgent tasks)                                  │
│                                                                  │
│ 👥 PATIENT MANAGEMENT                                            │
│  ├─ All Patients (list view)                                     │
│  ├─ New Patient (intake workflow)                                │
│  ├─ Patient Details (per-client view)                            │
│  └─ Patient Search & Filter                                      │
│                                                                  │
│ 📋 SESSIONS                                                      │
│  ├─ Session List (calendar + list)                              │
│  ├─ Schedule Session (new)                                       │
│  ├─ Session Notes (documentation)                                │
│  └─ Progress Tracking                                            │
│                                                                  │
│ 💰 BILLING & INSURANCE                                           │
│  ├─ Insurance Management                                         │
│  │  ├─ Verify Eligibility                                        │
│  │  ├─ Request Pre-Authorization                                 │
│  │  ├─ Track Pre-Auth Status                                     │
│  │  ├─ Submit Claims                                             │
│  │  └─ Manage Insurance Plans                                    │
│  │                                                               │
│  ├─ Invoicing                                                    │
│  │  ├─ Auto-generated Invoices                                   │
│  │  ├─ Invoice Templates                                         │
│  │  ├─ Payment Tracking                                          │
│  │  └─ Send Reminders                                            │
│  │                                                               │
│  └─ Revenue & Collections                                        │
│     ├─ Revenue Dashboard                                         │
│     ├─ Unpaid Invoices                                           │
│     ├─ Payment Plans                                             │
│     └─ Refund Processing                                         │
│                                                                  │
│ 📊 REPORTS & ANALYTICS                                           │
│  ├─ Practice Dashboard                                           │
│  │  ├─ Revenue Metrics                                           │
│  │  ├─ Session Trends                                            │
│  │  ├─ Client Demographics                                       │
│  │  └─ Utilization Rates                                         │
│  │                                                               │
│  ├─ Clinical Reports                                             │
│  │  ├─ Progress Tracking                                         │
│  │  ├─ Outcomes Measurement                                      │
│  │  └─ Treatment Plans                                           │
│  │                                                               │
│  └─ Export & Download                                            │
│     ├─ PDF Reports                                               │
│     ├─ CSV Data                                                  │
│     └─ Client Records                                            │
│                                                                  │
│ 🔗 INTEGRATIONS                                                  │
│  ├─ Connected Integrations                                       │
│  │  ├─ Calendly (scheduling)                                     │
│  │  ├─ Stripe (payments)                                         │
│  │  ├─ Twilio (SMS)                                              │
│  │  ├─ Gmail (email)                                             │
│  │  ├─ Zapier (automation)                                       │
│  │  └─ Insurance APIs                                            │
│  │                                                               │
│  └─ Setup New Integration                                        │
│     └─ Browse & Connect                                          │
│                                                                  │
│ ⚙️ SETTINGS                                                      │
│  ├─ Account                                                      │
│  │  ├─ Profile                                                   │
│  │  ├─ Credentials & License                                     │
│  │  ├─ Password & Security                                       │
│  │  └─ Billing & Subscription                                    │
│  │                                                               │
│  ├─ Practice Settings                                            │
│  │  ├─ Practice Name & Info                                      │
│  │  ├─ Business Hours                                            │
│  │  ├─ Default Fees                                              │
│  │  ├─ Cancellation Policy                                       │
│  │  └─ Notification Preferences                                  │
│  │                                                               │
│  ├─ Automation & Workflows                                       │
│  │  ├─ Scheduled Automations                                     │
│  │  ├─ Reminder Settings                                         │
│  │  ├─ Email Templates                                           │
│  │  └─ Notification Rules                                        │
│  │                                                               │
│  ├─ Privacy & Compliance                                         │
│  │  ├─ HIPAA Settings                                            │
│  │  ├─ Data Backup & Recovery                                    │
│  │  ├─ Audit Logs                                                │
│  │  └─ Data Export & Deletion                                    │
│  │                                                               │
│  └─ Help & Support                                               │
│     ├─ Help Center                                               │
│     ├─ Contact Support                                           │
│     ├─ Feature Requests                                          │
│     └─ Report a Bug                                              │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Core User Flows

### Flow 1: New Patient Onboarding

```
START: New Patient Inquiry
   ↓
[Therapist receives inquiry]
   ↓
[Sends intake form link]
   (Via email, SMS, or patient portal)
   ↓
[Patient completes intake form]
   • Personal info
   • Insurance info
   • Medical history
   • Presenting issues
   • Availability
   ↓
[SYSTEM: Auto-verify insurance eligibility]
   ✓ Check if insured
   ✓ Get copay amount
   ✓ Check visit limits
   ↓
[SYSTEM: Auto-request pre-authorization]
   (Sends to insurance via API/Zapier)
   ↓
[Collect initial payment]
   • Copay (via Stripe)
   • Upfront deposit (if applicable)
   ↓
[Schedule first session]
   • Link to therapist's Calendly
   • Patient selects available time
   • Confirmation email sent
   ↓
[Therapist notified]
   • Dashboard alert
   • Email notification
   • Pre-auth status visible
   ↓
[SYSTEM: Auto-send appointment reminder]
   • 48h before: Email + SMS
   • 24h before: SMS reminder
   ↓
END: Session Day
```

### Flow 2: Weekly Session Workflow

```
DAY -2 (Monday, for Wednesday session):
┌─────────────────────────────────────┐
│ APPOINTMENT REMINDER SENT            │
│ Client gets email + SMS at 48h       │
│ Therapist sees on dashboard          │
└─────────────────────────────────────┘

DAY -1 (Tuesday):
┌─────────────────────────────────────┐
│ FINAL REMINDER                       │
│ Client gets SMS at 24h               │
│ Therapist can review notes           │
└─────────────────────────────────────┘

SESSION DAY (Wednesday 2:00 PM):
┌─────────────────────────────────────┐
│ SESSION IN PROGRESS                 │
│ Therapist is with client             │
│                                     │
│ Option 1: Record session             │
│  • Therapist clicks "Record"         │
│  • Audio/transcript captured         │
│  • AI generates draft notes          │
│                                     │
│ Option 2: Manual notes               │
│  • Therapist types/dictates          │
│  • Manual documentation              │
└─────────────────────────────────────┘

IMMEDIATELY AFTER SESSION:
┌──────────────────────────────────────┐
│ SESSION NOTES                        │
│                                      │
│ Therapist reviews AI-generated notes │
│ Edits as needed                      │
│ Marks session as complete            │
│ [Save] button                        │
│                                      │
│ SYSTEM: Auto-generates:              │
│ • Invoice (client's copay)           │
│ • Clinical documentation             │
│ • Session summary                    │
└──────────────────────────────────────┘

SAME DAY (Evening):
┌──────────────────────────────────────┐
│ BILLING & INSURANCE                  │
│                                      │
│ SYSTEM: Auto-submits                 │
│ • Claim to insurance (if pre-auth ok)│
│ • Invoice to client                  │
│ • Payment link sent via email/SMS    │
│                                      │
│ Therapist sees:                      │
│ ✓ Session documented                 │
│ ✓ Invoice sent                       │
│ ✓ Insurance claim tracking           │
└──────────────────────────────────────┘

DAYS 1-7 AFTER SESSION:
┌──────────────────────────────────────┐
│ PAYMENT COLLECTION                   │
│                                      │
│ Day 1: Invoice sent to client        │
│ Day 1: SYSTEM monitors payment       │
│ Day 3: If unpaid → SMS reminder      │
│ Day 7: If unpaid → Email follow-up   │
│                                      │
│ SYSTEM also monitors:                │
│ • Insurance claim status             │
│ • Pre-auth utilization               │
│ • Upcoming session scheduling        │
└──────────────────────────────────────┘

7 DAYS AFTER SESSION:
┌──────────────────────────────────────┐
│ FOLLOW-UP WITH CLIENT                │
│                                      │
│ SYSTEM: Auto-sends                   │
│ • Care message from therapist        │
│ • Check-in (how are you doing?)      │
│ • Outcome survey (brief)             │
│ • Resource links (if applicable)     │
│                                      │
│ Therapist can optionally:            │
│ • Add personal note                  │
│ • Share homework resources           │
│ • Schedule next session              │
└──────────────────────────────────────┘

NEXT SESSION PREP:
┌──────────────────────────────────────┐
│ PREPARATION FOR SESSION 2            │
│                                      │
│ Therapist sees on dashboard:         │
│ ✓ Last session notes & homework      │
│ ✓ Client's progress tracking         │
│ ✓ Insurance status (still valid?)    │
│ ✓ Payment collected (confirmed)      │
│ ✓ Upcoming session scheduled         │
│                                      │
│ SYSTEM: Re-run pre-auth check        │
│ (if pre-auth expires soon)           │
└──────────────────────────────────────┘

CYCLE REPEATS FOR NEXT SESSION...
```

### Flow 3: Insurance Pre-Authorization Tracking

```
STEP 1: VERIFY ELIGIBILITY
┌──────────────────────────────────────┐
│ Therapist clicks: "Verify Insurance" │
│ Client: John D.                      │
│ Insurance: Blue Cross                │
│                                      │
│ SYSTEM: Calls insurance API          │
│ • Is patient covered?                │
│ • What's the copay?                  │
│ • How many visits allowed?           │
│ • Deductible met?                    │
│                                      │
│ Result displayed:                    │
│ ✓ Verified - PPO plan active         │
│   • Copay: $30/visit                 │
│   • Unlimited visits                 │
│   • Deductible: $250 remaining       │
└──────────────────────────────────────┘

STEP 2: REQUEST PRE-AUTHORIZATION
┌──────────────────────────────────────┐
│ Therapist clicks: "Request Pre-Auth" │
│                                      │
│ SYSTEM: Auto-fills form              │
│ • Patient name & ID                  │
│ • Therapist NPI & credentials        │
│ • Diagnosis codes (DSM-5)            │
│ • Proposed frequency (e.g., 1x/week) │
│ • Duration (52 sessions/year)        │
│                                      │
│ Therapist reviews & clicks:          │
│ [Submit to Insurance]                │
│                                      │
│ SYSTEM: Submits via:                 │
│ • Insurance eligibility API, OR      │
│ • Zapier automation to fax/email     │
│                                      │
│ Status: ✓ SUBMITTED (Jan 22, 2:45pm)│
│ Expected response: 5-7 business days │
└──────────────────────────────────────┘

STEP 3: MONITOR & TRACK STATUS
┌──────────────────────────────────────┐
│ SYSTEM: Monitors continuously        │
│                                      │
│ Every 4 hours:                       │
│ □ Check pre-auth status              │
│ □ Is it approved? Denied? Pending?   │
│                                      │
│ If APPROVED:                         │
│ ✓ Therapist gets notification        │
│ ✓ Dashboard shows: Pre-auth active   │
│ ✓ Expires date: [date]               │
│ ✓ Patient notified automatically     │
│                                      │
│ If PENDING:                          │
│ • Show timeline (days remaining)     │
│ • Offer "Call insurance" shortcut    │
│ • Suggest follow-up date             │
│                                      │
│ If DENIED:                           │
│ 🔴 Alert therapist immediately      │
│ • Reason for denial                  │
│ • Appeal instructions                │
│ • Alternative options                │
└──────────────────────────────────────┘

STEP 4: UTILIZE & MANAGE
┌──────────────────────────────────────┐
│ Once approved:                       │
│                                      │
│ Dashboard shows:                     │
│ Pre-Auth Status: ACTIVE             │
│ Sessions Used: 4/52                  │
│ Sessions Remaining: 48               │
│ Expires: Mar 22, 2025                │
│                                      │
│ Each session:                        │
│ • SYSTEM auto-tracks usage           │
│ • Updates remaining count            │
│ • Alerts if nearing limit            │
│ • Suggests renewal (60 days out)     │
│                                      │
│ When nearing expiration:             │
│ SYSTEM: Auto-requests renewal        │
│ (Same pre-auth process repeats)      │
└──────────────────────────────────────┘
```

### Flow 4: Dashboard Insights at a Glance

```
THERAPIST OPENS APP (9:00 AM Monday):
   ↓
┌────────────────────────────────────┐
│ DASHBOARD LOAD (< 2 seconds)        │
└────────────────────────────────────┘
   ↓
MAIN CONTENT APPEARS:

┌────────────────────────────────────┐
│ 👋 Welcome back, Sarah              │
│                                    │
│ You have 5 sessions today           │
│ 1 pre-auth waiting (needs follow-up)│
│ 2 unpaid invoices ($60 total)      │
└────────────────────────────────────┘
   ↓
┌────────────────────────────────────┐
│ KEY METRICS (This Month)            │
│                                    │
│ Sessions: 22  | Revenue: $4,400    │
│ Pre-auths: 2  | Collections: 95%   │
└────────────────────────────────────┘
   ↓
┌────────────────────────────────────┐
│ TODAY'S SCHEDULE                    │
│                                    │
│ 10:00 AM - John D. (60 min)        │
│ ✓ Insurance OK | Notes: Ready      │
│                                    │
│ 11:15 AM - Sarah M. (45 min)       │
│ ⚠ Pre-auth pending                 │
│                                    │
│ 1:00 PM - Mike R. (60 min)         │
│ ✓ Ready to go                      │
│ ... (2 more sessions)              │
└────────────────────────────────────┘
   ↓
┌────────────────────────────────────┐
│ ACTION ITEMS (Quick tasks)          │
│                                    │
│ [ ] Call Blue Cross about Sarah M. │
│     (Pre-auth pending 5 days)      │
│                                    │
│ [ ] Send invoice reminder to 2 pts │
│     (Unpaid > 7 days)              │
│                                    │
│ [ ] Review intake form (New Pt.)   │
│                                    │
│ [✓] Resolve all items quickly      │
└────────────────────────────────────┘
   ↓
THERAPIST TAKES ACTION:

Option 1: Click "John D." → 
  • Full session details load
  • Notes from last session visible
  • Can add pre-session notes
  • Timer for session length

Option 2: Click "Call insurance" →
  • Auto-dials insurance #
  • Session notes visible for reference
  • Can document call outcome

Option 3: Click "Send reminder" →
  • Auto-generates payment reminder
  • Therapist reviews message
  • [Send now] or [Schedule for later]

END: Therapist ready for first session
```

---

## Mobile vs. Desktop Differences

### Desktop Advantages:
- Sidebar navigation always visible
- Multiple columns (patient list + details)
- Larger input fields
- Calendar view with drag-and-drop
- Spreadsheet-like tables
- Keyboard shortcuts
- Multiple windows/tabs

### Mobile Advantages:
- Simpler navigation (bottom tabs)
- Full-screen focus (no sidebar)
- Swipe gestures
- Voice-to-text for notes
- Native pickers (date, time)
- Less scrolling (priority content above fold)
- Offline draft saving

---

## Data Models & Relationships

```
┌─────────────┐
│  Therapist  │
│             │
│ • Name      │
│ • NPI       │
│ • License   │
│ • Practice  │
└─────────────┘
      ↓ (one-to-many)
      ↓
┌─────────────┐
│   Patient   │
│             │
│ • Name      │
│ • Insurance │
│ • Status    │
│ • Issues    │
└─────────────┘
      ↓ (one-to-many)
      ↓
┌─────────────┐
│   Session   │
│             │
│ • Date/time │
│ • Duration  │
│ • Notes     │
│ • Fee       │
└─────────────┘
      ↓ (one-to-one)
      ↓
┌──────────────┐
│    Invoice   │
│              │
│ • Amount     │
│ • Status     │
│ • Date paid  │
└──────────────┘

Also related:
Session → PreAuth (insurance approval)
Session → Claim (to insurance)
Patient → PaymentMethod (Stripe)
Therapist → Integration (Calendly, etc.)
```

---

## System Touchpoints (Where Automation Happens)

```
BACKGROUND PROCESSES (Running 24/7):

┌─ Insurance Eligibility Checker
│  • Runs every 7 days per patient
│  • Alerts if coverage ends
│  • Tracks pre-auth expiration
│
├─ Pre-Auth Monitoring
│  • Checks status every 4 hours
│  • Sends approval/denial notifications
│  • Triggers renewal requests at 60 days
│
├─ Payment Collector
│  • Invoice sent 1 day after session
│  • SMS reminder at day 3
│  • Email at day 7
│  • Mark paid when received
│
├─ Appointment Reminder Engine
│  • Email 48h before appointment
│  • SMS 24h before appointment
│  • Auto-skip holidays/therapist vacation
│
├─ Session Utilization Tracker
│  • Counts pre-auth visits used
│  • Alerts when nearing limit
│  • Flags if pre-auth exceeded
│
├─ Follow-Up Messenger
│  • Sends care message 7 days post-session
│  • Includes outcome survey
│  • Patient can reply/reschedule
│
├─ Weekly Summary Report
│  • Compiles key metrics
│  • Sends Sunday 8am
│  • Sessions, revenue, invoiced, to-do count
│
└─ Data Backup & Audit
   • Hourly incremental backups
   • Monthly full backup
   • Audit log of all actions
   • HIPAA compliance tracking
```

---

## Conversion Funnels & Retention

### Sign-Up Funnel:
```
1. Landing page visit: 100%
2. Sign up for free trial: 15%
3. Enter practice details: 12%
4. Add first patient: 8%
5. Complete first session: 6%
6. Convert to paid: 4-5%
```

### Activation Metrics:
```
Week 1: 
• At least 1 patient added
• 1 session booked
• Insurance verified for 1 patient

Week 2:
• 2+ sessions completed
• 1 pre-auth requested
• 1 invoice sent

Week 4:
• 4+ sessions completed
• Regular use (3+ days/week)
• At least 1 payment collected
```

### Retention Targets:
```
Month 1 Retention: 85% (losing trial users)
Month 3 Retention: 70% (finding better fit)
Month 12 Retention: 90%+ (sticky product)

Primary churn reasons to track:
• Too complicated (need better onboarding)
• Insurance integration issues (fix APIs)
• Missing features (feature requests)
• Price sensitivity (offer starter plan)
• System errors (improve reliability)
```

---

## Success Metrics to Track

```
User Engagement:
□ Daily active users
□ Average session duration
□ Features used (which ones adopted?)
□ Support ticket volume (should decline)

Business Metrics:
□ Monthly recurring revenue (MRR)
□ Customer acquisition cost (CAC)
□ Lifetime value (LTV)
□ Churn rate
□ Net revenue retention

Product Metrics:
□ Time to first pre-auth request
□ Sessions documented per week
□ Invoices sent per session
□ Automation usage (% of workflows automated)
□ System uptime & performance

Customer Health:
□ NPS score (target: 50+)
□ Feature adoption rate
□ Support satisfaction
□ Bug severity/frequency
```

---

This architecture ensures that therapists spend time on what matters (therapy) while the system handles the administrative burden automatically.
