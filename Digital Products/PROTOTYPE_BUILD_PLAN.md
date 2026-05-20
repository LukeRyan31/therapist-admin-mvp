# Therapist Admin Suite - Prototype Build Plan

## Prototype Philosophy

**Not:** A perfect, fully-featured product
**Is:** A working MVP that proves the core value proposition

**Core Value Proposition to Test:**
"We save therapists 10+ hours/week on admin by automating insurance pre-auth, session notes, and invoicing."

**Success Metric:** 
Get 5-10 therapists using the prototype weekly for 4 weeks, tracking time saved.

---

## Prototype Scope (MVP)

### ✅ INCLUDE (Testable, Must-Have Features)

1. **Dashboard**
   - Welcome message
   - Today's appointments (read from Calendly)
   - Key metrics (sessions this month, revenue, pending invoices)
   - Action items (tasks that need attention)

2. **Patient Management**
   - Add new patient (simple form)
   - Patient list view
   - View patient details (insurance, session history)
   - Edit patient info

3. **Insurance Pre-Auth Workflow**
   - Verify eligibility (manual input OR API call)
   - Request pre-auth (fill form, submit via Zapier)
   - Track status (show submitted/approved/pending)
   - See pre-auth details

4. **Session Notes**
   - Create session note (text input)
   - AI-assisted notes (ChatGPT API generates draft)
   - Therapist edits note
   - Save note to database

5. **Invoicing**
   - Auto-generate invoice after session (manual trigger)
   - Show invoice preview
   - Send to client (email link)
   - Track payment status (manual mark as paid)

6. **Task Management**
   - View action items
   - Mark complete
   - See what's overdue

### ❌ EXCLUDE (Nice-to-Have, Build Later)

- ❌ Voice-to-text recording (too complex for MVP)
- ❌ Dark mode (build after core works)
- ❌ Mobile app (web-only for prototype)
- ❌ Group practice features (solo therapist only)
- ❌ Advanced analytics (simple dashboard only)
- ❌ Custom email templates (basic templated emails)
- ❌ SMS reminders (email only)
- ❌ Real insurance API integration (manual verification)
- ❌ Stripe integration (free prototype, optional link)
- ❌ Automated workflow triggers (manual for now)

---

## Tech Stack (No-Code/Low-Code)

### Frontend
- **Webflow** (landing page + simple UI, OR)
- **Bubble.io** (full app builder, RECOMMENDED for quick MVP)
- **FlutterFlow** (mobile-friendly, cross-platform)

**Recommendation:** **Bubble.io** for speed (3-4 weeks vs. 6-8 weeks for React)

### Database
- **Airtable** (simple, connected to Bubble, free tier)
- **Firebase** (more powerful, free tier)
- **Bubble's built-in database** (simplest, all-in-one)

**Recommendation:** **Bubble's built-in DB** (no extra integrations needed)

### Integrations
- **Zapier** (core automation glue)
- **Make.com** (formerly Integromat, similar to Zapier)
- **Calendly API** (read therapist's schedule)
- **Stripe** (optional: payment links, not required for MVP)
- **OpenAI API** (ChatGPT for session note drafting)
- **Twilio SendGrid** (email sending, free tier)

### Authentication
- **Bubble's built-in auth** (username/password, social login)
- **Auth0** (if you want enterprise-grade)

---

## Week-by-Week Build Plan

### WEEK 1-2: Setup & Foundation

**Week 1 Goals:**
- Set up Bubble.io project
- Create data schema (Patient, Session, Invoice, PreAuth)
- Build login/signup flow
- Create main navigation

**Deliverables:**
- [ ] Bubble.io account + project created
- [ ] Database schema designed (Airtable or Bubble DB)
- [ ] Login page functional
- [ ] Main navigation built (sidebar or top nav)
- [ ] User can create account & log in

**Time:** 8-10 hours

**Bubble Learning Resources:**
- Bubble Academy: https://bubble.io/academy
- Focus: Data types, UI elements, navigation

---

### WEEK 2-3: Dashboard & Patient Management

**Week 2 Goals:**
- Build dashboard with key metrics
- Create patient list page
- Build patient detail view
- Connect to Calendly (read schedule)

**Deliverables:**
- [ ] Dashboard shows:
  - Welcome message
  - Today's appointments (from Calendly API)
  - This month's metrics (session count, revenue)
  - Pending action items
- [ ] Patient List page with:
  - Search & filter
  - Add new patient button
  - List of all patients
- [ ] Patient Detail page with:
  - Full patient info
  - Insurance details
  - Session history
  - Edit button
- [ ] Calendly integration connected (read-only)

**Time:** 12-14 hours

**Key Bubble Skills:**
- API connectors (Calendly)
- Dynamic content (show/hide based on data)
- Repeating groups (list display)
- Forms (patient creation)

---

### WEEK 3-4: Insurance Pre-Auth & Session Notes

**Week 3 Goals:**
- Build insurance verification workflow
- Build pre-auth request form
- Create pre-auth tracking page
- Integrate OpenAI for note generation

**Deliverables:**
- [ ] Insurance Verification page:
  - Patient selection
  - Insurance info input
  - Eligibility check (manual or via API)
  - Display results
- [ ] Pre-Auth Request workflow:
  - Form with diagnosis, frequency, duration
  - Pre-fill therapist info
  - Submit button
  - Zapier automation to send via email/API
- [ ] Pre-Auth Status tracker:
  - Show all pre-auths
  - Status (pending/approved/denied)
  - Expiration dates
  - Manual status update button
- [ ] Session Notes page:
  - Create new note (text input)
  - ChatGPT API call (sends text to OpenAI, gets draft)
  - Therapist edits draft
  - Save to database

**Time:** 14-16 hours

**Key Bubble Skills:**
- API connectors (OpenAI, Zapier)
- Conditional logic (show/hide based on pre-auth status)
- Multi-step workflows (note creation → AI → edit → save)

---

### WEEK 4-5: Invoicing & Task Management

**Week 4 Goals:**
- Build invoice generation
- Create invoice tracking
- Build task/action items system
- Email integration for sending invoices

**Deliverables:**
- [ ] Invoice Creation:
  - Select patient & session date
  - Auto-calculate amount (from patient default fee)
  - Create invoice preview
  - Generate invoice (PDF or HTML)
- [ ] Send Invoice:
  - Email invoice to patient (via SendGrid)
  - Show email sent confirmation
  - Track sent date
- [ ] Invoice Tracker:
  - List all invoices
  - Show status (pending, paid, overdue)
  - Manual mark as paid button
  - Payment due date field
- [ ] Task Management:
  - Show pending tasks
  - Quick add task
  - Mark complete
  - Show overdue items

**Time:** 12-14 hours

**Key Bubble Skills:**
- PDF generation (send PDF invoice)
- Email API (SendGrid)
- Conditional rendering (paid vs. unpaid)
- Form submissions & workflows

---

### WEEK 5-6: Integrations & Polish

**Week 5 Goals:**
- Automate task creation (from pre-auths, invoices)
- Zapier workflow integration
- Settings page (basic)
- Data validation & error handling

**Deliverables:**
- [ ] Automation setup:
  - Auto-create task when pre-auth submitted
  - Auto-create task when invoice unpaid > 7 days
  - Auto-send email to therapist when pre-auth approved
- [ ] Settings page:
  - Update profile info
  - Set default session fee
  - Toggle automations on/off
- [ ] Error handling:
  - Show error messages (failed API calls, etc.)
  - Validation on forms (required fields, etc.)
  - Success messages after actions
- [ ] Zapier automation setup:
  - Pre-auth submission → email to insurance
  - Payment reminder → send email to patient
  - Weekly summary → compile metrics & email

**Time:** 10-12 hours

---

### WEEK 6-7: Testing & First Users

**Week 6 Goals:**
- User testing with 3-5 therapists
- Bug fixes
- Performance optimization
- Feedback collection

**Deliverables:**
- [ ] Recruit 5 beta testers (local therapists, online communities)
- [ ] Send them login credentials
- [ ] Collect feedback via form + interviews
- [ ] Track 2-3 real workflows (new patient → session → invoice)
- [ ] Fix critical bugs
- [ ] Document what users struggled with
- [ ] Measure time savings (ask: "How long would this take manually?")

**Time:** 8-10 hours (plus async user testing)

**How to Recruit:**
1. Post in r/therapists, r/psychologists
2. Email 20 therapists from Psychology Today
3. Join therapist Facebook groups
4. Ask friends for referrals
5. Offer $50 Amazon gift card for 30-min feedback call

---

### WEEK 7-8: Refinement & Launch

**Week 7 Goals:**
- Address user feedback
- Improve UX based on testing
- Create onboarding flow
- Build simple help documentation
- Prepare for wider launch

**Deliverables:**
- [ ] Onboarding walkthrough (first-time user experience)
- [ ] Help documentation (how to use each feature)
- [ ] FAQ page
- [ ] Demo video (2-3 min showing core workflow)
- [ ] Landing page (explain what it does, benefits)
- [ ] Sign-up page improvements (ask for license #, NPI)
- [ ] Basic analytics (track feature usage)

**Time:** 8-10 hours

---

## Build Timeline Summary

```
Week 1-2:  Setup & Dashboard           (18 hours)
Week 2-3:  Patient Management          (13 hours)
Week 3-4:  Insurance & Notes           (15 hours)
Week 4-5:  Invoicing & Tasks           (13 hours)
Week 5-6:  Integrations & Polish       (11 hours)
Week 6-7:  Testing & Feedback          (9 hours)
Week 7-8:  Refinement & Launch         (9 hours)
           ─────────────────────────────────
TOTAL:     ~90 hours over 8 weeks (11-12 hrs/week)
```

**If working full-time on this:** 2-3 weeks
**If working part-time:** 6-8 weeks

---

## Detailed Build Instructions by Feature

### FEATURE 1: Dashboard

**Bubble Setup:**

1. Create new page called "Dashboard"
2. Create Repeating Group for "Appointments":
   - Data source: API call to Calendly (fetch today's events)
   - Each item shows: time, patient name, duration, status
3. Create Stats Cards showing:
   - Sessions this month (count from Sessions table)
   - Revenue this month (sum Sessions.fee where date in current month)
   - Pre-auths pending (count PreAuth where status = "pending")
   - Unpaid invoices (count Invoices where status = "unpaid")
4. Create Task List:
   - Repeating group from Tasks table
   - Show overdue items first (red highlight)
   - Add checkmark icon to mark complete

**Calendly Integration:**
```
API Connector:
- URL: https://calendly.com/api/v1/user/events
- Headers: Authorization: Bearer [CALENDLY_API_TOKEN]
- Parse response: Extract title, start_time, location
- Display in repeating group
```

**Mockup:**
```
┌─────────────────────────────────────┐
│ 👋 Welcome back, Sarah              │
│                                     │
│ ┌──────────┬──────────┬──────────┐  │
│ │ 6        │ $1,200   │ 1        │  │
│ │ Sessions │ Revenue  │ Pre-auth │  │
│ └──────────┴──────────┴──────────┘  │
│                                     │
│ TODAY'S SCHEDULE                    │
│ ┌─────────────────────────────────┐ │
│ │ 2:00 PM - John D. (60 min)      │ │
│ │ ✓ Insurance OK | Notes: Ready   │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 3:30 PM - Sarah M. (45 min)     │ │
│ │ ⚠ Pre-auth missing              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ACTION ITEMS                        │
│ ☐ Call Blue Cross (Sarah M.)       │
│ ☐ Send payment reminder (2 clients)│
│ ☐ Review new patient intake        │
└─────────────────────────────────────┘
```

---

### FEATURE 2: Patient Management

**Database Schema (Bubble Data Types):**

```
Patient
├─ Name (text)
├─ Email (text)
├─ Phone (text)
├─ Date of Birth (date)
├─ Insurance Company (text)
├─ Insurance Member ID (text)
├─ Copay Amount (number)
├─ Session Rate (number)
├─ Status (single select: Active, Paused, Inactive)
├─ Created Date (date)
└─ Sessions (link to Sessions)
```

**Pages Needed:**

1. **Patient List**
   - Repeating group showing all patients
   - Search box (filter by name)
   - "Add New Patient" button
   - Click row to see details

2. **New Patient Form**
   - Input fields for all Patient fields
   - "Create Patient" button
   - Show success message
   - Redirect to patient detail page

3. **Patient Detail**
   - Display all patient info
   - "Edit" button (toggle edit mode)
   - Show related sessions
   - Show related invoices
   - Show related pre-auths

**Bubble Implementation:**
```
Step 1: Create "Patient" data type
- Right-click DB → New data type → name "Patient"
- Add fields (name, email, phone, etc.)

Step 2: Create Patient List page
- Add Repeating Group
- Data source: "Search for Patients"
- Cells show: Name, Status, Last Session
- Add "Add New Patient" button

Step 3: Create Patient Form page
- Add form inputs for each field
- Button: "Create Patient"
- Workflow on button click:
  - Create new Patient
  - Reset form
  - Show success message
  - Navigate to Patient detail page
```

---

### FEATURE 3: Insurance Pre-Auth Workflow

**Database Schema:**

```
PreAuth
├─ Patient (link to Patient)
├─ Insurance Company (text)
├─ Diagnosis Codes (text)
├─ Requested Frequency (text, e.g., "1x/week")
├─ Requested Duration (text, e.g., "52 sessions")
├─ Status (single select: Pending, Approved, Denied)
├─ Request ID (text, auto-generated)
├─ Submitted Date (date)
├─ Response Date (date)
├─ Expires Date (date)
├─ Notes (text)
└─ Created Date (date)
```

**Pages Needed:**

1. **Verify Eligibility**
   - Dropdown to select patient
   - Input fields: insurance company, member ID
   - Button: "Check Eligibility"
   - Show results (coverage details)

2. **Request Pre-Auth**
   - Select patient
   - Auto-fill insurance info (from Patient record)
   - Input: diagnosis codes, frequency, duration
   - Button: "Submit to Insurance"
   - Show confirmation message

3. **Pre-Auth Tracker**
   - List all pre-auths
   - Filter by status (pending, approved, denied)
   - Show request ID, patient, status, expiration
   - Manual status update button
   - Click to see details

**Zapier Automation:**

When pre-auth submitted:
1. Trigger: Bubble sends data to Zapier
2. Action 1: Send email to insurance company
   - Template includes: patient info, diagnosis, frequency
   - Email to: [insurance company email]
3. Action 2: Send Slack notification to therapist
   - Message: "Pre-auth submitted for [patient]"

**Bubble Implementation:**
```
Step 1: Create "PreAuth" data type
Step 2: Create "Verify Eligibility" page
- Manual input (insurance company + member ID)
- Button calls Zapier to check eligibility
- Zapier sends data back, shows in UI

Step 3: Create "Request Pre-Auth" page
- Populate patient dropdown
- Auto-fill insurance info from Patient
- Add form fields for diagnosis, frequency, duration
- Button workflow:
  - Create new PreAuth
  - Call Zapier (send email to insurance)
  - Show success message
  - Add action item "Follow up if not approved by [date]"

Step 4: Create "Pre-Auth Tracker" page
- Repeating group of all PreAuths
- Filter by status
- Show countdown timer (days until response expected)
- Manual "Mark Approved" button
```

---

### FEATURE 4: Session Notes (AI-Assisted)

**Database Schema:**

```
SessionNote
├─ Patient (link to Patient)
├─ Date (date)
├─ Duration Minutes (number)
├─ Raw Input (text, what therapist typed/recorded)
├─ AI Draft (text, ChatGPT generated)
├─ Final Note (text, therapist's edited version)
├─ Status (single select: Draft, Complete, Archived)
├─ Created Date (date)
└─ Updated Date (date)
```

**Pages Needed:**

1. **Create Session Note**
   - Select patient
   - Input session date & duration
   - Textarea: "What happened in session?" (therapist types)
   - Button: "Generate AI Draft"
   - Show AI draft (highlighted as draft)
   - Therapist can edit draft
   - Button: "Save Final Note"

**Bubble + OpenAI Integration:**

```
Step 1: Get OpenAI API key
- Go to openai.com
- Create account
- Get API key

Step 2: Add API Connector in Bubble
- New API → Name: "OpenAI Chat"
- URL: https://api.openai.com/v1/chat/completions
- Headers: 
  - Authorization: Bearer [YOUR_OPENAI_API_KEY]
  - Content-Type: application/json
- Method: POST
- Body:
  {
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "user",
        "content": "You are a therapist's note generator. Turn this session summary into professional therapy notes:\n\n[THERAPIST_INPUT]"
      }
    ]
  }

Step 3: Create page
- Patient dropdown
- Date picker
- Duration input
- Textarea: "Session summary"
- Button: "Generate Draft"
  - Workflow: Call OpenAI API with textarea content
  - Receive response
  - Display in editable textarea
- Button: "Save Note"
  - Workflow: Save final note to database
  - Create follow-up task (7 days out: "Follow up with patient")

Step 4: Show success
- Toast message: "Note saved!"
- Show countdown to next session
```

**Prompt Engineering Tips:**
```
Good prompt:
"You are a professional therapist. Transform this session 
summary into clinical therapy notes following standard 
progress note format (Chief Complaint, Session Focus, 
Progress, Homework, Next Steps):

[SESSION SUMMARY HERE]"

Output will be professional, structured notes.
```

---

### FEATURE 5: Invoicing

**Database Schema:**

```
Invoice
├─ Patient (link to Patient)
├─ Session Date (date)
├─ Amount (number)
├─ Copay (number, from Patient record)
├─ Insurance Amount (number, calculated: Amount - Copay)
├─ Invoice Number (text, auto-generated)
├─ Date Generated (date)
├─ Due Date (date)
├─ Status (single select: Draft, Sent, Paid, Overdue)
├─ Date Paid (date)
├─ Payment Method (text)
└─ Notes (text)
```

**Pages Needed:**

1. **Create Invoice**
   - Select patient & session date
   - Auto-populate amount (from Patient.sessionRate)
   - Auto-calculate copay (from Patient.copay)
   - Show preview
   - Button: "Generate Invoice"

2. **Invoice List**
   - Show all invoices
   - Filter by status (sent, paid, overdue)
   - Show amount, due date, status
   - Click to view details

3. **Send Invoice**
   - Show invoice preview
   - Email field (pre-filled from Patient.email)
   - Button: "Send to Patient"
   - Integrates with SendGrid to send email with invoice

**Zapier Workflow:**

```
Trigger: Invoice created with status "Sent"

Action 1: Send email via SendGrid
- To: [Patient email]
- Subject: "Invoice from [Therapist Name]"
- Body: "Here's your session invoice..."
- Attachment: [Invoice PDF or link]

Action 2: Create follow-up task
- "Payment reminder for [Patient]"
- Due date: [Invoice due date]

Action 3: Send Slack notification
- "Invoice sent to [Patient] for [Amount]"
```

**Bubble Implementation:**
```
Step 1: Create "Invoice" data type

Step 2: Create "Create Invoice" page
- Dropdown: Select patient
- Date picker: Session date
- Amount field: Pre-fill from Patient.sessionRate
- Copay field: Auto-fill from Patient.copay
- Button: "Generate Invoice"
  - Workflow: Create new Invoice record
  - Show preview
  
Step 3: Create "Send Invoice" page
- Show invoice details
- Email field (pre-filled)
- Button: "Send to Patient"
  - Workflow: Call SendGrid API to send email
  - Update Invoice status to "Sent"
  - Create task for payment reminder
  - Show success message

Step 4: Create "Invoice List" page
- Repeating group of Invoices
- Filter by status
- Show: Patient name, amount, due date, status
- Color-code unpaid/overdue (red)
- Button on each: "Mark as Paid"
```

---

## User Testing Plan

### Who to Test With:
- 5-10 therapists (mix of experienced + tech-savvy)
- Mix of solo and small group practices
- Different specialties (helps validate across niches)

### How to Recruit:
```
Email template to therapists:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subject: Free admin automation tool (+ $50 gift card)

Hi [Name],

I'm building a tool to save therapists 10+ hours/week on 
admin work (insurance, invoicing, notes).

I'm looking for 5-10 therapists to test it for free and give 
feedback. Takes ~30 min/week, you get early access + $50 
Amazon gift card.

Interested?

[Sign up link]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Testing Framework:

**Week 1 (Setup):**
- [ ] Send credentials to 5 beta testers
- [ ] Record 10-min intro call with each
- [ ] Ask them to add 1 patient, complete 1 workflow
- [ ] Collect initial impressions via Google Form

**Week 2-3 (Usage):**
- [ ] Testers use platform for real work
- [ ] Track which features they use
- [ ] Note which they skip
- [ ] Collect bug reports
- [ ] Time each workflow (measure time savings)

**Week 4 (Feedback):**
- [ ] 30-min feedback calls with each tester
- [ ] Ask:
  - What was easiest to use?
  - What was confusing?
  - What would you pay for this?
  - Would you recommend it?
  - What's missing?
- [ ] NPS score (0-10, would you recommend?)
- [ ] Compile findings

### Success Criteria:
```
✓ 80%+ of features used (not abandoned)
✓ Average time saved = 3+ hours/week per therapist
✓ NPS score ≥ 7 (promoters)
✓ 0 critical bugs (crashes, data loss, etc.)
✓ ≥1 tester asks "When can I pay for this?"
```

---

## Validation Metrics to Track

**During Prototype Phase:**

1. **Usage Metrics**
   - Daily active users (% of testers)
   - Feature adoption (which features used most)
   - Session completion rate (% who finish a workflow)
   - Time in app (how long do they stay)

2. **Business Metrics**
   - Time saved per user (self-reported)
   - Tasks automated per user
   - Willingness to pay ($$ quoted)
   - Feature requests (indicates what they want)

3. **Quality Metrics**
   - Bug reports (track & prioritize)
   - Error rates (feature failures)
   - Load time (performance)
   - Data accuracy (invoices calc correctly, etc.)

4. **Satisfaction Metrics**
   - NPS score (would recommend?)
   - Feature satisfaction (rate each feature 1-5)
   - Ease of use (rate 1-5)
   - Likelihood to use weekly (yes/no)

**Tracking Sheet:**
```
User    │ Usage Days │ Features Used │ Time Saved │ NPS │ Notes
─────────┼────────────┼───────────────┼────────────┼─────┼──────
User 1   │ 15/28      │ 5/6           │ 5 hrs      │ 9   │ Loved it
User 2   │ 8/28       │ 2/6           │ 2 hrs      │ 6   │ Confusing
User 3   │ 22/28      │ 6/6           │ 8 hrs      │ 10  │ Best so far
...
```

---

## Common Pitfalls to Avoid

❌ **Building too much**: Focus on 3 core workflows, not 10
❌ **Over-engineering**: Use no-code, not custom code
❌ **Ignoring testing**: Test with real users early (week 4)
❌ **Perfect design first**: Function > form for MVP
❌ **No integrations**: Connect Calendly + Zapier early
❌ **Unclear value**: Measure time saved explicitly
❌ **Poor feedback loop**: Ask "How long would this take manually?" for each workflow
❌ **Delayed launch**: Ship by week 6, iterate after

---

## Post-Prototype Next Steps

**If Testing Goes Well (NPS 7+, 3+ hrs/week saved):**
1. Build mobile app
2. Add SMS reminders
3. Real insurance API integration
4. Stripe payment processing
5. White-label for practices
6. Raise $100K seed round

**If Testing Needs Work (NPS <7, <2 hrs/week saved):**
1. Iterate on UX (simplify)
2. Add missing feature that testing revealed
3. Re-test with 5 more users
4. Adjust value prop (maybe it's not about time, it's about insurance accuracy)

**Next Validation Gate:**
- Can you get 10 therapists to pay $99/month?
- That's your signal it's time to build the real product

---

## Prototype Success Checklist

**By End of Week 8:**

- [ ] 5-10 active beta testers
- [ ] Dashboard working (shows real data)
- [ ] Patient management functional
- [ ] Insurance pre-auth workflow complete
- [ ] Session notes with AI generation working
- [ ] Invoicing & payment tracking live
- [ ] Task management functional
- [ ] Calendly integration connected
- [ ] Zapier automations set up
- [ ] User testing completed
- [ ] NPS feedback collected
- [ ] Time savings measured (avg 3+ hours/week)
- [ ] Bug list prioritized
- [ ] Landing page ready
- [ ] Ready to approach VCs/customers with proof

---

## Budget Estimate

| Item | Cost | Notes |
|------|------|-------|
| Bubble.io Pro | $30/mo | 3 months = $90 |
| Airtable | Free | Free tier sufficient |
| OpenAI API | $20 | ~500 API calls at $0.04 |
| Zapier | $0-20 | Free tier covers MVP |
| Calendly | Free | Free tier ok |
| SendGrid | Free | Free tier ok |
| Domain name | $12/yr | therapistadmin.com |
| Beta tester incentives | $250 | $50 × 5 testers |
| **TOTAL** | **~$400** | Extremely low cost |

---

## Success Story: How to Talk About Your Prototype

**Bad:**
"We built admin software for therapists."

**Good:**
"We cut admin time by 5+ hours/week. 10 therapists tested it. They saved on average 7 hours/week on insurance pre-auth, invoicing, and session notes. One said 'I've been waiting for something like this for 3 years.'"

**Your story after prototype:**
"Sarah, a therapist in Austin, used our prototype for 4 weeks. She normally spends 2 hours/day on insurance pre-auth calls and invoicing. With our tool, that dropped to 20 minutes. She saved 8 hours/week and asked when she could pay for it. We're validating with 50 more therapists before launching."

---

That's your foundation. Ship it. Get feedback. Iterate. Repeat.

Good luck.
