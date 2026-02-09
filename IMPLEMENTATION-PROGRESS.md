# Implementation Progress - Conversion Optimization

**Status:** IN PROGRESS
**Date:** 2026-02-09

---

## ✅ COMPLETED CHANGES

### Hero Section ✅
**File:** `components/Hero.tsx`
- ✅ Headline hierarchy: 3-line format with "Guaranteed" emphasized
- ✅ Subheadline: Updated to "We build and run your outbound acquisition system end-to-end..."
- ✅ CTA: Changed to "See If You Qualify"
- ✅ Trust badge: Updated to "Trusted by 40+ B2B consultants • Avg. 95% show-up rate"

### Case Studies CTAs ✅
**File:** `app/case-studies/page.tsx`
- ✅ All 6 card CTAs: "Get Similar Results" → "See If You Qualify"
- ✅ Bottom CTA: "Book Your Discovery Call" → "See If You Qualify"

### Build Fixes ✅
**File:** `app/globals.css`
- ✅ CSS import order fixed (Google Fonts before Tailwind)
- ✅ Profile photo replaced with correct headshot

---

## 🔄 REMAINING CRITICAL CHANGES

### Priority 1: Results Promise Section
**File:** `lib/constants.ts` + `components/ResultsPromise.tsx`

**Current cards need rewrite:**

```typescript
// NEW CONTENT NEEDED:
const promises = [
  {
    icon: Target,
    title: "No Prospecting. No Chasing. No Admin.",
    description: "We handle outreach, list building, qualification, and booking — you just show up to calls with ready-to-buy prospects",
  },
  {
    icon: Clock,
    title: "Decision-Makers Only",
    description: "Every call is with someone who has budget, authority, and an active need — not tire-kickers or researchers",
  },
  {
    icon: Shield,
    title: "Pay on Results",
    description: "Only pay for qualified appointments that show up. No show? No charge. Don't hit 8 appointments? You don't pay the minimum.",
  },
];
```

**Visual enhancement needed:**
- Add `border-accent/30 bg-accent/5` to 3rd card (Pay on Results)

---

### Priority 2: Guarantee Section Rewrite
**File:** `components/Guarantee.tsx`

**Current:** Dense paragraph format
**Needed:** Bullet list with icons

**New structure:**
- Use CheckCircle icons before each point
- 5 guarantee points as individual bullets
- Enhanced "We only win when you win" callout
- CTA already correct ("See If You Qualify")

---

### Priority 3: Calendly Pre-Frame Component
**File:** Need to create `components/CalendlyPreFrame.tsx`

**Content:**
```
What Happens on This Call?

We'll quickly assess in under 30 minutes:
• Whether your offer is a fit for our acquisition system
• If we can realistically deliver 8-15 qualified appointments per month
• What your first 30 days would look like

If it's not a fit, I'll tell you straight — no pressure, no pitch.
```

**Integration:** Add to `app/page.tsx` before `<CalendlyEmbed />`

---

### Priority 4: Testimonials Enhancement
**File:** `lib/constants.ts` + `components/Testimonials.tsx`

**Add fields to data:**
- role (e.g., "Founder")
- niche (e.g., "B2B Leadership Coaching")
- location (e.g., "Melbourne, AU")
- clientSince (e.g., "March 2024")
- linkedinUrl (placeholder: "#")
- companyLogoUrl (placeholder: can skip for now)

**Display updates:**
- Add LinkedIn icon link
- Show "Client since [date]"
- Show role, company, niche, location

---

### Priority 5: How It Works Updates
**File:** `lib/constants.ts` (steps array)

**Step 1 rename:**
- Current: "Discovery Call"
- New: "Fit & Qualification Call"
- Description: "We assess your offer, ideal client profile, and buying signals to ensure we can realistically deliver 8-15 qualified appointments per month"

**Timeline badge:**
- Make more prominent (larger, with icon, two-line format)

---

### Priority 6: Who This Is For Softening
**File:** `lib/constants.ts` (idealFor array)

**Change:**
- Current: "Revenue: $500k-$10M annually"
- New: "Typically working with consultants at ~$500k+/year"

- Current: "High-ticket services ($5k+ deals)"
- New: "Best suited for $5k+ services (where one client covers acquisition costs)"

---

### Priority 7: Calendly Widget Styling
**File:** `components/CalendlyEmbed.tsx`

**Wrap widget in:**
- White rounded-2xl container
- shadow-2xl + border-2 border-gray-100
- Max-width constrain
- Section with bg-surface background

---

### Priority 8: Global Typography
**File:** `app/globals.css`

**Add:**
```css
body {
  font-size: 16px;
  line-height: 1.6;
}
```

**Testimonial text bump:**
- Increase font-size to 17px
- line-height: 1.65

---

## 🎯 ESTIMATED REMAINING WORK

**Time:** 2-3 hours
**Complexity:** Medium (mostly copy changes + one new component)

**Breakdown:**
- Results Promise rewrite: 15 min
- Guarantee section rewrite: 30 min
- CalendlyPreFrame component: 20 min
- Testimonials enhancement: 40 min
- How It Works updates: 15 min
- Who This Is For: 5 min
- Calendly styling: 10 min
- Global typography: 5 min
- Testing + fixes: 30 min

---

## 📋 NEXT STEPS OPTIONS

### Option A: I Complete All Changes
- Continue implementing all remaining fixes
- Test thoroughly
- Deploy for your review
- Estimated: 2-3 hours

### Option B: Pause for Your Review
- You review what's done so far
- Approve direction
- I continue with remaining changes
- Estimated: Your review + 2-3 hours work

### Option C: Prioritize Subset
- Focus only on top 3-4 most impactful changes
- Deploy faster
- Iterate based on feedback
- Estimated: 1 hour

---

## 🚀 RECOMMENDATION

**I recommend Option A: Complete all changes in one go**

**Reasoning:**
- These are all interconnected improvements
- Partial implementation may look inconsistent
- Better to deploy once with all fixes
- Easier to test as complete package
- You review final product, not work-in-progress

**Your call:** Which option would you prefer?

---

## 📝 WHAT I NEED FROM YOU

Please tell me:

1. **Option preference:** A, B, or C?

2. **Any specific concerns** about the changes so far?

3. **Any adjustments** to the planned changes before I continue?

Once you confirm, I'll proceed with the remaining implementation!
