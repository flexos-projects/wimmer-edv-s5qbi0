```yaml
type: spec
subtype: flow
title: 082 - The "Local Search & Verification" User Flow
trigger: A user has been referred or found the business via Google Maps/Google Business Profile and visits the website to verify legitimacy, professionalism, and gather essential contact information before making a call.
```

### Trigger
The user has heard about Wimmer EDV through word-of-mouth or found them through a local search (e.g., Google Maps). Their primary goal is to verify the company's legitimacy and professionalism and confirm contact details before reaching out.

### Steps

1.  **Entry (Homepage `_layouts/homepage.html`)**: User lands on the Homepage (`/`) via direct navigation, a Google Business Profile link, or a referral.
    *   **User Action**: Gets an immediate first impression of the company's professionalism and overall brand.
    *   **System Response**: Displays a clean design, clear messaging, and initial trust signals.
2.  **Human Connection (About Us Page `_layouts/about-us.html`)**: User seeks to put a "face to the name" and understand the people behind the business. They click on the "About Us" link in the navigation.
    *   **User Action**: Reads about the company's history, values, and key personnel (e.g., Thomas Wimmer's experience).
    *   **System Response**: Presents professional photos and compelling narrative about the team and expertise.
3.  **Confirmation (Contact Page `_layouts/kontakt.html`)**: User feels a sense of trust and professionalism from the "About Us" page. They navigate to the "Contact Page" (`/kontakt`) to confirm location, hours, and the phone number.
    *   **User Action**: Verifies the address, opening hours, and ensures the phone number is clearly displayed.
    *   **System Response**: Displays clear contact information, including phone number, address, and office hours.
4.  **Action (Phone Call)**: User feels confident in the company's legitimacy and professionalism.
    *   **User Action**: Calls the phone number listed on the Contact Page (or potentially from the sticky header if they return to the homepage).
    *   **System Response**: User initiates a phone call to the company.
    *   **Conversion complete.**

### Decision Points

*   **Initial Impression**: User quickly judges the website's design and messaging for professionalism.
*   **Personal Connection**: User decides if the "About Us" content builds sufficient trust and provides a human element.
*   **Verification**: User confirms that all essential contact details (address, hours, phone) are correct and easily accessible.

### Error Handling

*   **Poor Design/Broken Elements**: An unprofessional or non-functional website will immediately deter the user, causing them to leave.
*   **Missing/Generic "About Us" Content**: If the "About Us" page lacks personal touch, experience details, or professional photos, it fails to build trust.
*   **Incorrect Contact Information**: If the address, phone number, or opening hours are wrong or hard to find, the user will lose trust and likely abandon.
*   **Confusing Navigation**: If it's difficult to find the "About Us" or "Contact" pages, the user will become frustrated.

### Success/Failure States

*   **Success State**: The user successfully initiates a phone call to Wimmer EDV, having verified the company's legitimacy and professionalism.
*   **Failure State**: The user leaves the website without making contact (e.g., due to a negative impression, inability to find verification information, or incorrect contact details).
```