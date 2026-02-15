```markdown
---
type: spec
subtype: page
title: Why Wimmer EDV?
route: "/warum-wir"
layout: default
---

### Purpose

To serve as the core sales page, moving beyond *what* the company does to explain *why* a potential client should choose them over competitors. It explicitly details the unique value proposition and builds a strong case for their superiority.

### Components

*   **Sticky Header:** (Site-wide)
*   **The Wimmer EDV Difference:** The main content area, broken into three distinct, visually-driven sections:
    1.  **Persönlich & Verantwortlich:** Explains the advantage of an owner-led business, emphasizing direct accountability and personal service. Uses a large icon or relevant graphic.
    2.  **Gold-Standard Expertise:** Tells the story behind their certifications (especially Microsoft Gold Partner), translating technical achievements into client benefits like quality and reliability.
    3.  **Bewiesen & Gelobt:** A dedicated showcase for social proof, featuring a collection of their best 5-star reviews and client testimonials.
*   **Comparison/Checklist:** A section framed as helpful advice, "What to look for in an IT partner," where the checklist items subtly align with Wimmer EDV's key strengths.
*   **Footer:** (Site-wide)

### Data Requirements

*   **Difference Sections:**
    *   An array of three objects, each containing:
        *   `title`: String (e.g., "Persönlich & Verantwortlich")
        *   `icon_or_image`: URL/SVG
        *   `content`: String (HTML for formatting)
*   **Bewiesen & Gelobt Section:**
    *   `testimonials`: An array of testimonial objects, each with `quote` text, `author_name`, and `author_company`.
*   **Checklist Section:**
    *   `checklist_items`: An array of strings representing features of a good IT partner.

### User Interactions

*   This page is primarily for content consumption. Standard scrolling and navigation apply.

### States

*   **Default:** Standard page view.
*   **Mobile/Responsive:** The three "Difference" sections should stack vertically and be easily readable on smaller screens. The checklist should remain clear and legible.
```