# Live Site QA Issues - ReIgnite Website
**Site:** https://reignite-website.vercel.app/
**Date:** 2026-02-09
**Status:** 🔴 REQUIRES FIXES

---

## 🚨 CRITICAL ISSUES

### 1. Wrong Profile Photo
**Issue:** Used `/public/images/profile-photo.png` but this is the WRONG headshot
**Correct File:** `/Users/thomaszachary/Downloads/profile photo.png`
**Impact:** High - Wrong founder image on hero section
**Fix:** Replace with correct headshot

---

## 🔍 SUSPECTED ISSUES (Need Visual Inspection)

Based on user feedback "needs significant QA work," likely issues include:

### Visual/Design Problems:

1. **Hero Section:**
   - Profile photo may be wrong person
   - Spacing issues with hero text
   - Profile photo alignment or sizing
   - Grid pattern overlay visibility

2. **Typography:**
   - Font loading issues (Inter font)
   - Font weights not rendering correctly
   - Heading hierarchy problems

3. **Colors:**
   - Custom Tailwind colors not applying
   - Gradient backgrounds not working
   - Accent colors incorrect

4. **Layout/Spacing:**
   - Section padding inconsistent
   - Component spacing off
   - Container widths not matching design
   - Mobile responsive issues

5. **Animations:**
   - Framer Motion not triggering
   - Scroll animations broken
   - Hover effects not working

6. **Components:**
   - Testimonials layout broken
   - Case studies cards not styled properly
   - Guarantee section visual issues
   - Calendly widget not rendering

7. **Images:**
   - Profile photo wrong/broken
   - Next.js Image optimization issues
   - Icons not displaying

8. **Mobile Responsive:**
   - Layout breaking on mobile
   - Text sizing issues
   - Components stacking incorrectly

---

## 🎯 COMPARISON: WhiteHorse vs ReIgnite

### WhiteHorse Reference Patterns:

1. **Header:**
   - Dark rounded header (`border-radius: 5rem`)
   - Fixed positioning with smooth scrolling
   - Logo + Navigation + CTA button

2. **Hero:**
   - Grid pattern SVG background
   - Centered content with large bold headings
   - Trust badges (Google reviews, star ratings)
   - Primary CTA button

3. **Cards:**
   - `rounded-lg` borders
   - Subtle shadows (`shadow-sm` to `shadow-lg`)
   - Hover effects (`hover:shadow-xl`, `hover:scale-105`)
   - Consistent padding

4. **Typography:**
   - Inter font family
   - Bold headings (font-bold)
   - `text-3xl` to `text-6xl` for headlines
   - `text-muted-foreground` for descriptions

5. **Colors (Dark Theme):**
   - `bg-background` (dark)
   - `text-primary` (blue accent)
   - `bg-card` (slightly lighter dark)
   - `hover:bg-accent` transitions

6. **Spacing:**
   - `py-12` to `py-24` for sections
   - `container mx-auto max-w-7xl` for content
   - `px-4 sm:px-6 lg:px-8` for responsive padding

---

## 🔧 REQUIRED FIXES

### Priority 1 (Critical - Must Fix):
1. ✅ Replace profile photo with correct headshot
2. 🔲 Fix any broken layouts
3. 🔲 Ensure all components render correctly
4. 🔲 Fix Calendly widget if broken
5. 🔲 Fix typography if fonts not loading

### Priority 2 (High - Should Fix):
1. 🔲 Fix animations if not working
2. 🔲 Correct any color mismatches
3. 🔲 Fix spacing inconsistencies
4. 🔲 Mobile responsive issues

### Priority 3 (Medium - Nice to Have):
1. 🔲 Optimize hover effects
2. 🔲 Smooth scroll animations
3. 🔲 Polish visual details

---

## 📋 TESTING CHECKLIST

After fixes, verify:

**Desktop (1920x1080):**
- [ ] Hero section displays correctly
- [ ] Profile photo shows correct person
- [ ] All 8 homepage sections render
- [ ] Testimonials cards styled properly
- [ ] Guarantee section looks professional
- [ ] Case studies page loads correctly
- [ ] Calendly widget appears inline
- [ ] All CTAs are clickable
- [ ] Animations trigger on scroll
- [ ] Colors match design (blue/green scheme)

**Tablet (768px):**
- [ ] Responsive grid layouts work
- [ ] Navigation menu accessible
- [ ] Images scale properly
- [ ] Text readable at tablet size

**Mobile (375px):**
- [ ] Profile photo hidden
- [ ] Single column layouts
- [ ] Text sizing appropriate
- [ ] Buttons touchable
- [ ] Calendly widget min-width 320px

**Cross-Browser:**
- [ ] Chrome/Edge (Chromium)
- [ ] Safari (WebKit)
- [ ] Firefox (Gecko)

**Performance:**
- [ ] Lighthouse score 90+
- [ ] LCP < 2.5s
- [ ] No console errors
- [ ] No broken images
- [ ] Fonts load properly

---

## 🎯 SUCCESS CRITERIA

Site is ready when:
1. ✅ Correct profile photo deployed
2. ✅ All components render perfectly
3. ✅ Visual design matches plan/WhiteHorse quality
4. ✅ Mobile responsive works flawlessly
5. ✅ No console errors
6. ✅ Calendly widget functional
7. ✅ All 5 CTA touchpoints work
8. ✅ Animations smooth
9. ✅ Typography correct (Inter font)
10. ✅ Colors accurate (blue/green scheme)

---

## 📝 NOTES

User said: "it needs significant QA work"

This means there are likely MULTIPLE issues beyond just the wrong photo. Need to:
1. Fix profile photo FIRST
2. Do visual comparison live site vs WhiteHorse
3. Test every component systematically
4. Document every issue found
5. Fix all issues in batch
6. Rebuild + redeploy
7. Verify fixes on live site

**DO NOT proceed to GoDaddy DNS until site is PERFECT.**
