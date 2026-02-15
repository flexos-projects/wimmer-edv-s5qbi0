```yaml
type: spec
subtype: flow
title: 080 - The "IT Emergency" User Flow
trigger: A user experiences a critical IT problem and immediately searches for help, looking for a fast and reliable solution.
```

### Trigger
The user is experiencing an IT emergency (e.g., system down, critical data loss). They are under stress and time pressure, actively seeking immediate support. Their entry point is typically a Google search for terms like "IT hilfe St. Pölten" or "Computer Notdienst Firma."

### Steps

1.  **Entry (Homepage `_layouts/homepage.html`)**: User lands on the Homepage (`/`) via search results.
    *   **User Action**: Scans for immediate indicators of reliability and contact information.
    *   **System Response**: Displays prominent headline ("Zuverlässige IT-Hilfe in St. Pölten"), a sticky header with a phone number, Microsoft Gold logo, and 5-star rating.
2.  **Decision Point (Mobile)**: User is on a mobile device.
    *   **User Action (Mobile)**: Taps the prominent click-to-call phone number in the sticky header.
    *   **System Response (Mobile)**: Initiates a phone call to the company.
    *   **Conversion complete.**
3.  **Decision Point (Desktop)**: User is on a desktop device.
    *   **User Action (Desktop)**: Scans the Homepage for contact information or clicks the "Kontakt" button in the main navigation.
    *   **System Response (Desktop)**: Navigates to the Contact Page.
4.  **Contact Page (`_layouts/kontakt.html`)**: User views the Contact Page (`/kontakt`).
    *   **User Action (Desktop)**: Locates and calls the prominently displayed phone number at the top of the page.
    *   **System Response (Desktop)**: User initiates a phone call to the company.
    *   **Conversion complete.**

### Decision Points

*   **Device Type (Mobile vs. Desktop)**: Determines the primary conversion action (click-to-call in header vs. navigating to Contact Page).
*   **Trust & Urgency Assessment**: User decides quickly whether the site appears credible and capable of providing immediate help.

### Error Handling

*   **Page Load Failure**: If the Homepage fails to load, the user will likely abandon and try another search result.
*   **Broken Click-to-Call**: If the click-to-call link is malformed or unresponsive, the mobile user will be frustrated and likely leave.
*   **Missing/Incorrect Phone Number**: If the phone number is not prominent, incorrect, or leads to an unmonitored line, the conversion fails.
*   **Navigation Issues**: If the "Kontakt" button or other navigation elements are broken, the desktop user cannot find contact details.

### Success/Failure States

*   **Success State**: The user successfully initiates a phone call to Wimmer EDV.
*   **Failure State**: The user leaves the website without making contact (e.g., due to inability to find information, technical issues, or lack of perceived credibility/urgency).