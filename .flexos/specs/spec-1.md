```markdown
---
type: spec
subtype: page
title: Services Overview
route: "/it-leistungen"
layout: default
---

### Purpose

To provide a clear, high-level overview of all service categories offered, helping users quickly identify and navigate to the specific solution that meets their business needs.

### Components

*   **Sticky Header:** (Site-wide)
*   **Intro Section:** A page header with a title and a brief introductory text explaining the company's philosophy of providing comprehensive, proactive IT support.
*   **Service Pillar Grid:** A grid of large, visually distinct, clickable cards. Each card represents one of the four main service pillars (IT Security, Cloud Solutions, etc.) and contains an icon, title, and a short, benefit-focused description.
*   **"Not sure what you need?" CTA:** A dedicated section designed to capture leads from users who are unsure which service is right for them. It prompts them to contact the company for a free consultation.
*   **Footer:** (Site-wide)

### Data Requirements

*   **Intro:**
    *   `page_title`: String (e.g., "Unsere IT-Leistungen für Ihren Erfolg")
    *   `intro_text`: String
*   **Service Pillar Grid:**
    *   `services`: An array of objects, each representing a service detail page. Each object contains:
        *   `title`: String
        *   `description`: String (benefit-focused)
        *   `image_or_icon`: Image URL or SVG
        *   `link`: URL (to the service detail page)
*   **CTA Section:**
    *   `cta_headline`: String (e.g., "Nicht sicher, was Sie benötigen?")
    *   `cta_text`: String
    *   `cta_button_text`: String
    *   `cta_link`: URL (e.g., `/kontakt`)

### User Interactions

*   **Click Service Card:** Clicking anywhere on a service card navigates the user to the corresponding service detail page.
*   **Click CTA Button:** Clicking the button in the "Not sure" section navigates the user to the contact page.

### States

*   **Default:** Standard page view.
*   **Hover:** Service cards and the CTA button must have a clear visual hover state to indicate clickability.
*   **Mobile/Responsive:** The grid of service cards must stack vertically or adapt to a 2x2 layout on smaller screens to ensure readability and usability.
```