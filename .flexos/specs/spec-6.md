```markdown
---
type: spec
subtype: page
title: Contact
route: "/kontakt"
layout: default
---

### Purpose

To make it as easy and frictionless as possible for a potential client to get in touch, providing multiple contact methods and removing any barriers to inquiry.

### Components

*   **Sticky Header:** (Site-wide)
*   **Contact Info Block:** A clean, clearly formatted section displaying all essential contact information:
    *   Business Address
    *   Phone Number (clickable: `tel:`)
    *   Email Address (clickable: `mailto:`)
*   **Contact Form:** A simple and straightforward form with a minimal number of required fields to reduce user friction (e.g., Name, Company, Email, Message).
*   **Embedded Google Map:** An interactive Google Map showing the business location, allowing users to get directions easily.
*   **Footer:** (Site-wide)

### Data Requirements

*   **Contact Info:**
    *   `address`: String
    *   `phone_number`: String
    *   `email_address`: String
*   **Google Map:**
    *   `map_coordinates` or `google_maps_embed_url`: String
*   **Form:**
    *   Endpoint URL for form submission.

### User Interactions

*   **Fill Form:** User can type in the form fields.
*   **Submit Form:** User clicks the "Submit" button to send the message.
*   **Click-to-Call/Email:** Clicking the phone number or email address triggers the device's native application.
*   **Interact with Map:** User can pan, zoom, and get directions using the embedded map.

### States

*   **Form - Default:** All fields are empty. The submit button is active.
*   **Form - Validation:** If a required field is missed or an email is invalid, an inline error message appears next to the respective field.
*   **Form - Submitting:** After clicking submit, the button should enter a disabled state and show a loading indicator (e.g., a spinner) to prevent multiple submissions.
*   **Form - Success:** Upon successful submission, the form is replaced with a clear success message (e.g., "Thank you for your message! We will get back to you shortly.").
*   **Form - Error:** If the submission fails, an error message is displayed near the submit button.
*   **Mobile/Responsive:** The form fields and map should be fully usable on mobile devices.
```