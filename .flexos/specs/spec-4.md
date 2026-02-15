```markdown
---
type: spec
subtype: page
title: About Us
route: "/ueber-uns"
layout: default
---

### Purpose

To humanize the brand by telling the story behind the company, introducing the founder, and outlining the core values. This builds personal trust and connects the company's expertise to an accountable individual.

### Components

*   **Sticky Header:** (Site-wide)
*   **Founder's Story:** A prominent section featuring a professional, high-quality photograph of the founder, Thomas Wimmer. This is accompanied by a narrative (first or third person) detailing his experience, his vision for the company, and his commitment to clients.
*   **Our Mission/Values:** A short, punchy section that clearly lists and briefly explains the company's core values, such as reliability, partnership, and clarity. This can be presented with icons for visual appeal.
*   **Team Section (Future-proof):** A designated area designed to be easily expandable. Initially, it might just feature the founder, but it should have a structure (e.g., a grid of profiles) ready for when new team members are added.
*   **Footer:** (Site-wide)

### Data Requirements

*   **Founder's Story:**
    *   `founder_photo`: Image URL
    *   `founder_headline`: String (e.g., "Meet Thomas Wimmer")
    *   `founder_narrative`: String (HTML for formatting)
*   **Mission/Values:**
    *   `values`: An array of objects, each with:
        *   `icon`: URL/SVG
        *   `value_name`: String
        *   `value_description`: String
*   **Team Section:**
    *   `team_members`: An array of objects, each with:
        *   `photo`: Image URL
        *   `name`: String
        *   `title`: String
        *   `bio_short`: String (optional)

### User Interactions

*   This is a content-focused page. Standard scrolling and navigation apply.

### States

*   **Default:** Standard page view.
*   **Mobile/Responsive:** Layout should adapt for smaller screens, with images and text blocks stacking cleanly.
```