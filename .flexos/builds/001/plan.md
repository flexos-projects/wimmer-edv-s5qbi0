Here is the file-by-file build plan for the Astro 5 website.

---
type: config
subtype: build-plan
title: Build 001 Plan
buildName: 001
status: planned
---

This document provides a sequential, file-by-file build plan for the Wimmer EDV website. Files are ordered based on dependencies to ensure a smooth, progressive build. Each entry details the file's purpose, its dependencies, and the key context documents required for its creation.

## Phase 1: Project Skeleton

This phase establishes the foundational configuration, dependencies, and global styles for the entire project.

-   **Path**: `package.json`
    -   **Purpose**: Defines project metadata and manages all Node.js dependencies.
    -   **Depends on**: None.
    -   **Key context**:
        -   `builds/001/config.md`: Specifies Astro 5, `@tailwindcss/astro`, `@astrojs/sitemap`, `@astrojs/check`, `astro-icon`, `sharp`.
        -   **Action**: List dependencies with exact versions for reproducibility (e.g., `astro@^5.0.0`, `tailwindcss@^4.0.0-alpha`). Include scripts for `dev`, `build`, `preview`, `check`.

-   **Path**: `astro.config.mjs`
    -   **Purpose**: Configures the Astro framework, including integrations, site URL, and output settings.
    -   **Depends on**: `package.json`
    -   **Key context**:
        -   `builds/001/config.md`: Stack definition (Tailwind, Sitemap).
        -   `docs/core/007-technical.md`: Performance and SEO goals.
        -   **Action**: Import and configure `@astrojs/tailwind`, `@astrojs/sitemap`, and `astro-icon`. Set the `site` property to the final production URL. Set `output: 'static'`.

-   **Path**: `tailwind.config.mjs`
    -   **Purpose**: Configures Tailwind CSS, translating the design system tokens into a usable theme.
    -   **Depends on**: `package.json`
    -   **Key context**:
        -   `design/design-system.md`: The definitive source for all color palettes (primary, accent, secondary, surface), typography (Inter font family, font sizes), and spacing scales.
        -   **Action**: Define all custom colors under `theme.extend.colors`. Map font families and the full type scale under `theme.extend.fontSize`. Set `content` to scan `src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}`.

-   **Path**: `tsconfig.json`
    -   **Purpose**: Configures TypeScript for the project, enabling strict type checking.
    -   **Depends on**: `package.json`
    -   **Key context**:
        -   `builds/001/config.md`: Build constraint for strict type safety.
        -   **Action**: Use the `astro/tsconfigs/strict` preset. Set up path aliases like `@/*` for `src/*`.

-   **Path**: `src/env.d.ts`
    -   **Purpose**: Provides TypeScript definitions for Astro's environment, including image imports.
    -   **Depends on**: `package.json`
    -   **Key context**: Astro project setup documentation.
    -   **Action**: Include `/// <reference types="astro/client" />`.

-   **Path**: `src/styles/global.css`
    -   **Purpose**: Defines global styles, imports fonts, and sets base Tailwind directives.
    -   **Depends on**: `tailwind.config.mjs`
    -   **Key context**:
        -   `design/design-system.md`: Specifies the "Inter" font and the dark text color (`surface-800`) vs. pure black.
        -   **Action**: Import the "Inter" font from Google Fonts. Include `@tailwind base;`, `@tailwind components;`, and `@tailwind utilities;`. Define base styles for `<body>` (e.g., font, color, background) using Tailwind's `@apply` with theme values.

-   **Path**: `public/favicon.svg`
    -   **Purpose**: Provides the website's favicon.
    -   **Depends on**: None.
    -   **Key context**: `assets/manifest.md` (for logo reference if available).
    -   **Action**: Create a simple SVG favicon, possibly using the company initials "WE" or a simplified logo motif.

-   **Path**: `public/fonts/`
    -   **Purpose**: (Optional, but recommended) To self-host fonts for performance and privacy.
    -   **Depends on**: None.
    -   **Key context**: `design/design-system.md` (Inter font).
    -   **Action**: Download Inter variable font files (`.woff2`) and update `src/styles/global.css` `@font-face` rules to use local files instead of Google Fonts CDN.

---

## Phase 2: Content Collections & Shared Components

This phase creates the reusable building blocks (layouts and components) and defines the content structures that will power the pages.

-   **Path**: `src/content/config.ts`
    -   **Purpose**: Defines the schemas for all Astro Content Collections.
    -   **Depends on**: `astro.config.mjs`
    -   **Key context**:
        -   `docs/core/004-database.md`: Defines the full content model, including `Service`, `Testimonial`, `Certification`, `Post`, etc.
        -   **Action**: Use `zod` to define schemas for each collection exactly as specified in the content model.

-   **Path**: `src/content/` (various files)
    -   **Purpose**: To create initial markdown content files with placeholder data.
    -   **Depends on**: `src/content/config.ts`
    -   **Key context**:
        -   `docs/core/004-database.md`: Lists the collections.
        -   **Action**: Create folders like `src/content/services/`, `src/content/testimonials/`. Add at least one `.md` file to each with frontmatter matching the defined schema. This provides data for component and page development.

-   **Path**: `src/components/SEO.astro`
    -   **Purpose**: A reusable component to manage all SEO-related meta tags.
    -   **Depends on**: None.
    -   **Key context**:
        -   `docs/core/007-technical.md`: Specifies requirements for `title`, `meta description`, Open Graph, and JSON-LD structured data.
        -   `prototype/sitemap.md`: Provides examples of page titles and descriptions.
        -   **Action**: Create a component that accepts props like `title`, `description`, `ogImage`, `canonicalURL`. It should render `<title>`, `<meta>`, and `<link rel="canonical">` tags. Include a `<script is:inline type="application/ld+json">` for structured data.

-   **Path**: `src/layouts/BaseLayout.astro`
    -   **Purpose**: The main HTML shell for all pages, including `<head>`, `<body>`, header, footer, and slots for content.
    -   **Depends on**: `src/components/SEO.astro`, `src/styles/global.css`
    -   **Key context**:
        -   `docs/core/007-technical.md`: Specifies preloading fonts and analytics integration.
        -   `design/design-system.md`: Defines the overall page structure feel (e.g., off-white background).
        -   **Action**: Create the basic HTML structure. Import and use the `SEO` component in the `<head>`. Import `global.css`. Include `<ViewTransitions />` from `astro:transitions` for page animations. Define a default `<slot />` for page content.

-   **Path**: `src/components/Header.astro`
    -   **Purpose**: Creates the site-wide sticky header with responsive navigation.
    -   **Depends on**: `src/layouts/BaseLayout.astro`
    -   **Key context**:
        -   `specs/spec-16.md`: Defines the sticky behavior and click-to-call functionality.
        -   `design/patterns.md`: Specifies Header pattern with scroll behavior (transparent to solid).
        -   **Action**: Build the header with logo, navigation links, and CTA button. Implement mobile "hamburger" menu with an Astro island for the toggle functionality. Use JavaScript to add a class on scroll for the background transition.

-   **Path**: `src/components/Footer.astro`
    -   **Purpose**: Creates the site-wide footer with navigation, contact info, and trust logos.
    -   **Depends on**: `src/layouts/BaseLayout.astro`
    -   **Key context**:
        -   `design/patterns.md`: Specifies the multi-column footer layout.
        -   `docs/core/002-features.md`: Requires certification logos in the footer.
        -   **Action**: Build the multi-column layout. Fetch and display partner logos from the `Certification` content collection. Include links to legal pages.

-   **Path**: `src/components/Section.astro`
    -   **Purpose**: A reusable wrapper for page sections to standardize padding and max-width.
    -   **Depends on**: `tailwind.config.mjs`
    -   **Key context**:
        -   `design/patterns.md`: Defines the "Section Wrapper" pattern with its padding tokens (`py-24`, `py-32`) and max-width (`max-w-7xl`).
        -   **Action**: Create a component that accepts props for background color variants and padding size. It should contain a `div` with `container mx-auto` classes.

-   **Path**: `src/components/Card.astro`
    -   **Purpose**: A versatile card component for displaying content like services, blog posts, or testimonials.
    -   **Depends on**: `tailwind.config.mjs`
    -   **Key context**:
        -   `design/patterns.md`: Details the core styles (background, shadow, radius, padding) and variations (Image Top, Image Left, Icon Top).
        -   **Action**: Create a flexible card component using named slots (`<slot name="image"/>`, `<slot name="content"/>`, `<slot name="actions"/>`) to support different variations. Add hover transition effects.

-   **Path**: `src/components/Hero.astro`
    -   **Purpose**: A component for page hero sections with multiple visual styles.
    -   **Depends on**: `src/components/Section.astro`
    -   **Key context**:
        -   `design/patterns.md`: Defines the three hero variants (Impact, Split, Minimal).
        -   **Action**: Create a component that accepts props to switch between variants. Use conditional rendering and classes to apply the correct styling for each variant.

-   **Path**: `src/components/CTA.astro`
    -   **Purpose**: A reusable call-to-action banner to drive conversions.
    -   **Depends on**: `src/components/Section.astro`
    -   **Key context**:
        -   `design/patterns.md`: Defines the "CTA Banner" pattern with high-contrast background and text.
        -   **Action**: Create a component that accepts headline, text, button text, and button link as props.

---

## Phase 3: Page Construction

This phase involves building the actual pages of the site, starting with the highest priority (P1) pages.

-   **Path**: `src/pages/index.astro`
    -   **Purpose**: The main homepage of the website.
    -   **Depends on**: All P1 components (`BaseLayout`, `Header`, `Footer`, `Hero`, `Section`, `Card`, `CTA`).
    -   **Key context**:
        -   `specs/spec-0.md`: The complete specification for the homepage layout, sections, and content.
        -   `design/patterns.md`: References for all content blocks used.
        -   **Action**: Assemble the page using the created components. Fetch and pass data from content collections (e.g., featured testimonials, services) to the components.

-   **Path**: `src/pages/it-leistungen/index.astro`
    -   **Purpose**: The main overview page for all IT services.
    -   **Depends on**: `BaseLayout`, `Header`, `Footer`, `Hero`, `Section`, `Card`, `CTA`.
    -   **Key context**:
        -   `specs/spec-1.md`: Defines the page structure and content.
        -   **Action**: Fetch all entries from the `services` content collection and render them in a grid of `Card` components.

-   **Path**: `src/pages/it-leistungen/[slug].astro`
    -   **Purpose**: A dynamic route to generate a detail page for each individual service.
    -   **Depends on**: `BaseLayout`, `Header`, `Footer`, `Hero`, `Section`, `CTA`.
    -   **Key context**:
        -   `specs/spec-2.md`: Provides the template for service detail pages.
        -   **Action**: Use `getStaticPaths` to generate a page for each entry in the `services` content collection. Render the markdown `content` using `<Content />`.

-   **Path**: `src/pages/warum-wir.astro`
    -   **Purpose**: The "Why Us?" page, detailing the company's value proposition.
    -   **Depends on**: `BaseLayout`, `Header`, `Footer`, `Hero`, `Section`.
    -   **Key context**: `specs/spec-3.md`: The full spec for this core sales page.

-   **Path**: `src/pages/kontakt.astro`
    -   **Purpose**: The contact page with form, map, and contact details.
    -   **Depends on**: `BaseLayout`, `Header`, `Footer`, `Section`.
    -   **Key context**: `specs/spec-6.md`: Defines the required components and layout.

-   **Path**: `src/pages/impressum.astro` & `src/pages/datenschutz.astro`
    -   **Purpose**: Legally required pages for imprint and data privacy.
    -   **Depends on**: `BaseLayout`, `Header`, `Footer`, `Section`.
    -   **Key context**: `specs/spec-9.md`, `specs/spec-10.md`.
    -   **Action**: Create simple pages that display static legal text within the `BaseLayout`.

-   **Path**: `src/pages/ueber-uns.astro`
    -   **Purpose**: The "About Us" page featuring the founder's story.
    -   **Depends on**: `BaseLayout`, `Header`, `Footer`, `Hero`, `Section`.
    -   **Key context**: `specs/spec-4.md`.

-   **Path**: `src/pages/aktuelles/index.astro` & `src/pages/aktuelles/[...slug].astro`
    -   **Purpose**: The blog index and detail pages.
    -   **Depends on**: `BaseLayout`, `Header`, `Footer`, `Section`, `Card`.
    -   **Key context**: `specs/spec-7.md`, `specs/spec-8.md`.
    -   **Action**: Create the dynamic routes for the blog using the `posts` collection.

---

## Phase 4: Integrations & Interactivity

This phase adds server-side functionality and client-side JavaScript for interactive elements.

-   **Path**: `src/components/ContactForm.astro`
    -   **Purpose**: An interactive form component with client-side validation.
    -   **Depends on**: None.
    -   **Key context**: `specs/spec-6.md` (form fields), `design/patterns.md` (form styling).
    -   **Action**: Create the form markup. Add a `<script>` tag to handle form submission via `fetch` to the API endpoint and provide client-side validation feedback. Mark as `client:load`.

-   **Path**: `src/pages/api/contact.ts`
    -   **Purpose**: A Vercel serverless function to handle contact form submissions.
    -   **Depends on**: `package.json` (for any mailer dependencies).
    -   **Key context**: `docs/core/007-technical.md`: Specifies form handling via Vercel function.
    -   **Action**: Create an `Astro.API` endpoint (`POST` handler). Validate the incoming form data. Use a library like Resend or Nodemailer to send a formatted email notification. Return a success or error JSON response.

-   **Path**: `src/components/CookieConsent.astro`
    -   **Purpose**: A GDPR-compliant cookie consent banner.
    -   **Depends on**: `BaseLayout.astro`.
    -   **Key context**: `builds/001/config.md`: Requirement for cookie consent.
    -   **Action**: Create a banner component that is fixed to the bottom of the screen. Use an Astro island (`client:visible`) with a simple script to set a `localStorage` flag when the user accepts, which will hide the banner on subsequent page loads.

---

## Phase 5: Finalization & Deployment Prep

This final phase includes SEO optimizations and configuration for deployment.

-   **Path**: `public/robots.txt`
    -   **Purpose**: Instructs web crawlers on which pages to index.
    -   **Depends on**: `astro.config.mjs` (for sitemap URL).
    -   **Key context**: `docs/core/007-technical.md`.
    -   **Action**: Create the file, allow all user-agents to crawl `/`, and provide the URL to the `sitemap-index.xml`.

-   **Path**: `vercel.json` (if needed)
    -   **Purpose**: To configure Vercel-specific settings like redirects or headers.
    -   **Depends on**: None.
    -   **Key context**: Vercel documentation.
    -   **Action**: (If required) Add any necessary redirect rules or security headers. For a standard Astro static site, this may not be necessary initially.