---
type: doc
subtype: reference
title: Astro 5 Baseline Reference
---

---

# Astro 5 + Tailwind CSS 4 Baseline Reference

This document provides the exact, production-quality baseline for building modern websites with Astro 5 and Tailwind CSS 4. The AI builder must use these patterns and configurations as the source of truth.

## `package.json`

This file defines the project's dependencies and scripts. Versions are set to the latest stable releases expected for a new project in this timeframe.

```json
{
  "name": "wimmer-edv-website",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "check": "astro check"
  },
  "dependencies": {
    "@astrojs/check": "^0.8.2",
    "@astrojs/sitemap": "^3.7.0",
    "@astrojs/vercel": "^7.7.2",
    "@tailwindcss/vite": "^4.0.0-alpha.17",
    "astro": "^5.17.0",
    "astro-icon": "^1.1.0",
    "sharp": "^0.33.5",
    "tailwindcss": "^4.0.0-alpha.17",
    "typescript": "^5.5.3"
  }
}
```

## `astro.config.mjs`

This is the main configuration file for the Astro project. It integrates the Tailwind CSS Vite plugin, the sitemap generator, and the Vercel deployment adapter.

**Note:** For Tailwind CSS 4, we use the `@tailwindcss/vite` plugin directly, not `@astrojs/tailwind`.

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // The final production domain of the website.
  site: 'https://www.wimmer-edv.at',
  
  // Integrations are Astro's way of adding new features.
  integrations: [
    sitemap()
  ],
  
  // The Vercel adapter is needed for server-side rendering (SSR) or API endpoints.
  // It enables Vercel's Image Optimization via the `imageService` flag.
  output: 'server',
  adapter: vercel({
    imageService: true,
  }),

  // Astro's image configuration. `sharp` is used for local processing.
  image: {
    service: {
      entry: 'astro/assets/services/sharp',
    },
  },

  // Vite plugins are used for advanced integrations like Tailwind CSS 4.
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
```

## `src/styles/global.css`

This is the central stylesheet. For Tailwind CSS 4, it's also the **configuration file**. The `@theme` block replaces `tailwind.config.mjs`.

```css
/*
  Import Tailwind's base, components, and utilities.
  This single line is the core of Tailwind CSS 4.
*/
@import 'tailwindcss';

/*
  The @theme block is where all custom design tokens are defined.
  This replaces the `theme` object from the old tailwind.config.js file.
  These values are derived from `.flexos/design/design-system.md`.
*/
@theme {
  --color-primary-50: #EAF0F6;
  --color-primary-100: #D5E1ED;
  --color-primary-200: #ACC3DB;
  --color-primary-300: #82A5CA;
  --color-primary-400: #5987B8;
  --color-primary-500: #446E9B;
  --color-primary-600: #2D557F;
  --color-primary-700: #2D3748; /* Base: Slate Blue */
  --color-primary-800: #202835;
  --color-primary-900: #161C24;

  --color-accent-500: #38A169; /* Base: Tech Green */
  --color-accent-600: #2F855A;

  --color-surface-50: #F7FAFC;   /* Off-White (Page Background) */
  --color-surface-100: #EDF2F7;
  --color-surface-200: #E2E8F0;  /* Light Gray (Borders, Cards) */
  --color-surface-800: #1A202C;  /* Dark Text */

  --color-error: #C53030;

  --font-sans: 'Inter', sans-serif;
  
  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-base: 1rem;    /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2.25rem;  /* 36px */
  --font-size-5xl: 3rem;     /* 48px */
  --font-size-6xl: 3.75rem;  /* 60px */

  --line-height-xs: 1rem;
  --line-height-sm: 1.25rem;
  --line-height-base: 1.6;
  --line-height-lg: 1.75rem;
  --line-height-xl: 1.75rem;
  --line-height-2xl: 2rem;
  --line-height-3xl: 1.4;
  --line-height-4xl: 1.3;
  --line-height-5xl: 1.2;
  --line-height-6xl: 1.1;
  
  --transition-timing-function-in-out: ease-in-out;
}

/* Base styles applied globally using Tailwind's `@apply` */
body {
  @apply bg-surface-50 font-sans text-surface-800 antialiased;
}
```

## Key Astro Patterns

### Layout Pattern (`src/layouts/BaseLayout.astro`)

Layouts wrap page content. The `<slot />` element is where page content is injected. This example includes font preloading, `ViewTransitions`, and the reusable SEO component.

```astro
---
import { ViewTransitions } from 'astro:transitions';
import SEO from '../components/SEO.astro';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
}

const { title, description, ogImage } = Astro.props;
---
<!doctype html>
<html lang="de" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preload" href="/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <SEO title={title} description={description} ogImage={ogImage} />
    <ViewTransitions />
  </head>
  <body class="min-h-screen flex flex-col">
    <!-- Header, etc. would go here -->
    <main id="main-content" class="flex-grow">
      <slot />
    </main>
    <!-- Footer, etc. would go here -->
  </body>
</html>
```

### `.astro` Component Syntax

Astro components use a familiar HTML-like syntax with a JavaScript/TypeScript "frontmatter" code fence for logic.

```astro
---
// src/components/Welcome.astro
interface Props {
  name: string;
}

const { name } = Astro.props;
const message = `Willkommen auf der ${name} Webseite!`;
---
<div class="p-8 bg-surface-100 rounded-lg">
  <h1 class="font-bold text-4xl text-primary-700">{message}</h1>
  <p class="mt-4 text-lg text-surface-800">Dies ist eine wiederverwendbare Astro-Komponente.</p>
</div>
```

### Image Optimization (`astro:assets`)

Use the `<Image />` and `<Picture />` components from `astro:assets` for automatic optimization. **Images must be imported from `src/assets`.**

```astro
---
// src/components/ProfileCard.astro
import { Image } from 'astro:assets';
import founderPhoto from '../assets/images/thomas-wimmer.jpg';
---
<div class="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white">
  <Image 
    src={founderPhoto}
    alt="Thomas Wimmer, Gründer von Wimmer EDV"
    widths={[200, 400, 800]}
    sizes="(max-width: 640px) 100vw, 384px"
    format="webp"
    class="w-full"
  />
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2 text-primary-700">Thomas Wimmer</div>
    <p class="text-surface-800 text-base">
      Gründer & Geschäftsführer mit über 10 Jahren Erfahrung in der IT-Branche.
    </p>
  </div>
</div>
```

### Content Collections (Astro 5)

Manage content in `src/content/` as Markdown or data files with type-safe frontmatter defined in the project root.

**1. Define Schema (`src/content.config.ts`)**
```typescript
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // 'content' for Markdown, 'data' for JSON/YAML
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  'blog': blogCollection,
};
```

**2. Create Content (`src/content/blog/first-post.md`)**
```markdown
---
title: "Warum Proaktives IT-Management Entscheidend ist"
description: "Entdecken Sie, wie proaktiver IT-Support Ihrem Unternehmen Zeit und Geld spart, indem er Probleme verhindert, bevor sie auftreten."
publishDate: 2024-10-26
author: "Thomas Wimmer"
tags: ["IT-Support", "Cybersecurity", "Best Practices"]
---

Proaktives IT-Management ist ein Game-Changer für kleine und mittelständische Unternehmen...
```

**3. Query and Render (`src/pages/aktuelles/index.astro`)**
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostCard from '../../components/PostCard.astro';

const allPosts = await getCollection('blog', ({ data }) => {
  return import.meta.env.PROD ? data.publishDate <= new Date() : true;
});

const sortedPosts = allPosts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
---
<BaseLayout title="Aktuelles" description="Neuigkeiten und Tipps von Wimmer EDV.">
  <section class="container mx-auto py-24 px-4">
    <h1 class="text-5xl font-bold text-primary-700">Aktuelles</h1>
    <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {sortedPosts.map(post => <PostCard post={post} />)}
    </div>
  </section>
</BaseLayout>
```

### Dynamic Routes (`src/pages/aktuelles/[...slug].astro`)

Generate pages dynamically from your content collections.

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import type { CollectionEntry } from 'astro:content';

export async function getStaticPaths() {
  const allPosts = await getCollection('blog');
  return allPosts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

interface Props {
  post: CollectionEntry<'blog'>;
}

const { post } = Astro.props;
const { Content } = await post.render();
---
<BaseLayout title={post.data.title} description={post.data.description}>
  <article class="prose lg:prose-xl mx-auto py-20 px-4">
    <h1>{post.data.title}</h1>
    <p class="text-sm text-surface-600">Veröffentlicht am {post.data.publishDate.toLocaleDateString('de-DE')}</p>
    <Content />
  </article>
</BaseLayout>
```

### API Routes (`src/pages/api/contact.ts`)

Create serverless functions for handling tasks like form submissions.

```typescript
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    // Basic validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: "Fehlende Pflichtfelder" }), { status: 400 });
    }

    // TODO: Send email using a service like Resend, Nodemailer, etc.
    console.log({ name, email, message });

    // Return a success response
    return new Response(JSON.stringify({ message: "Vielen Dank für Ihre Nachricht!" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Serverfehler" }), { status: 500 });
  }
};
```

## SEO Checklist

### Reusable SEO Component (`src/components/SEO.astro`)

A single component to manage all critical meta tags and structured data.

```astro
---
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonicalURL?: URL | string;
}

const { title, description, ogImage, canonicalURL = new URL(Astro.url.pathname, Astro.site) } = Astro.props;

const siteTitle = "Wimmer EDV | Ihr Gold-Zertifizierter IT-Partner in St. Pölten";
const fullTitle = `${title} | ${siteTitle}`;
const imageURL = new URL(ogImage || '/default-og-image.png', Astro.site).toString();
---
<title>{fullTitle}</title>
<meta name="description" content={description} />
<meta name="generator" content={Astro.generator} />

<!-- Open Graph -->
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content={imageURL} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:type" content="website" />
<meta property="og:locale" content="de_AT" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={imageURL} />

<!-- Canonical URL -->
<link rel="canonical" href={canonicalURL} />

<!-- JSON-LD Structured Data -->
<script type="application/ld+json" is:inline>
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Wimmer EDV GmbH",
    "url": "https://www.wimmer-edv.at",
    "logo": "https://www.wimmer-edv.at/logo.svg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dr.-Adolf-Schärf-Straße 10",
      "addressLocality": "St. Pölten",
      "postalCode": "3107",
      "addressCountry": "AT"
    },
    "telephone": "+43-XXX-XXXXXX",
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:00-17:00"
  }
</script>
```

### `public/robots.txt`

Instructs web crawlers on which pages to index and provides the sitemap location.

```
# Allow all user agents to crawl the entire site.
User-agent: *
Disallow:

# Provide the location of the sitemap.
Sitemap: https://www.wimmer-edv.at/sitemap-index.xml
```

## Deployment (Vercel)

1.  **Adapter:** The `@astrojs/vercel/serverless` adapter is already configured in `astro.config.mjs`. This handles static assets, server-side rendering, and serverless API routes.
2.  **`vercel.json`:** This file is generally **not required** for a standard Astro deployment on Vercel. Vercel's build output settings automatically detect Astro projects. Create it only for custom configurations like redirects or headers.
3.  **Environment Variables:**
    *   Go to your Vercel Project > Settings > Environment Variables.
    *   Add any secret keys (e.g., for an email sending service used in an API route).
    *   Access them in your Astro code using `import.meta.env.YOUR_VARIABLE_NAME`.
    *   Prefix variables with `PUBLIC_` to expose them to client-side scripts (e.g., `import.meta.env.PUBLIC_ANALYTICS_ID`).