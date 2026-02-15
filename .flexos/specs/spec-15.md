```markdown
---
type: spec
subtype: feature
title: 054 - High-Conversion Contact Page
priority: P1
---

### Description

The Contact Page is a critical conversion point. This feature focuses on creating a clean, user-friendly page that makes it as easy as possible for a potential client to get in touch. It will include all essential contact information (address, phone, email), an embedded Google Map for location context, and a simple, straightforward contact form with the minimum number of fields required to reduce friction.

### User Stories

*   **As a potential client ready to make contact,** I want to find all methods of communication (phone, email, form, address) in one obvious place so I can choose the most convenient one for me.
*   **As a visitor on my mobile phone,** I want to be able to tap the phone number to call and the address to open it in my maps app.
*   **As a user who dislikes long forms,** I want to submit an inquiry quickly without having to provide unnecessary personal information.

### Acceptance Criteria

- [ ] A dedicated page is created at the URL `/contact`.
- [ ] The page is linked in the site's main header navigation.
- [ ] The full business address, primary phone number, and general email address are clearly displayed.
- [ ] The phone number is wrapped in a `tel:` link for click-to-call functionality.
- [ ] The email address is wrapped in a `mailto:` link.
- [ ] An interactive Google Map showing the business location is successfully embedded and functional.
- [ ] A contact form is present with fields for: Name, Company, Email, and Message.
- [ ] The form includes necessary data privacy consent (e.g., a checkbox).
- [ ] Upon successful form submission, the user sees a clear confirmation message on the page.
- [ ] A notification email containing the form submission data is successfully sent to a designated company address.

### Technical Notes

*   **Spam Protection:** The form must be protected against spam submissions using a method like a honeypot field or a service like Google reCAPTCHA.
*   **Form Validation:** Implement both client-side (for immediate feedback) and server-side (for security) validation for all form fields.
*   **API Keys:** An API key will be required for the Google Maps Embed API. This should be stored securely.
```