```markdown
---
type: spec
subtype: page
title: Blog Post Detail
route: "/aktuelles/[slug]"
layout: post
---

### Purpose

To display the full content of a single blog post or news article, providing value to the reader and creating opportunities for internal linking to relevant service pages.

### Components

*   **Sticky Header:** (Site-wide)
*   **Post Header:** The top of the content area, which includes:
    *   The main Post Title (H1)
    *   Meta information: Author Name, Publication Date
    *   A prominent Featured Image
*   **Post Body:** The main content of the article, rendered from a rich text editor (HTML/Markdown). This area will contain paragraphs, headings, lists, images, and links.
*   **Internal CTA:** A contextually relevant call-to-action block placed within or at the end of the post, linking to a related service page (e.g., a post about cybersecurity links to `/it-leistungen/it-sicherheit`).
*   **Related Posts Section:** (Optional but recommended) A section at the end of the article suggesting 2-3 other posts to encourage further engagement.
*   **Footer:** (Site-wide)

### Data Requirements

*   **Post Data (from slug):**
    *   `title`: String
    *   `author_name`: String
    *   `publication_date`: Date
    *   `featured_image_url`: URL
    *   `content_body`: String (HTML or Markdown)
*   **Internal CTA Data:**
    *   `cta_text`: String
    *   `cta_link`: URL
*   **Related Posts Data:**
    *   An array of 2-3 post objects, each with `title` and `link`.

### User Interactions

*   **Read Content:** User scrolls to read the article.
*   **Click Internal Links:** User can click on any hyperlinks within the post body.
*   **Click CTA:** User clicks the internal CTA to navigate to a service page.
*   **Click Related Post:** User clicks a related post link to navigate to another article.

### States

*   **Default:** The full article is displayed.
*   **Mobile/Responsive:** The article content should be highly readable on all screen sizes, with appropriate font sizes and line spacing. Images should scale correctly.
```