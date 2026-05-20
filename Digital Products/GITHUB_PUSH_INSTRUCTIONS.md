# Push to GitHub in 5 Minutes (Step by Step)

## Prerequisites (Do These First)
- [ ] Create free GitHub account at github.com (if you don't have one)
- [ ] Install Git on your computer (git-scm.com)
- [ ] Have all the code files from our build
- [ ] Have Node.js 18+ installed

---

## Step 1: Create GitHub Repository (1 min)

1. Go to **github.com** and log in
2. Click **+** in top right → **New repository**
3. Fill in:
   - **Repository name:** `therapist-admin-mvp`
   - **Description:** "AI-powered admin system for therapists"
   - **Public** (so you can share the URL later)
   - **DO NOT initialize with README** (we'll do that)
4. Click **Create repository**
5. Copy the URL it shows (should be `https://github.com/YOUR_USERNAME/therapist-admin-mvp.git`)

---

## Step 2: Set Up Local Git (2 min)

Open your terminal/command prompt and run:

```bash
# Navigate to your project folder
cd C:\Users\luker\Documents\Claude\Projects\Digital Products

# Initialize git
git init

# Configure git (your GitHub info)
git config user.name "Luke Ryan"
git config user.email "lukeryanrose762@gmail.com"

# Add all files
git add .

# Create first commit
git commit -m "Initial therapist admin MVP setup"

# Add GitHub as remote (your repo URL)
git remote add origin https://github.com/LukeRyan31/therapist-admin-mvp.git

# Rename branch to main (required by GitHub)
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Step 3: Verify on GitHub (1 min)

1. Go to github.com/YOUR_USERNAME/therapist-admin-mvp
2. You should see all your files there
3. Click the green **< > Code** button
4. Copy the HTTPS URL

**You now have your code on GitHub!** ✅

---

## What to Push

All files from:
```
C:\Users\luker\Documents\Claude\Projects\Digital Products\
```

The `.git add .` command will automatically include:
- All documentation files (*.md)
- All code files (*.ts, *.tsx)
- And ignore node_modules, .env.local, etc. (we'll create .gitignore)

---

## If You Get an Error

### Error: "fatal: not a git repository"
→ Make sure you ran `git init` first

### Error: "fatal: 'origin' does not appear to be a git repository"
→ Make sure you copied the exact GitHub URL from Step 1

### Error: "permission denied" or auth issues
→ You may need to create a Personal Access Token:
1. Go to github.com/settings/tokens
2. Click "Generate new token"
3. Copy the token
4. When git asks for password, paste the token instead

### Error: "rejected... push would overwrite"
→ Run: `git pull origin main --allow-unrelated-histories`
→ Then: `git push origin main`

---

## You're Done! 

Your code is now on GitHub at:
```
https://github.com/YOUR_USERNAME/therapist-admin-mvp
```

**Next step:** Follow DEPLOY_TO_VERCEL_QUICK_GUIDE.md to deploy from GitHub to Vercel

---

## Commands Cheat Sheet (Copy & Paste)

```bash
# Setup (run once)
cd "C:\Users\luker\Documents\Claude\Projects\Digital Products"
git init
git config user.name "Luke Ryan"
git config user.email "lukeryanrose762@gmail.com"
git add .
git commit -m "Initial therapist admin MVP setup"
git remote add origin https://github.com/LukeRyan31/therapist-admin-mvp.git
git branch -M main
git push -u origin main

# After making changes (run each time you want to update)
git add .
git commit -m "Your change description"
git push origin main
```

---

## Verify It Worked

1. Go to `https://github.com/LukeRyan31/therapist-admin-mvp`
2. You should see all the files listed
3. You should see "therapist-admin-mvp" in the top left
4. Copy that HTTPS URL for the next step (Vercel deployment)

---

Done! Your code is safely on GitHub. 🎉
