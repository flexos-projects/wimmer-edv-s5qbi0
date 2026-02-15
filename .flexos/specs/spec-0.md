```markdown
---
type: spec
subtype: page
title: Home Page
route: "/"
layout: default
---

### Purpose

To build maximum trust in the company in the shortest amount of time and effectively direct users to the most relevant next step in their journey, whether it's learning about a specific service or making direct contact.

### Components

*   **Sticky Header:** (Site-wide) Contains the logo, primary navigation (`Services`, `Why Wimmer EDV?`, `About`, `Contact`), and a prominent, click-to-call phone number. Remains visible on scroll.
*   **Hero Section:** The initial view, featuring a compelling headline ("IT, auf das Sie sich verlassen können."), a sub-headline with the core value proposition, a primary CTA button ("Kostenlose Beratung anfordern"), and visually integrated trust logos (Microsoft Gold Partner, Veeam).
*   **Social Proof Bar:** A static or horizontally scrolling section immediately below the hero, showcasing logos of key clients and snippets of 5-star reviews to build instant credibility.
*   **Services Overview:** A section with four distinct, icon-driven cards representing the main service pillars (IT Security, Cloud Solutions, IT Service & Support, Hardware & Software). Each card links to its respective detail page.
*   **"Why Us?" Snapshot:** A condensed version of the `/warum-wir` page, highlighting the three key differentiators (Personal, Certified, Proven) in a visually engaging format.
*   **Meet the Founder:** A brief, humanizing section with a professional photo of Thomas Wimmer, a short introduction, and a clear link to the full `/ueber-uns` page.
*   **Final CTA:** A clear, full-width call-to-action section encouraging users to get in touch.
*   **Footer:** (Site-wide) Contains contact information, links to legal pages (Imprint, Privacy), and partner/certification logos (Microsoft, Veeam, Sophos).

### Data Requirements

*   **Hero:**
    *   `headline`: String
    *   `value_proposition`: String
    *   `cta_text`: String
    *   `cta_link`: URL
    *   `trust_logos`: Array of image URLs (Microsoft, Veeam)
*   **Social Proof:**
    *   `client_logos`: Array of image URLs
    *   `review_snippets`: Array of strings
*   **Services Overview:**
    *   `services`: Array of objects, each with:
        *   `icon`: Image URL or SVG
        *   `title`: String
        *   `description`: String
        *   `link`: URL
*   **"Why Us?" Snapshot:**
    *   `differentiators`: Array of objects, each with:
        *   `icon`: Image URL or SVG
        *   `title`: String
        *   `description`: String
*   **Meet the Founder:**
    *   `founder_photo`: Image URL
    *   `founder_name`: String
    *   `founder_intro`: String
    *   `about_us_link`: URL
*   **Final CTA:**
    *   `cta_headline`: String
    *   `cta_button_text`: String
    *   `cta_link`: URL

### User Interactions

*   **Click CTA:** The primary Hero CTA and Final CTA buttons navigate the user to the Contact page or open a consultation request form/modal.
*   **Click Service Card:** Clicking on any of the four service cards navigates the user to the corresponding service detail page.
*   **Click "About Us" Link:** Navigates the user to the `/ueber-uns` page.
*   **Click-to-Call:** Tapping the phone number in the sticky header on a mobile device initiates a phone call.
*   **Scroll:** The sticky header remains fixed at the top of the viewport.

### States

*   **Default:** The standard appearance of the page on load.
*   **Hover:** All interactive elements (buttons, links, service cards) must have a clear visual hover state (e.g., color change, shadow, underline).
*   **Mobile/Responsive:** The layout must adapt seamlessly to tablet and mobile viewports, ensuring all content is legible and interactive elements are easily tappable.
```