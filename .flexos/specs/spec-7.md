```markdown
---
type: spec
subtype: page
title: Blog/News
route: "/aktuelles"
layout: default
---

### Purpose

To serve as the "Expertise Hub" (P2 Feature) for the company. This page lists all published articles, helping to demonstrate ongoing expertise, improve SEO through fresh content, and provide shareable assets for social media.

### Components

*   **Sticky Header:** (Site-wide)
*   **Page Header:** A simple header with the title "Aktuelles" or "Blog".
*   **Blog Post Grid/List:** The main content area, displaying a chronological list of all blog posts. Each item in the list should be a card containing:
    *   Featured Image
    *   Post Title
    *   Publication Date
    *   A short excerpt or summary
*   **Pagination:** Navigation controls (e.g., "Older Posts", "Newer Posts" or page numbers) at the bottom of the list to navigate through multiple pages of articles.
*   **Footer:** (Site-wide)

### Data Requirements

*   **Posts:** A collection (array) of blog post objects, fetched and paginated. Each object should contain:
    *   `title`: String
    *   `slug`: String (for the URL)
    *   `featured_image_url`: URL
    *   `publication_date`: Date
    *   `excerpt`: String
*   **Pagination:**
    *   `current_page`: Integer
    *   `total_pages`: Integer

### User Interactions

*   **Click Post:** Clicking on a post's title, image, or a "Read More" link navigates the user to the full post detail page (`/aktuelles/[slug]`).
*   **Navigate Pagination:** Clicking on pagination links loads the corresponding page of posts.

### States

*   **Default:** The first page of blog posts is displayed.
*   **Empty:** If no blog posts have been published, a message like "No articles found." should be displayed.
*   **Loading:** (Optional, for dynamic loading) A loading indicator is shown while posts are being fetched.
*   **Mobile/Responsive:** The grid of posts should reflow into a single-column list on mobile devices.
```