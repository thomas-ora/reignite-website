# ReIgnite Acquisition Website

**Automated Client Acquisition for B2B Consultants**

Professional marketing website built with Next.js 14, React, Tailwind CSS v4, and Framer Motion.

---

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Calendar:** Calendly Embed
- **Deployment:** Vercel
- **TypeScript:** Full type safety

---

## 📄 Pages

- **Homepage (/):** Hero, results promise, how it works, testimonials, guarantee, qualification, Calendly embed
- **Case Studies (/case-studies):** 6 detailed client success stories with before/after metrics

---

## 🎨 Design System

### Colors
- **Primary:** `#2563eb` (Professional Blue)
- **Accent:** `#10b981` (Success Green)
- **Surface:** `#f9fafb` (Light Gray)
- **Border:** `#e5e7eb`

### Typography
- **Font:** Inter (Google Fonts)
- **Headings:** Bold (600-700 weight)
- **Body:** Regular (400 weight)

---

## 🔗 Calendly Integration

The website integrates Calendly for discovery call bookings:

**URL:** `https://calendly.com/thomaswillis/discovery-call`

The Calendly widget is embedded on the homepage in the `CalendlyEmbed` component.

---

## 📁 Project Structure

```
reignite-website/
├── app/
│   ├── page.tsx               # Homepage
│   ├── case-studies/
│   │   └── page.tsx           # Case studies page
│   ├── layout.tsx             # Root layout with metadata
│   └── globals.css            # Global styles
├── components/
│   ├── Hero.tsx               # Hero section
│   ├── ResultsPromise.tsx     # 3-column value props
│   ├── HowItWorks.tsx         # 3-step process
│   ├── Testimonials.tsx       # Client testimonials
│   ├── Guarantee.tsx          # Guarantee section
│   ├── WhoThisIsFor.tsx       # Qualification section
│   ├── CalendlyEmbed.tsx      # Calendly widget
│   └── Footer.tsx             # Footer
├── lib/
│   └── constants.ts           # Data (testimonials, case studies)
├── public/
│   └── images/
│       └── profile-photo.png  # Founder headshot
└── package.json
```

---

## 🚀 Deployment (Vercel)

### 1. Connect GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit - ReIgnite website"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js - no config needed
5. Click "Deploy"

### 3. Configure Custom Domain (reigniteacquisition.com)

**In Vercel:**
1. Go to Project Settings → Domains
2. Add domain: `reigniteacquisition.com`
3. Vercel will provide DNS records

**In GoDaddy:**
1. Go to DNS Management
2. Add A Record: `@` → Vercel IP (provided by Vercel)
3. Add CNAME: `www` → `cname.vercel-dns.com`
4. Wait 5-60 minutes for DNS propagation

**SSL:** Auto-provisioned by Vercel (Let's Encrypt)

---

## 📊 SEO & Performance

- **Meta Tags:** Optimized for social sharing (Open Graph, Twitter Cards)
- **Performance:** Lighthouse score target: 95+
- **Mobile-First:** Fully responsive design
- **Accessibility:** ARIA labels, semantic HTML
- **Images:** Next.js Image optimization

---

## 📝 Content Updates

### Testimonials

Edit `/lib/constants.ts` → `testimonials` array

### Case Studies

Edit `/lib/constants.ts` → `caseStudies` array

### Calendly URL

Edit `/lib/constants.ts` → `CALENDLY_URL`

---

## 🎯 Conversion Optimizations

- **Above-Fold CTA:** Calendly link visible without scrolling
- **Multiple CTAs:** Every section ends with booking link
- **Social Proof:** Early testimonials build trust
- **Guarantee Section:** Reduces risk, increases conversions
- **Qualification:** "Who This Is For" pre-qualifies leads
- **Mobile-First:** Optimized for mobile traffic

---

## 🐛 Troubleshooting

### Dev server won't start

```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Calendly widget not loading

Check that the script is loading in browser DevTools → Network tab.
The widget script URL: `https://assets.calendly.com/assets/external/widget.js`

### Build errors

```bash
npm run build
```

Check terminal output for specific errors.

---

## 📞 Support

For questions or issues, contact Thomas Willis at [thomaswillis@reigniteacquisition.com](mailto:thomaswillis@reigniteacquisition.com)

---

## 📄 License

© 2025 ReIgnite Acquisition. All rights reserved.
