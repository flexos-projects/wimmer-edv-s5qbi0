---
type: doc
subtype: database
title: Schema Registry
---

This document provides a detailed specification for all database tables (collections) and single-entry types (singletons) based on the Wimmer EDV content model. Each table includes a description of its purpose and a breakdown of its fields, data types, and constraints.

### Collection: `Service`

**Purpose:** To define each core IT service offered. This allows for both a main services page and individual, detailed landing pages.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `title` | Text | Required | The name of the service (e.g., "IT Security"). |
| `slug` | Text | Required, Unique | The URL-friendly version (e.g., `it-sicherheit`). |
| `icon` | Text | Optional | Name of an SVG icon to represent the service. |
| `summary` | Text | Required | A short, one-sentence description for use on overview pages. |
| `hero_image` | Image | Optional | A primary image for the service's detail page. |
| `content` | Markdown | Required | The full, benefit-driven description of the service. |
| `related_certifications` | Relation | Optional | Links to one or more entries in the `Certification` collection. |
| `seo_title` | Text | Optional | Custom SEO title for the page. |
| `seo_description` | Text | Optional | Custom meta description for the page. |

### Collection: `Testimonial`

**Purpose:** To manage client reviews and testimonials for use throughout the site.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `quote` | Text | Required | The full text of the testimonial. |
| `author_name` | Text | Required | The name of the person giving the quote. |
| `author_company` | Text | Optional | The company the author works for. |
| `source` | Select | Required | Where the review came from (Options: "Google", "Facebook", "Direct"). |
| `rating` | Number | Optional | The star rating, from 1 to 5. |
| `is_featured` | Boolean | Required | A toggle to mark testimonials for prominent placement. Defaults to `false`. |

### Collection: `Certification`

**Purpose:** To manage partner certifications and logos as reusable assets.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `partner_name` | Text | Required | The name of the partner (e.g., "Microsoft"). |
| `level` | Text | Required | The certification level (e.g., "Gold Partner"). |
| `logo` | Image | Required | The official partner logo. |
| `partner_url` | URL | Optional | A link to the partner's website. |
| `display_order` | Number | Optional | An integer to control the sorting order in which logos are displayed. |

### Collection: `CaseStudy` (Future)

**Purpose:** To structure detailed client success stories.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `client_name` | Text | Required | The name of the client company. |
| `title` | Text | Required | A compelling headline for the story. |
| `slug` | Text | Required, Unique | The URL-friendly version of the title. |
| `summary` | Text | Required | A brief overview for index pages. |
| `problem` | Markdown | Required | A description of the client's challenge. |
| `solution` | Markdown | Required | A description of the solution Wimmer EDV implemented. |
| `result` | Markdown | Required | The tangible, positive outcomes for the client. |
| `testimonial` | Relation | Optional | A link to a single `Testimonial` entry from this client. |
| `related_services` | Relation | Optional | Links to one or more `Service` entries used in the project. |

### Collection: `Post` (Future)

**Purpose:** To manage entries for the blog/news section.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `title` | Text | Required | The blog post title. |
| `slug` | Text | Required, Unique | The URL-friendly version of the title. |
| `publish_date` | Date | Required | The date the post was published. |
| `author` | Relation | Required | A link to a single entry in the `TeamMember` collection. |
| `summary` | Text | Required | A short excerpt for the blog index page. |
| `featured_image` | Image | Optional | The main image for the post. |
| `content` | Markdown | Required | The full body of the article. |
| `tags` | List of Text | Optional | Keywords for categorization (e.g., "Security," "Microsoft 365"). |

### Collection: `TeamMember` (Inferred)

**Purpose:** To manage authors for blog posts. This collection is inferred from the `Post.author` field.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `name` | Text | Required | The full name of the team member (e.g., "Thomas Wimmer"). |
| `role` | Text | Optional | The team member's job title (e.g., "CEO & Founder"). |
| `photo` | Image | Optional | A headshot of the team member. |

### Singleton: `GlobalSettings`

**Purpose:** To store site-wide information that is used in multiple places, like the header and footer.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `company_name` | Text | Optional | The full legal company name (e.g., "Wimmer EDV GmbH"). |
| `phone_number` | Text | Optional | The primary contact phone number. |
| `email_address` | Text | Optional | The primary contact email. |
| `address` | Text | Optional | The full company street address. |
| `google_maps_url` | URL | Optional | A link to the Google Business Profile / Maps location. |
| `facebook_url` | URL | Optional | A link to the company's official Facebook page. |