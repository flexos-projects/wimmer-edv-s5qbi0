```markdown
---
type: spec
subtype: page
title: Imprint
route: "/impressum"
layout: legal
---

### Purpose

To provide all legally required company information and contact details as mandated by law in the operating region (e.g., TMG in Germany, UGB/ECG in Austria).

### Components

*   **Sticky Header:** (Site-wide)
*   **Content Block:** A simple, text-focused content area with a main heading ("Impressum") and the body text containing all required legal information.
*   **Footer:** (Site-wide)

### Data Requirements

*   **Content:**
    *   `page_title`: String ("Impressum")
    *   `legal_text`: String (Static HTML or Markdown content provided by the client/legal counsel)

### User Interactions

*   **Read Content:** This is a static, read-only page.

### States

*   **Default:** The page displays the legal text.
*   **Mobile/Responsive:** The text must be legible and well-formatted on all devices.
```