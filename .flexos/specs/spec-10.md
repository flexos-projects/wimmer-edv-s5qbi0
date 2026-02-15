```markdown
---
type: spec
subtype: page
title: Privacy Policy
route: "/datenschutz"
layout: legal
---

### Purpose

To inform users about how their data is collected, used, and protected on the website, in compliance with data protection regulations like GDPR.

### Components

*   **Sticky Header:** (Site-wide)
*   **Content Block:** A simple, text-focused content area with a main heading ("Datenschutzerklärung") and the body text containing the full privacy policy. This content may be structured with subheadings.
*   **Footer:** (Site-wide)

### Data Requirements

*   **Content:**
    *   `page_title`: String ("Datenschutzerklärung")
    *   `privacy_policy_text`: String (Static HTML or Markdown content provided by the client/legal counsel)

### User Interactions

*   **Read Content:** This is a static, read-only page. Users may use in-page navigation if a table of contents is provided for a long policy.

### States

*   **Default:** The page displays the privacy policy text.
*   **Mobile/Responsive:** The text must be legible and well-formatted on all devices.
```