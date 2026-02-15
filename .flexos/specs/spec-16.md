```markdown
---
type: spec
subtype: feature
title: 055 - Sticky Header with Click-to-Call
priority: P1
---

### Description

This feature ensures that the website's primary navigation and key contact information are always accessible to the user, regardless of how far they have scrolled down a page. The site-wide header will "stick" to the top of the viewport. It will contain the logo, main navigation links, and a highly visible phone number that is tappable on mobile devices to initiate a call.

### User Stories

*   **As a user reading a long service page,** I want to be able to navigate to another section of the site or call the company without having to scroll all the way back to the top.
*   **As a mobile user who needs immediate help,** I want to tap the phone number in the header to call the company directly from my device.
*   **As a visitor,** I want consistent and predictable navigation available on every page of the site.

### Acceptance Criteria

- [ ] The header element remains fixed at the top of the viewport when the user scrolls down.
- [ ] The header contains the company logo, main navigation links (e.g., Home, About, Services, Client Success, Contact), and the primary phone number.
- [ ] On screen sizes designated as "mobile," the phone number is a clickable `tel:` link.
- [ ] The header layout adapts for smaller screens, typically collapsing the navigation links into a "hamburger" menu icon.
- [ ] The sticky header does not cover or obscure anchor links or other important page content when active.
- [ ] The transition to a sticky state (if any) is smooth and not jarring.

### Technical Notes

*   **CSS Implementation:** Use the CSS `position: sticky;` or `position: fixed;` property to achieve the effect. `position: sticky;` is generally preferred as it is less disruptive.
*   **Mobile Menu:** The mobile "hamburger" menu requires JavaScript to toggle its visibility.
*   **Z-index:** Ensure the header has a high enough `z-index` to appear above all other page content.
*   **Performance:** Be mindful of any complex animations or effects in the header that could impact scrolling performance.
```