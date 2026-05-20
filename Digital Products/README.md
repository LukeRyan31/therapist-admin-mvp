# Therapist Admin Suite MVP

AI-powered administration system for therapists. Automate scheduling, notes, invoicing, insurance pre-auth, and task management.

## Features

✨ **AI Session Notes** - Transcribe audio, auto-generate SOAP notes  
📋 **Insurance Pre-Auth Tracking** - Status monitoring, expiration alerts  
💵 **Invoicing** - Auto-generate invoices, track payments  
✅ **Task Management** - AI-generated recommendations  
📅 **Calendly Integration** - Real-time appointment sync  
📧 **Email Automation** - Reminders, invoices, follow-ups  
📊 **Analytics Dashboard** - Key metrics, revenue tracking  

## Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (free at supabase.com)
- OpenAI API key (free credits available)
- Calendly API key
- SendGrid account (free tier: 100 emails/day)

### Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/LukeRyan31/therapist-admin-mvp.git
   cd therapist-admin-mvp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure database**
   - Go to supabase.com and create a project
   - Run the SQL schema from `MVP_BUILD_START.md`
   - Copy your project URL and API keys

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in these values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_KEY=your_service_key
   OPENAI_API_KEY=your_openai_api_key
   CALENDLY_API_KEY=your_calendly_api_key
   SENDGRID_API_KEY=your_sendgrid_api_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open http://localhost:3000 in your browser

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub (see `GITHUB_PUSH_INSTRUCTIONS.md`)
2. Go to vercel.com and connect your GitHub repo
3. Add environment variables
4. Deploy

**That's it!** Your app is now live.

For detailed instructions, see `DEPLOY_TO_VERCEL_QUICK_GUIDE.md`

## Project Structure

```
therapist-admin-mvp/
├── app/
│   ├── api/                    # API routes
│   ├── dashboard/              # Main dashboard pages
│   ├── layout.tsx
│   └── page.tsx
├── components/                 # React components
│   ├── ui/                     # Base components
│   └── features/               # Feature components
├── lib/                        # Utilities and API clients
│   ├── supabase.ts
│   ├── openai.ts
│   ├── calendly.ts
│   └── sendgrid.ts
├── styles/
├── public/
├── .env.local                  # ⚠️ Keep secret!
└── package.json
```

## Documentation

- **MVP_BUILD_START.md** - Complete setup guide
- **IMPLEMENTATION_GUIDE_PART_2.md** - Architecture & patterns
- **DEPLOY_TO_VERCEL_QUICK_GUIDE.md** - Deployment walkthrough
- **BUILD_COMPLETION_SUMMARY.md** - Overview & roadmap
- **FILE_INDEX_AND_QUICK_START.md** - Complete file reference

## Tech Stack

- **Frontend:** React 18, Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes, Node.js
- **Database:** Supabase (PostgreSQL)
- **AI:** OpenAI (GPT-3.5-turbo, Whisper)
- **APIs:** Calendly, SendGrid, Stripe
- **Deployment:** Vercel

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Features Roadmap

### MVP (Done) ✅
- Dashboard with key metrics
- Patient management (CRUD)
- AI session notes generation
- Insurance pre-auth tracking
- Task management
- Email automation
- Calendly integration

### Phase 2 (Coming Soon)
- Invoice PDF generation
- Stripe payment processing
- SMS reminders (Twilio)
- Real insurance API integration
- Group practice features

### Phase 3 (Future)
- Mobile app (React Native)
- Video call recording
- Advanced reporting
- White-label version

## Contributing

This is a beta MVP. Feedback from therapists is critical. If you're testing this:

1. Track what saves you the most time
2. Note features you wish existed
3. Share your NPS score (would you recommend this?)
4. Report any bugs

## Support

For issues or questions:
1. Check the documentation files
2. Review the implementation guide
3. Check the code comments
4. Create a GitHub issue

## License

MIT

## Roadmap: First 30 Days

**Week 1:** Deploy & test locally  
**Week 2:** Invite 5-10 beta therapists  
**Week 3-4:** Gather feedback, iterate, measure impact  

Goal: Therapists save 5+ hours/week, NPS ≥7

## Status

🚀 **MVP v0.1** - Ready for beta testing  
✅ Fully functional with AI integrations  
✅ Production-ready code  
⏳ Looking for beta testers  

---

**Want to test this?** DM me on Twitter or email - first 10 therapists get free lifetime access if you provide detailed feedback.

---

Built with ❤️ for therapists who deserve better tools.
