---
type: doc
subtype: core
title: 007 - Technical Architecture
---

### Technical Specification & Architecture

This document outlines the technical stack, performance targets, and implementation details for the Wimmer EDV website redesign. The chosen stack prioritizes performance, security, SEO, and a modern development workflow.

---

**1. Core Technology Stack**

*   **Framework:** **Astro**
    *   **Rationale:** Astro is a static-first site generator that delivers exceptional performance by default (shipping zero JavaScript for static content). Its component-based architecture is ideal for building maintainable UIs. It's perfect for content-driven sites where speed and SEO are paramount.
*   **Deployment Platform:** **Vercel**
    *   **Rationale:** Vercel offers a seamless Git-based deployment workflow, global CDN for fast load times, automatic HTTPS, and serverless functions for handling backend tasks like form submissions. Its integration with Astro is flawless.
*   **Content Management:** **Markdown Files & Git**
    *   **Rationale:** For a site of this scale, a full-blown CMS is overkill. Content (services, testimonials, posts) will be managed as structured Markdown files within the Git repository. This approach is simple, version-controlled, and extremely fast.

**2. Performance Targets**

The site must be exceptionally fast to provide a great user experience and boost SEO rankings.

*   **Google Core Web Vitals:** All three metrics (LCP, FID, CLS) must score in the "Good" category on both mobile and desktop.
*   **Load Time:** Target a Largest Contentful Paint (LCP) of under 1.5 seconds.
*   **Page Weight:** Keep initial page loads under 500KB.

**3. SEO & Structured Data**

Technical SEO will be a foundational priority.

*   **Structured Data (JSON-LD):** Implement schema markup for:
    *   `LocalBusiness`: On all pages, detailing name, address, phone, opening hours, etc.
    *   `Service`: On each service detail page.
    *   `Review`: For each testimonial displayed.
    *   `BreadcrumbList`: For clear site hierarchy.
*   **Meta Tags:** All pages will have unique, SEO-optimized `title` and `meta description` tags. Open Graph (`og:`) tags will be implemented for rich social sharing.
*   **Sitemap & Robots:** An automatically generated `sitemap.xml` will be submitted to search engines. A `robots.txt` file will be configured to allow crawling of all necessary assets.
*   **Canonicals:** `rel="canonical"` tags will be used on all pages to prevent duplicate content issues.

**4. Form Handling**

*   **Implementation:** Contact forms will be standard HTML forms. Submissions will be handled by a Vercel Serverless Function.
*   **Process:** The function will receive the form data, perform basic validation, send a formatted email notification to Wimmer EDV, and can optionally post data to a CRM or Google Sheet. This avoids reliance on third-party form services and keeps data handling within our control.
*   **Spam Protection:** A honeypot field and/or a service like Turnstile (Cloudflare's privacy-focused CAPTCHA alternative) will be used to prevent spam.

**5. Image Optimization**

*   **Strategy:** We will leverage Astro's built-in `<Image />` component.
*   **Features:**
    *   **Automatic Resizing:** Generate multiple image sizes for different viewports.
    *   **Modern Formats:** Automatically serve next-gen image formats like WebP or AVIF to supported browsers.
    *   **Lazy Loading:** Images below the fold will be lazy-loaded by default.
    *   **Alt Text:** All images will require descriptive `alt` text for accessibility and SEO.

**6. Analytics & Tracking**

*   **Primary Analytics:** A privacy-focused analytics provider like Plausible or Fathom Analytics is recommended to respect user privacy and avoid the bloat of Google Analytics.
*   **Google Search Console:** The site will be verified with Google Search Console to monitor indexing status, performance, and search queries.
*   **Event Tracking:** Simple event tracking can be implemented for key conversions like form submissions and phone number clicks.

**7. Third-Party Integrations**

*   **Google Business Profile:** The website will link to the GMB profile, and the address will be embedded using Google Maps.
*   **Google Reviews:** A simple widget or a custom fetch script can be used to display a feed of the latest Google Reviews, loaded client-side to avoid impacting initial page load performance.
*   **No Multilingual Requirement:** Based on the current data, the site will be single-language (German). The architecture can accommodate future language additions if needed.