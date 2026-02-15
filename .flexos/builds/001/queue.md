```markdown
---
type: config
subtype: build-queue
title: Build Queue
buildName: 001
totalTasks: 31
---

### Phase 1: Project Skeleton

-   **Task 01: `package.json`**
    -   **Phase:** 1
    -   **Dependencies:** None
    -   **Spec File Reference:** `builds/001/config.md`
    -   **Status:** pending
    -   **Estimated Complexity:** simple

-   **Task 02: `astro.config.mjs`**
    -   **Phase:** 1
    -   **Dependencies:** 01
    -   **Spec File Reference:** `builds/001/config.md`
    -   **Status:** pending
    -   **Estimated Complexity:** simple

-   **Task 03: `tailwind.config.mjs`**
    -   **Phase:** 1
    -   **Dependencies:** 01
    -   **Spec File Reference:** `design/design-system.md`
    -   **Status:** pending
    -   **Estimated Complexity:** medium

-   **Task 04: `tsconfig.json`**
    -   **Phase:** 1
    -   **Dependencies:** 01
    -   **Spec File Reference:** `builds/001/config.md`
    -   **Status:** pending
    -   **Estimated Complexity:** simple

-   **Task 05: `src/env.d.ts`**
    -   **Phase:** 1
    -   **Dependencies:** 01
    -   **Spec File Reference:** Astro Docs
    -   **Status:** pending
    -   **Estimated Complexity:** simple

-   **Task 06: `src/styles/global.css`**
    -   **Phase:** 1
    -   **Dependencies:** 03
    -   **Spec File Reference:** `design/design-system.md`
    -   **Status:** pending
    -   **Estimated Complexity:** simple

-   **Task 07: `public/favicon.svg`**
    -   **Phase:** 1
    -   **Dependencies:** None
    -   **Spec File Reference:** `assets/manifest.md`
    -   **Status:** pending
    -   **Estimated Complexity:** simple

-   **Task 08: `public/fonts/`**
    -   **Phase:** 1
    -   **Dependencies:** None
    -   **Spec File Reference:** `design/design-system.md`
    -   **Status:** pending
    -   **Estimated Complexity:** simple

### Phase 2: Content Collections & Shared Components

-   **Task 09: `src/content/config.ts`**
    -   **Phase:** 2
    -   **Dependencies:** 02
    -   **Spec File Reference:** `docs/core/004-database.md`
    -   **Status:** pending
    -   **Estimated Complexity:** medium

-   **Task 10: `src/content/` (Placeholder Files)**
    -   **Phase:** 2
    -   **Dependencies:** 09
    -   **Spec File Reference:** `docs/core/004-database.md`
    -   **Status:** pending
    -   **Estimated Complexity:** simple

-   **Task 11: `src/components/SEO.astro`**
    -   **Phase:** 2
    -   **Dependencies:** None
    -   **Spec File Reference:** `docs/core/007-technical.md`
    -   **Status:** pending
    -   **Estimated Complexity:** medium

-   **Task 12: `src/layouts/BaseLayout.astro`**
    -   **Phase:** 2
    -   **Dependencies:** 06, 11
    -   **Spec File Reference:** `docs/core/007-technical.md`
    -   **Status:** pending
    -   **Estimated Complexity:** medium

-   **Task 13: `src/components/Header.astro`**
    -   **Phase:** 2
    -   **Dependencies:** 12
    -   **Spec File Reference:** `specs/spec-16.md`
    -   **Status:** pending
    -   **Estimated Complexity:** complex

-   **Task 14: `src/components/Footer.astro`**
    -   **Phase:** 2
    -   **Dependencies:** 10, 12
    -   **Spec File Reference:** `design/patterns.md`
    -   **Status:** pending
    -   **Estimated Complexity:** medium

-   **Task 15: `src/components/Section.astro`**
    -   **Phase:** 2
    -   **Dependencies:** 03
    -   **Spec File Reference:** `design/patterns.md`
    -   **Status:** pending
    -   **Estimated Complexity:** simple

-   **Task 16: `src/components/Card.astro`**
    -   **Phase:** 2
    -   **Dependencies:** 03
    -   **Spec File Reference:** `design/patterns.md`
    -   **Status:** pending
    -   **Estimated Complexity:** medium

-   **Task 17: `src/components/Hero.astro`**
    -   **Phase:** 2
    -   **Dependencies:** 15
    -   **Spec File Reference:** `design/patterns.md`
    -   **Status:** pending
    -   **Estimated Complexity:** medium

-   **Task 18: `src/components/CTA.astro`**
    -   **Phase:** 2
    -   **Dependencies:** 15
    -   **Spec File Reference:** `design/patterns.md`
    -   **Status:** pending
    -   **Estimated Complexity:** simple

### Phase 3: Page Construction

-   **Task 19: `src/pages/index.astro`**
    -   **Phase:** 3
    -   **Dependencies:** 12, 13, 14, 15, 16, 17, 18
    -   **Spec File Reference:** `specs/spec-0.md`
    -   **Status:** pending
    -   **Estimated Complexity:** medium

-   **Task 20: `src/pages/it-leistungen/index.astro`**
    -   **Phase:** 3
    -   **Dependencies:** 12, 13, 14, 16
    -   **Spec File Reference:** `specs/spec-1.md`
    -   **Status:** pending
    -   **Estimated Complexity:** medium

-   **Task 21: `src/pages/it-leistungen/[slug].astro`**
    -   **Phase:** 3
    -   **Dependencies:** 12, 13, 14
    -   **Spec File Reference:** `specs/spec-2.md`
    -   **Status:** pending
    -   **Estimated Complexity:** complex

-   **Task 22: `src/pages/warum-wir.astro`**
    -   **Phase:** 3
    -   **Dependencies:** 12, 13, 14
    -   **Spec File Reference:** `specs/spec-3.md`
    -   **Status:** pending
    -   **Estimated Complexity:** medium

-   **Task 23: `src/pages/kontakt.astro`**
    -   **Phase:** 3
    -   **Dependencies:** 12, 13, 14
    -   **Spec File Reference:** `specs/spec-6.md`
    -   **Status:** pending
    -   **Estimated Complexity:** medium

-   **Task 24: `src/pages/impressum.astro` & `src/pages/datenschutz.astro`**
    -   **Phase:** 3
    -   **Dependencies:** 12, 13, 14
    -   **Spec File Reference:** `specs/spec-9.md`, `specs/spec-10.md`
    -   **Status:** pending
    -   **Estimated Complexity:** simple

-   **Task 25: `src/pages/ueber-uns.astro`**
    -   **Phase:** 3
    -   **Dependencies:** 12, 13, 14
    -   **Spec File Reference:** `specs/spec-4.md`
    -   **Status:** pending
    -   **Estimated Complexity:** medium

-   **Task 26: `src/pages/aktuelles/[...slug].astro`**
    -   **Phase:** 3
    -   **Dependencies:** 12, 13, 14, 16
    -   **Spec File Reference:** `specs/spec-7.md`, `specs/spec-8.md`
    -   **Status:** pending
    -   **Estimated Complexity:** complex

### Phase 4: Integrations & Interactivity

-   **Task 27: `src/components/ContactForm.astro`**
    -   **Phase:** 4
    -   **Dependencies:** None
    -   **Spec File Reference:** `specs/spec-6.md`
    -   **Status:** pending
    -   **Estimated Complexity:** complex

-   **Task 28: `src/pages/api/contact.ts`**
    -   **Phase:** 4
    -   **Dependencies:** 01, 27
    -   **Spec File Reference:** `docs/core/007-technical.md`
    -   **Status:** pending
    -   **Estimated Complexity:** complex

-   **Task 29: `src/components/CookieConsent.astro`**
    -   **Phase:** 4
    -   **Dependencies:** 12
    -   **Spec File Reference:** `builds/001/config.md`
    -   **Status:** pending
    -   **Estimated Complexity:** medium

### Phase 5: Finalization & Deployment Prep

-   **Task 30: `public/robots.txt`**
    -   **Phase:** 5
    -   **Dependencies:** 02
    -   **Spec File Reference:** `docs/core/007-technical.md`
    -   **Status:** pending
    -   **Estimated Complexity:** simple

-   **Task 31: `vercel.json`**
    -   **Phase:** 5
    -   **Dependencies:** None
    -   **Spec File Reference:** Vercel Docs
    -   **Status:** pending
    -   **Estimated Complexity:** simple
```