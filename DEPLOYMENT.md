# ReIgnite Acquisition - Deployment Guide

Complete guide to deploy the website to Vercel with custom domain configuration.

---

## ✅ Pre-Deployment Checklist

- [ ] Website builds successfully (`npm run build`)
- [ ] All content reviewed and approved
- [ ] Profile photo in place (`/public/images/profile-photo.png`)
- [ ] Calendly URL configured (`/lib/constants.ts`)
- [ ] GitHub repository created
- [ ] Domain purchased (reigniteacquisition.com via GoDaddy)

---

## 🚀 Step 1: Push to GitHub

### Create GitHub Repository

1. Go to [github.com](https://github.com) and create new repository
2. Name: `reignite-website` (or your choice)
3. Keep it private or public (your choice)
4. Don't initialize with README (already exists)

### Push Code

```bash
cd /Users/thomaszachary/Cursor-Projects/OutreachOS/reignite-website

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - ReIgnite Acquisition website"

# Add remote origin (replace with your repo URL)
git remote add origin https://github.com/YOUR-USERNAME/reignite-website.git

# Push to GitHub
git push -u origin main
```

---

## 🌐 Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Select your `reignite-website` repository
4. Vercel will auto-detect Next.js settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
5. Click "Deploy"
6. Wait ~2-3 minutes for deployment to complete

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name? reignite-website
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

---

## 🔗 Step 3: Configure Custom Domain

### In Vercel Dashboard

1. Go to your project → Settings → Domains
2. Click "Add Domain"
3. Enter: `reigniteacquisition.com`
4. Click "Add"
5. Vercel will show DNS configuration needed

**Vercel will provide:**
- A Record: `76.76.21.21` (example - use actual IP)
- CNAME: `cname.vercel-dns.com`

### In GoDaddy DNS Management

1. Log in to [godaddy.com](https://godaddy.com)
2. Go to My Products → Domains → reigniteacquisition.com → DNS
3. Click "Add" to add new records:

**Add A Record:**
- **Type:** A
- **Name:** @ (root domain)
- **Value:** `76.76.21.21` (use IP from Vercel)
- **TTL:** 600 seconds

**Add CNAME Record:**
- **Type:** CNAME
- **Name:** www
- **Value:** `cname.vercel-dns.com`
- **TTL:** 3600 seconds

4. Click "Save"

### Wait for DNS Propagation

- **Time:** 5 minutes to 48 hours (typically 15-30 minutes)
- **Check Status:** Use [whatsmydns.net](https://whatsmydns.net)
- Enter domain: `reigniteacquisition.com`
- Check if A record points to Vercel IP globally

---

## 🔒 Step 4: SSL Certificate (Automatic)

Vercel automatically provisions SSL certificates via Let's Encrypt.

**Verification:**
1. Once DNS propagates, visit `https://reigniteacquisition.com`
2. Check for padlock icon in browser
3. Certificate is auto-renewed every 60 days

---

## 🎯 Step 5: Test the Deployment

### Homepage Test

Visit: `https://reigniteacquisition.com`

**Check:**
- [ ] Hero section loads with profile photo
- [ ] All sections visible (Results Promise, How It Works, etc.)
- [ ] Calendly widget loads at bottom
- [ ] All CTAs link to Calendly
- [ ] Mobile responsive (test on phone)

### Case Studies Page Test

Visit: `https://reigniteacquisition.com/case-studies`

**Check:**
- [ ] 6 case studies display
- [ ] Grid layout responsive
- [ ] All CTAs link to Calendly
- [ ] Back to Home link works

### Performance Test

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit for:
   - Performance: Target 90+
   - Accessibility: Target 95+
   - Best Practices: Target 95+
   - SEO: Target 95+

### Calendly Integration Test

1. Click "Book Your Discovery Call" button
2. Verify Calendly widget loads
3. Test booking flow (select date/time)
4. Confirm booking notification emails work

---

## 🔄 Step 6: Future Updates

### Deploy Updates

Every time you push to GitHub `main` branch, Vercel auto-deploys.

```bash
# Make changes
git add .
git commit -m "Update testimonials"
git push origin main

# Vercel auto-deploys in ~2 minutes
```

### Manual Redeploy

In Vercel dashboard:
1. Go to Deployments tab
2. Click "..." menu on latest deployment
3. Click "Redeploy"

---

## 🐛 Troubleshooting

### Domain Not Working

**Issue:** Domain shows "ERR_NAME_NOT_RESOLVED"

**Fix:**
1. Check DNS records in GoDaddy match Vercel exactly
2. Wait 30-60 minutes for DNS propagation
3. Clear browser cache
4. Try incognito mode

### Calendly Widget Not Loading

**Issue:** Widget section is blank

**Fix:**
1. Check browser console for errors
2. Verify script loads: DevTools → Network → Filter "calendly"
3. Check CALENDLY_URL in `/lib/constants.ts`
4. Redeploy if needed

### Build Fails on Vercel

**Issue:** Deployment fails with build error

**Fix:**
1. Check build logs in Vercel dashboard
2. Run `npm run build` locally to reproduce
3. Fix errors, commit, push
4. Vercel auto-redeploys

### SSL Certificate Error

**Issue:** "Your connection is not private"

**Fix:**
1. Wait 10-15 minutes after DNS propagation
2. Vercel provisions SSL automatically
3. Force renewal: Vercel Dashboard → Settings → Domains → Refresh

---

## 📊 Post-Deployment Monitoring

### Analytics Setup (Optional)

**Vercel Analytics (Built-in):**
1. Go to project → Analytics tab
2. View page views, unique visitors, top pages

**Google Analytics:**
1. Create GA4 property
2. Add tracking code to `app/layout.tsx`
3. Redeploy

### Performance Monitoring

- Check Lighthouse scores weekly
- Monitor Vercel deployment logs for errors
- Test Calendly integration monthly

---

## 🎉 Launch Checklist

Before announcing the website publicly:

- [ ] Domain loads correctly (https://reigniteacquisition.com)
- [ ] SSL certificate active (padlock icon)
- [ ] All pages tested (Homepage, Case Studies)
- [ ] Calendly integration working
- [ ] Mobile responsive verified
- [ ] Lighthouse scores >90
- [ ] Content proofread (no typos)
- [ ] All links work (no 404s)
- [ ] Social sharing tested (Open Graph preview)
- [ ] Contact email works (if added)

---

## 📞 Support

**Vercel Issues:** [vercel.com/support](https://vercel.com/support)
**GoDaddy DNS:** [godaddy.com/help](https://godaddy.com/help)
**Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)

---

**Deployment Complete! 🚀**

Your website is now live at **[https://reigniteacquisition.com](https://reigniteacquisition.com)**
