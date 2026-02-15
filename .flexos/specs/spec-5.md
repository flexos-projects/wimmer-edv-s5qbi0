```markdown
---
type: spec
subtype: page
title: Client Success
route: "/kundenerfolge"
layout: default
---

### Purpose

To serve as a central hub for all social proof, providing compelling evidence of the company's ability to deliver results. This page aggregates testimonials and case studies to build deep trust with prospective clients.

### Components

*   **Sticky Header:** (Site-wide)
*   **Intro Section:** A brief introduction to the page, setting the stage by emphasizing the importance of client partnerships and successful outcomes.
*   **Testimonial Grid/List:** A collection of short-form testimonials (quotes) from satisfied clients, presented in a visually appealing grid or list format. Each should include the client's name and company.
*   **Case Study Section (P2):** A section dedicated to long-form success stories. Initially, this will feature the first detailed case study (Problem, Solution, Result). It should be designed to easily accommodate more case studies in the future.
*   **Automated Google Review Feed (P2):** A widget that connects to the Google My Business API to automatically pull in and display the latest 5-star Google Reviews. This keeps the social proof fresh with minimal manual effort.
*   **CTA Section:** A final call to action encouraging visitors to become the next success story.
*   **Footer:** (Site-wide)

### Data Requirements

*   **Testimonials:**
    *   `testimonials`: An array of objects, each with `quote`, `author_name`, `author_company`, and optional `author_photo` or `company_logo`.
*   **Case Studies:**
    *   `case_studies`: An array of objects, each with `title`, `client_name`, `problem_summary`, `solution_summary`, `result_summary`, and `link_to_full_story` (if applicable).
*   **Google Review Feed:**
    *   Requires API credentials for Google My Business.
    *   The component will fetch and display data (reviewer name, star rating, review text).
*   **CTA:**
    *   `cta_headline`: String
    *   `cta_button_text`: String
    *   `cta_link`: URL

### User Interactions

*   **Read Content:** Users will scroll to read testimonials and case study summaries.
*   **Interact with Feed:** Users may be able to scroll within the Google Review widget if it displays multiple reviews.

### States

*   **Default:** Page loaded with all static testimonials and case studies. The Google Review feed is also populated.
*   **Loading:** The Google Review Feed component should show a loading indicator (e.g., a spinner) while fetching data from the API.
*   **Error:** If the Google Review Feed API call fails, the component should display a fallback message or hide gracefully instead of showing an error.
*   **Mobile/Responsive:** Testimonials and case studies should be formatted for easy reading on mobile devices.
```