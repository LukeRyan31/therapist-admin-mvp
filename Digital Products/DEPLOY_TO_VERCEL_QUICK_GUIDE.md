# Deploy Therapist Admin MVP to Vercel in 10 Minutes

## Pre-Deployment Checklist

- [ ] Next.js project created locally
- [ ] All files copied from guides (lib, api, components)
- [ ] Database schema created in Supabase
- [ ] `.env.local` configured with all API keys
- [ ] Project tested locally with `npm run dev`
- [ ] GitHub account ready
- [ ] Vercel account created (free at vercel.com)

---

## Step 1: Push to GitHub (2 min)

If you haven't pushed yet, follow **GITHUB_PUSH_INSTRUCTIONS.md** first.

Your repository will be at:
```
https://github.com/LukeRyan31/therapist-admin-mvp
```

✅ Your code is now on GitHub.

---

## Step 2: Set Up Vercel (3 min)

1. Go to **vercel.com** and sign up with GitHub
2. Click "Import Project"
3. Select your `LukeRyan31/therapist-admin-mvp` repository (or paste: https://github.com/LukeRyan31/therapist-admin-mvp)
4. Vercel auto-detects Next.js (no configuration needed)
5. Click "Deploy"

✅ Initial deploy started (will complete in 1-2 minutes)

---

## Step 3: Add Environment Variables (3 min)

While deployment is running:

1. In Vercel project settings → **Environment Variables**
2. Add each variable from your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL = [copy from Supabase]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [copy from Supabase]
SUPABASE_SERVICE_KEY = [copy from Supabase]
OPENAI_API_KEY = [your OpenAI API key]
CALENDLY_API_KEY = [your Calendly API key]
SENDGRID_API_KEY = [your SendGrid API key]
NEXT_PUBLIC_APP_URL = https://your-project.vercel.app
```

3. Click "Save"
4. Vercel automatically redeploys with new variables

✅ Environment variables configured and live.

---

## Step 4: Access Your Live App (2 min)

1. Wait for deployment to complete (status shows "Ready")
2. Click the **Visit** button or go to:
   ```
   https://therapist-admin-mvp-RANDOMID.vercel.app
   ```

3. You now have a **live, production-ready therapist admin system**

✅ **Live & accessible to anyone with the URL**

---

## Step 5: Test Core Functionality (2 min)

### Test Checklist:
- [ ] Can you sign up as a therapist?
- [ ] Can you log in?
- [ ] Dashboard loads with sample data?
- [ ] Can you create a new patient?
- [ ] Can you view patient list?
- [ ] Can you navigate between pages?

---

## Invite Beta Testers to Your Live App

Share the URL with therapists:

**Send this message:**

```
Hey! I built a free admin tool for therapists that automates the boring stuff 
(insurance, invoicing, notes, etc.) using AI.

Would you test it for me? Takes 10 minutes to set up, and it's free for beta.

➜ [paste your Vercel URL]

Let me know what you think - I'm tracking what saves you the most time.
```

**Where to find therapists:**
- Reddit: r/therapists, r/psychologists
- Facebook: Therapist communities, Psychology Today groups
- LinkedIn: Direct message to therapists
- Local therapy networks/associations

---

## Database Setup (If Not Done Yet)

If therapists will use the live app, make sure Supabase database is ready:

1. Log into Supabase project
2. Go to **SQL Editor**
3. Copy-paste the entire database schema from `MVP_BUILD_START.md`
4. Run it
5. Database is now live and connected

---

## Monitoring & Updates

### Check App Health:
- **Vercel Dashboard** → Deployments tab
- Green checkmark = working perfectly
- Click any deployment to see logs

### Push Updates:
```bash
# After making changes locally:
git add .
git commit -m "Added patient filtering feature"
git push origin main

# Vercel automatically redeploys (1-2 minutes)
```

---

## What You Now Have

| What | Status |
|------|--------|
| **Live URL** | ✅ Deployed on Vercel |
| **Database** | ✅ Supabase (PostgreSQL) |
| **Authentication** | ✅ Supabase Auth |
| **AI Features** | ✅ OpenAI integrated |
| **Integrations** | ✅ Calendly, SendGrid ready |
| **HTTPS** | ✅ Automatic SSL |
| **Domain** | ⏳ Can add custom domain ($12/year) |

---

## Optional: Add Custom Domain

1. In Vercel project settings → **Domains**
2. Add your domain (e.g., `therapistadmin.app`)
3. Add DNS records (Vercel provides instructions)
4. Live at `therapistadmin.app` in 5 minutes

---

## What's Next?

### Immediate (Day 1):
- [ ] Share live link with 2-3 therapist friends
- [ ] Get their initial feedback
- [ ] Fix any critical bugs
- [ ] Document what they ask for

### Week 1:
- [ ] Invite 5-10 more therapists
- [ ] Track what features they use most
- [ ] Measure time savings (survey them)
- [ ] Collect NPS score

### Week 2:
- [ ] Build top-requested features
- [ ] A/B test pricing tiers
- [ ] Set up Stripe for paid beta
- [ ] Prepare pitch deck

---

## Troubleshooting

### "Build failed"
→ Check Vercel build logs for TypeScript errors
→ Fix locally, push to main, redeploy

### "App loads but is blank"
→ Check browser console for errors
→ Verify all environment variables are set
→ Check Supabase credentials are correct

### "API calls failing"
→ Test API keys in Postman
→ Check CORS headers in API routes
→ Verify environment variables in Vercel match local

### "Database not loading"
→ Test Supabase connection: `npm run dev` locally first
→ Verify `NEXT_PUBLIC_SUPABASE_URL` is set correctly
→ Run database schema in Supabase SQL editor

---

## Cost Estimate

| Service | Free Tier | Cost |
|---------|-----------|------|
| **Vercel** | ✅ Unlimited | $0 |
| **Supabase** | ✅ 500MB DB | $0 |
| **OpenAI** | $5 free credit | ~$0.02/100 notes |
| **SendGrid** | 100 emails/day | Free initially |
| **Calendly** | ✅ Free plan | $0 |
| **Domain** | vercel.app | Free |
| **TOTAL** | **All included** | **~$0-5/month** |

---

## You're Now Live 🎉

✅ Production-ready therapist admin system  
✅ Fully functional with AI, integrations, and database  
✅ Ready for real users  
✅ Monitoring and auto-updates active  

**Next:** Start gathering user feedback to validate product-market fit.

---

## Save This Link

Your live app: `https://therapist-admin-mvp-[YOUR-ID].vercel.app`

Share it. Test it. Iterate based on feedback.

---

## References

- **Vercel Docs**: vercel.com/docs
- **Supabase Docs**: supabase.com/docs
- **Next.js Docs**: nextjs.org/docs
- **OpenAI API**: platform.openai.com/docs
- **Calendly API**: calendly.com/developers

Good luck! 🚀
