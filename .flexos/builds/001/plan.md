---
id: builds.001:plan
title: Build 001 Plan
description: Phased implementation plan for build 001
sequence: 1
status: active
type: build
subtype: plan
relatesTo:
  - builds.001:config
tags:
  - build
  - plan
createdAt: "2026-02-16T00:18:43.485Z"
updatedAt: "2026-02-16T00:18:43.485Z"
---

This document provides a sequential, file-by-file build plan for the Wimmer EDV website. Files are ordered based on dependencies to ensure a smooth, progressive build. Each entry details the file's purpose, its dependencies, and the key context documents required for its creation.

## Phase 1: Project Skeleton

This phase establishes the foundational configuration, dependencies, and global styles for the entire project.

-   **Path**: `package.json`
    -   **Purpose**: Defines project metadata and manages all Node.js dependencies.
    -   **Depends on**: None.
    -   **Key context**:
        -   `builds/001/reference/00-astro-baseline.md`: Provides exact dependencies and versions (`astro`, `@astrojs/tailwind`, `@astrojs/sitemap`, `@astrojs/vercel`, `astro-icon`, `sharp`, etc.).
        -   `builds/001/config.md`: Specifies the required tech stack.

-   **Path**: `astro.config.mjs`
    -   **Purpose**: Configures the Astro framework, including integrations, site URL, and Vercel deployment settings.
    -   **Depends on**: `package.json`
    -   **Key context**:
        -   `builds/001/reference/00-astro-baseline.md`: The definitive source for configuration, including Vercel serverless adapter for API routes.
        -   `builds/001/config.md`: Specifies required integrations (Tailwind, Sitemap) and deployment target (Vercel).

-   **Path**: `tailwind.config.mjs`
    -   **Purpose**: Configures Tailwind CSS, translating the design system tokens into a usable theme.
    -   **Depends on**: `package.json`
    -   **Key context**:
        -   `design/design-system.md`: The single source of truth for all color palettes (`primary`, `accent`, `surface`), typography (`Inter` font family, font size scale), and spacing tokens.

-   **Path**: `tsconfig.json`
    -   **Purpose**: Configures TypeScript for the project, enabling strict type checking.
    -   **Depends on**: `package.json`
    -   **Key context**:
        -   `builds/001/config.md`: Build constraint for strict type safety. Use the `astro/tsconfigs/strict` preset.

-   **Path**: `src/env.d.ts`
    -   **Purpose**: Provides TypeScript definitions for Astro's environment, including image imports.
    -   **Depends on**: `package.json`
    -   **Key context**:
        -   Astro project setup documentation. Include `/// <reference types="astro/client" />`.

-   **Path**: `src/styles/global.css`
    -   **Purpose**: Defines global styles, imports fonts, and sets base Tailwind directives.
    -   **Depends on**: `tailwind.config.mjs`
    -   **Key context**:
        -   `design/design-system.md`: Specifies the "Inter" font and base body styles (e.g., `bg-surface-50`, `text-surface-800`). Include `@tailwind base;`, `@tailwind components;`, and `@tailwind utilities;`.

-   **Path**: `public/favicon.svg`
    -   **Purpose**: Provides the website's favicon.
    -   **Depends on**: None.
    -   **Key context**:
        -   `design/design-system.md`: Use primary or accent colors to create a simple "WE" initial logo.

-   **Path**: `public/fonts/Inter-Variable.woff2`
    -   **Purpose**: Self-hosted font file for performance and privacy.
    -   **Depends on**: None.
    -   **Key context**:
        -   `design/design-system.md`: Specifies the "Inter" font. The `global.css` file will need to be updated to reference this local font file.

---

## Phase 2: Content Collections & Shared Components

This phase creates the reusable building blocks (layouts and components) and defines the content structures that will power the pages.

-   **Path**: `src/content/config.ts`
    -   **Purpose**: Defines the schemas for all Astro Content Collections using Zod.
    -   **Depends on**: `astro.config.mjs`
    -   **Key context**:
        -   `docs/core/004-database.md`: The definitive source for the full content model, including schemas for `Service`, `Testimonial`, `Certification`, `Post`, and `TeamMember`.

-   **Path**: `src/content/` (various placeholder files)
    -   **Purpose**: To create initial markdown content files with placeholder data, enabling component development.
    -   **Depends on**: `src/content/config.ts`
    -   **Key context**:
        -   `docs/core/004-database.md`: Create one `.md` file for each collection defined (e.g., `src/content/services/it-sicherheit.md`).

-   **Path**: `src/components/SEO.astro`
    -   **Purpose**: A reusable component to manage all SEO-related meta tags and JSON-LD structured data.
    -   **Depends on**: `astro.config.mjs`
    -   **Key context**:
        -   `builds/001/reference/00-astro-baseline.md`: Provides a complete, production-ready example including JSON-LD for `LocalBusiness`.
        -   `docs/core/007-technical.md`: Specifies SEO requirements.

-   **Path**: `src/layouts/BaseLayout.astro`
    -   **Purpose**: The main HTML shell for all pages, including `<head>`, `<body>`, and slots for content. Integrates Header, Footer, SEO, and ViewTransitions.
    -   **Depends on**: `src/styles/global.css`, `src/components/SEO.astro`
    -   **Key context**:
        -   `builds/001/reference/00-astro-baseline.md`: Shows best practices for layout structure, including font preloading and `ViewTransitions`.
        -   `design/design-system.md`: Defines the overall page background (`bg-surface-50`).

-   **Path**: `src/components/Header.astro`
    -   **Purpose**: Creates the site-wide sticky header with responsive navigation and mobile menu.
    -   **Depends on**: `src/layouts/BaseLayout.astro`
    -   **Key context**:
        -   `design/patterns.md`: Specifies the Header pattern with scroll behavior (transparent to solid `bg-primary-700`).
        -   `specs/spec-16.md`: Defines the sticky behavior and click-to-call functionality. Requires a client-side script for the mobile menu toggle and scroll effects.

-   **Path**: `src/components/Footer.astro`
    -   **Purpose**: Creates the site-wide footer with navigation, contact info, and trust logos.
    -   **Depends on**: `src/layouts/BaseLayout.astro`, `src/content/config.ts`
    -   **Key context**:
        -   `design/patterns.md`: Specifies the multi-column footer layout with a `bg-primary-900`.
        -   `docs/core/002-features.md`: Requires certification logos, which should be fetched from the `Certification` content collection.

-   **Path**: `src/components/Section.astro`
    -   **Purpose**: A reusable wrapper for page sections to standardize padding and max-width.
    -   **Depends on**: `tailwind.config.mjs`
    -   **Key context**:
        -   `design/patterns.md`: Defines the "Section Wrapper" pattern with its padding tokens (`py-24`, `py-32`) and `max-w-7xl`.

-   **Path**: `src/components/Card.astro`
    -   **Purpose**: A versatile card component for displaying services, blog posts, or testimonials.
    -   **Depends on**: `tailwind.config.mjs`
    -   **Key context**:
        -   `design/patterns.md`: Details the core styles and variations (Image Top, Image Left, Icon Top). Must include hover transitions.

-   **Path**: `src/components/Hero.astro`
    -   **Purpose**: A component for page hero sections with multiple visual styles, selectable via props.
    -   **Depends on**: `src/components/Section.astro`
    -   **Key context**:
        -   `design/patterns.md`: Defines the three hero variants (Impact, Split, Minimal).

-   **Path**: `src/components/CTA.astro`
    -   **Purpose**: A reusable call-to-action banner to drive conversions.
    -   **Depends on**: `src/components/Section.astro`
    -   **Key context**:
        -   `design/patterns.md`: Defines the "CTA Banner" pattern with a high-contrast `bg-primary-700` background.

---

## Phase 3: Page Construction

This phase involves building the P1 pages by assembling the shared components and populating them with content.

-   **Path**: `src/pages/index.astro`
    -   **Purpose**: The main homepage of the website.
    -   **Depends on**: All Phase 2 components.
    -   **Key context**:
        -   `specs/spec-0.md`: The complete specification for the homepage layout, sections, and content.
        -   `design/patterns.md`: References for all required content blocks.

-   **Path**: `src/pages/it-leistungen/index.astro`
    -   **Purpose**: The main overview page for all IT services.
    -   **Depends on**: `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/Card.astro`.
    -   **Key context**:
        -   `specs/spec-1.md`: Defines the page structure and requires fetching all entries from the `services` content collection.

-   **Path**: `src/pages/it-leistungen/[slug].astro`
    -   **Purpose**: A dynamic route to generate a detail page for each individual service.
    -   **Depends on**: `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`.
    -   **Key context**:
        -   `specs/spec-2.md`: Provides the template for service detail pages. Requires `getStaticPaths` to generate pages from the `services` collection.

-   **Path**: `src/pages/warum-wir.astro`
    -   **Purpose**: The "Why Us?" page, detailing the company's value proposition.
    -   **Depends on**: All Phase 2 components.
    -   **Key context**:
        -   `specs/spec-3.md`: The full specification for this core sales page.

-   **Path**: `src/pages/kontakt.astro`
    -   **Purpose**: The contact page with form, map, and contact details.
    -   **Depends on**: All Phase 2 components.
    -   **Key context**:
        -   `specs/spec-6.md`: Defines the required components, including the contact form and map embed.

-   **Path**: `src/pages/impressum.astro`
    -   **Purpose**: Legally required imprint page.
    -   **Depends on**: `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`.
    -   **Key context**:
        -   `specs/spec-9.md`: Create a simple page that displays static legal text.

-   **Path**: `src/pages/datenschutz.astro`
    -   **Purpose**: Legally required data privacy page.
    -   **Depends on**: `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`.
    -   **Key context**:
        -   `specs/spec-10.md`: Create a simple page that displays static legal text.

---

## Phase 4: Integrations & Interactivity

This phase adds server-side functionality and client-side JavaScript for interactive elements.

-   **Path**: `src/components/ContactForm.astro`
    -   **Purpose**: An interactive form component with client-side validation and fetch submission logic.
    -   **Depends on**: `tailwind.config.mjs`
    -   **Key context**:
        -   `specs/spec-6.md`: Defines the required form fields.
        -   `design/patterns.md`: Defines the styling for form inputs and buttons. Mark this component with a `client:*` directive.

-   **Path**: `src/pages/api/contact.ts`
    -   **Purpose**: A Vercel serverless function (Astro API route) to handle contact form submissions.
    -   **Depends on**: `src/components/ContactForm.astro`
    -   **Key context**:
        -   `docs/core/007-technical.md`: Specifies form handling via Vercel function.
        -   `builds/001/reference/00-astro-baseline.md`: Provides the pattern for creating an API route.

-   **Path**: `src/components/CookieConsent.astro`
    -   **Purpose**: A GDPR-compliant cookie consent banner.
    -   **Depends on**: `src/layouts/BaseLayout.astro`
    -   **Key context**:
        -   `builds/001/config.md`: Explicit requirement for cookie consent. Use an Astro island and `localStorage` to manage user consent.

---

## Phase 5: Finalization & Deployment Prep

This final phase includes SEO optimizations and configuration for deployment.

-   **Path**: `public/robots.txt`
    -   **Purpose**: Instructs web crawlers on which pages to index and provides the sitemap location.
    -   **Depends on**: `astro.config.mjs` (for sitemap URL).
    -   **Key context**:
        -   `builds/001/reference/00-astro-baseline.md`: Provides the exact required content.
        -   `docs/core/007-technical.md`: Outlines SEO goals.

-   **Path**: `vercel.json` (if needed)
    -   **Purpose**: To configure Vercel-specific settings like redirects or security headers.
    -   **Depends on**: None.
    -   **Key context**:
        -   Vercel documentation. This may not be necessary for the initial deployment.