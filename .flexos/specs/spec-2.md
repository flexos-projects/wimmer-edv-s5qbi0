```markdown
---
type: spec
subtype: page
title: Service Detail Page Template
route: "/it-leistungen/[slug]"
layout: default
---

### Purpose

To function as a highly-focused, SEO-optimized landing page that addresses a specific user need (e.g., IT security), educates the visitor on the solution, builds trust, and converts them with a service-specific call to action.

### Components

*   **Sticky Header:** (Site-wide)
*   **Hero Section:** A full-width hero with a headline specific to the service (e.g., "Schützen Sie, was Ihr Unternehmen ausmacht").
*   **Problem/Solution Section:** A section that first describes common business pains related to the service, then presents the company's offering as the direct solution to those pains.
*   **"What's Included" Section:** A clear, easy-to-scan list (e.g., bullet points with icons) detailing the specific features, technologies, or sub-services included (e.g., Sophos Firewall, Managed Antivirus, Veeam Backups).
*   **Relevant Certifications:** A section that prominently displays logos of relevant technology partners (e.g., Sophos, Veeam) to reinforce expertise in this specific area.
*   **Client Testimonial:** A blockquote or styled section featuring a relevant quote from a client who has used this particular service, praising its effectiveness or the company's expertise.
*   **Service-Specific CTA:** A final, strong call to action tailored to the service (e.g., "Jetzt Sicherheits-Check anfordern").
*   **Footer:** (Site-wide)

### Data Requirements

*   **Page Data (per slug):**
    *   `slug`: String (from URL)
    *   `seo_title`: String
    *   `meta_description`: String
    *   `hero_headline`: String
    *   `problem_solution_content`: Array of objects, each with `problem` and `solution` text.
    *   `included_features`: Array of strings or objects (with icons).
    *   `relevant_certifications`: Array of image URLs for logos.
    *   `testimonial`: Object with `quote` text and `author_details`.
    *   `cta_text`: String

### User Interactions

*   **Click CTA:** Clicking the service-specific CTA button should lead to the contact page, potentially with a pre-filled subject, or open a dedicated form/modal.

### States

*   **Default:** Standard page view.
*   **Hover:** The CTA button must have a clear hover state.
*   **Mobile/Responsive:** All sections must be fully responsive, ensuring text is readable and elements are well-spaced on all devices.
```