```markdown
---
type: config
subtype: build
title: Build 001 Configuration
buildName: 001
status: planning
---

## Stack (Fixed)
- **Framework**: Astro 5 (static site generation, content collections)
- **Styling**: Tailwind CSS 4 (via UnoCSS or `@tailwindcss/astro`)
- **Deployment**: Vercel (static hosting)
- **Images**: Astro Image / Sharp for optimization
- **Icons**: Astro Icon (using Lucide or Heroicons set for consistent iconography)
- **SEO**: `@astrojs/sitemap` + custom meta components for `title`, `description`, Open Graph.

## Integrations Needed

Based on the project context (`docs/core`, `specs`, `imports`), the following integrations are required:

- [x] Contact form handling (Vercel serverless function for submission, email notification)
- [x] Google Maps / OpenStreetMap embed (for Contact page)
- [x] Newsletter signup (for P3 Resource Center, likely a Vercel function to email service)
- [x] Calendar/booking (P3: Online Appointment Booking, e.g., Calendly embed)
- [ ] E-commerce
- [ ] Client portal / login area (no explicit feature for this project)
- [x] Blog with RSS feed (P2: Expertise Hub)
- [ ] Multilingual (i18n routing — not required initially, project is German-only)
- [x] Analytics (Plausible, Umami, or similar privacy-focused service recommended)
- [x] Cookie consent (GDPR required for Austrian company, for analytics/third-party embeds)
- [x] Schema.org structured data (LocalBusiness, Service, Review, BreadcrumbList, Post, CaseStudy)

## Pages to Build

This list aggregates pages from `prototype/sitemap.md` and `docs/core/003-pages.md`, assigning Astro file paths and priorities.

| Page Title              | Astro File Path                                 | Build Priority |
| :---------------------- | :---------------------------------------------- | :------------- |
| Home Page               | `src/pages/index.astro`                         | P1             |
| Services Overview       | `src/pages/it-leistungen/index.astro`           | P1             |
| Why Wimmer EDV?         | `src/pages/warum-wir.astro`                     | P1             |
| Contact                 | `src/pages/kontakt.astro`                       | P1             |
| IT Security             | `src/pages/it-leistungen/it-sicherheit.astro`   | P2             |
| Cloud Solutions         | `src/pages/it-leistungen/cloud-loesungen.astro` | P2             |
| IT Service & Support    | `src/pages/it-leistungen/it-service-support.astro` | P2             |
| Hardware & Software     | `src/pages/it-leistungen/hardware-software.astro` | P2             |
| About Us                | `src/pages/ueber-uns.astro`                     | P2             |
| Client Success          | `src/pages/kundenerfolge/index.astro`           | P2             |
| Imprint                 | `src/pages/impressum.astro`                     | P2             |
| Privacy Policy          | `src/pages/datenschutz.astro`                   | P2             |
| Blog/News               | `src/pages/aktuelles/index.astro`               | P2             |
| Blog Post Detail        | `src/pages/aktuelles/[...slug].astro`           | P2             |
| Resource Center         | `src/pages/ressourcen/index.astro`              | P3 (future)    |
| Resource Detail         | `src/pages/ressourcen/[...slug].astro`          | P3 (future)    |

## Performance Targets

- **Lighthouse**: Achieve 90+ across all categories (Performance, Accessibility, Best Practices, SEO).
- **Core Web Vitals**: Maintain Largest Contentful Paint (LCP) under 2.5s, Cumulative Layout Shift (CLS) under 0.1, and Interaction to Next Paint (INP) under 200ms.
- **Total Page Weight**: Keep initial page loads under 500KB per page (excluding optimized images).
- **No Layout Shift**: Eliminate layout shifts from font loading by using `font-display: swap` and preloading critical fonts.

## Content Requirements

This outlines what content is available and what needs to be produced before pages can be fully built.

- **READY / AVAILABLE**:
    - **Company Identity**: Wimmer EDV GmbH, Thomas Wimmer (founder/owner), St. Pölten location, history (2019 GmbH / 10+ years experience).
    - **Core Service Pillars**: Names and general descriptions for IT Security, Cloud Solutions, IT Service & Support, Hardware & Software.
    - **Public Reputation**: Unanimous 5-star ratings (Google, Facebook) and key themes (competence, speed, reliability).
    - **Industry Certifications**: Microsoft Gold Partner, Veeam ProPartner Gold, Sophos Silver Partner, and other vendor logos.
    - **Named Client Testimonials**: Existing quotes from Scheuringer & Partner, Eder Ziviltechniker, Josef Stockinger.
    - **Design System**: Comprehensive tokens for colors, typography, spacing, shapes, and motion language (from `design/design-system.md`).
    - **Content Model**: Defined schemas for `Service`, `Testimonial`, `Certification`, `Post`, `CaseStudy`, `GlobalSettings`, `TeamMember`.
    - **Legal Texts**: Placeholders for `Impressum` and `Datenschutz` content (client to provide final text).

- **NEEDS WRITING / PRODUCTION**:
    - **Founder's Biography & Photo**: Professional photo and full narrative for Thomas Wimmer (`/ueber-uns` page).
    - **Authentic Photography**: High-quality, original images of office, team, and client environments (replace generic stock).
    - **Benefit-Oriented Service Copy**: Rewrite all service descriptions to focus on solving client problems and delivering tangible benefits, not just features.
    - **Case Studies**: Detailed problem/solution/result narratives for at least one client (P2 feature).
    - **Blog Articles**: Initial set of articles for the "Expertise Hub" (`/aktuelles` pages).
    - **SEO Metadata**: Unique, optimized `title` and `meta description` for all pages.
    - **More Public Reviews**: Implement strategy to proactively solicit more Google/Facebook reviews.

## Build Constraints

- **Static-First Philosophy**: Leverage Astro's static site generation for optimal performance, shipping minimal to zero client-side JavaScript for static content.
- **Type Safety**: All codebase (Astro components, API routes, content collections, configurations) must use TypeScript with strict mode enabled.
- **Utility-First CSS**: Styling must be exclusively implemented using Tailwind CSS 4 utility classes, adhering strictly to the design tokens defined in `design/design-system.md` and `design/patterns.md`. No custom CSS files are allowed for components; global styles are limited to base resets and custom properties derived from tokens.
- **Image Optimization**: All images must be processed and optimized using Astro's built-in `<Image />` component for automatic sizing, modern formats (WebP/AVIF), and lazy loading.
- **Semantic HTML & Accessibility**: Implement semantic HTML5 elements consistently. Adhere to WCAG 2.1 AA guidelines, including proper heading hierarchy, ARIA attributes where necessary, keyboard navigation, and minimum 44px touch targets.
- **No Client-Side Frameworks for Content**: Avoid client-side JavaScript frameworks (React, Vue, Svelte, etc.) for rendering static page content. Islands architecture can be used sparingly for interactive components where essential.
- **Design System Adherence**: All UI elements must directly reflect the tokens and component patterns defined in `design/design-system.md` and `design/patterns.md`.
```