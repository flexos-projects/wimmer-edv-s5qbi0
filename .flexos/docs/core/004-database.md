---
type: doc
subtype: core
title: 004 - Content Model
---

### Website Content Model

This document defines the structured content types required to power the Wimmer EDV website. This model ensures content is consistent, reusable, and optimized for both display and search engines (via structured data).

---

**1. Collection: `Service`**
*   **Purpose:** To define each core IT service offered. This allows for both a main services page and individual, detailed landing pages.
*   **Fields:**
    *   `title` (Text, Required): The name of the service (e.g., "IT Security").
    *   `slug` (Text, Required): The URL-friendly version (e.g., `it-sicherheit`).
    *   `icon` (Text): Name of an SVG icon to represent the service.
    *   `summary` (Text, Required): A short, one-sentence description for use on overview pages.
    *   `hero_image` (Image): A primary image for the service's detail page.
    *   `content` (Markdown, Required): The full, benefit-driven description of the service for its detail page.
    *   `related_certifications` (Relation): A link to entries in the `Certification` collection.
    *   `seo_title` (Text): Custom SEO title for the page.
    *   `seo_description` (Text): Custom meta description.

**2. Collection: `Testimonial`**
*   **Purpose:** To manage client reviews and testimonials for use throughout the site.
*   **Fields:**
    *   `quote` (Text, Required): The full text of the testimonial.
    *   `author_name` (Text, Required): The name of the person giving the quote.
    *   `author_company` (Text): The company the author works for.
    *   `source` (Select, Required): Where the review came from (e.g., "Google," "Facebook," "Direct").
    *   `rating` (Number): The star rating, from 1 to 5.
    *   `is_featured` (Boolean): A toggle to mark testimonials for prominent placement (e.g., homepage).

**3. Collection: `Certification`**
*   **Purpose:** To manage partner certifications and logos as reusable assets.
*   **Fields:**
    *   `partner_name` (Text, Required): The name of the partner (e.g., "Microsoft").
    *   `level` (Text, Required): The certification level (e.g., "Gold Partner").
    *   `logo` (Image, Required): The official partner logo.
    *   `partner_url` (URL): A link to the partner's website.
    *   `display_order` (Number): To control the order in which logos are displayed.

**4. Collection: `CaseStudy` (Future, P2)**
*   **Purpose:** To structure detailed client success stories.
*   **Fields:**
    *   `client_name` (Text, Required): The name of the client company.
    *   `title` (Text, Required): A compelling headline for the story (e.g., "How Eder Ziviltechniker Achieved 99.9% Uptime").
    *   `slug` (Text, Required): The URL-friendly version.
    *   `summary` (Text, Required): A brief overview for index pages.
    *   `problem` (Markdown, Required): A description of the client's challenge.
    *   `solution` (Markdown, Required): A description of the solution Wimmer EDV implemented.
    *   `result` (Markdown, Required): The tangible, positive outcomes for the client.
    *   `testimonial` (Relation): A link to a `Testimonial` entry from this client.
    *   `related_services` (Relation): Links to `Service` entries used in the project.

**5. Collection: `Post` (Future, P2)**
*   **Purpose:** To manage entries for the blog/news section.
*   **Fields:**
    *   `title` (Text, Required): The blog post title.
    *   `slug` (Text, Required): The URL-friendly version.
    *   `publish_date` (Date, Required): The date the post was published.
    *   `author` (Relation): Link to a `TeamMember` (initially just Thomas Wimmer).
    *   `summary` (Text, Required): A short excerpt for the blog index page.
    *   `featured_image` (Image): The main image for the post.
    *   `content` (Markdown, Required): The full body of the article.
    *   `tags` (List of Text): Keywords for categorization (e.g., "Security," "Microsoft 365").

**6. Singleton: `GlobalSettings`**
*   **Purpose:** To store site-wide information that is used in multiple places, like the header and footer.
*   **Fields:**
    *   `company_name` (Text): Wimmer EDV GmbH
    *   `phone_number` (Text): The primary contact phone number.
    *   `email_address` (Text): The primary contact email.
    *   `address` (Text): The full company address.
    *   `google_maps_url` (URL): Link to the Google Business Profile.
    *   `facebook_url` (URL): Link to the company Facebook page.