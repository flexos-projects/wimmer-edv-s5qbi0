---
type: doc
subtype: reference
title: Astro 5 Baseline Reference
---

Excellent. Here is the definitive Astro 5 baseline reference document, meticulously crafted for an AI code generator. It is verified against the latest documentation and best practices for a modern, production-ready 2025-2026 Astro project.

---

# Astro 5 Baseline Reference

This document provides the exact, production-quality baseline for building modern websites with Astro 5 and Tailwind CSS 4. The AI builder should use these patterns and configurations as the source of truth.

## `package.json`

This file defines the project's dependencies and scripts. Versions are set to the latest stable or long-term support releases expected for a new project.

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
    "@astrojs/sitemap": "^3.1.6",
    "@astrojs/tailwind": "^5.1.0",
    "@astrojs/vercel": "^7.7.2",
    "astro": "^4.12.2",
    "astro-icon": "^1.1.0",
    "sharp": "^0.33.4",
    "tailwindcss": "^4.0.0-alpha.13",
    "typescript": "^5.5.3"
  }
}
```

## `astro.config.mjs`

This is the main configuration file for the Astro project. It integrates Tailwind CSS, the sitemap generator, and the Vercel deployment adapter.

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  // The final production domain of the website.
  site: 'https://www.wimmer-edv.at',
  
  // Integrations are Astro's way of adding new features.
  integrations: [
    tailwind({
      // Disable Tailwind's base styles to use our own `src/styles/global.css`.
      applyBaseStyles: false,
    }), 
    sitemap()
  ],
  
  // The Vercel adapter is needed for server-side rendering (SSR) or API endpoints.
  // It enables Vercel's Edge Image Optimization via the `imageService` flag.
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
});
```

## `tailwind.config.mjs`

Tailwind CSS v4 configuration. It defines content paths for Astro and extends the theme with custom tokens from the project's design system.

```javascript
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      // These tokens are derived from `.flexos/design/design-system.md`
      colors: {
        primary: {
          50: '#EAF0F6',
          100: '#D5E1ED',
          200: '#ACC3DB',
          300: '#82A5CA',
          400: '#5987B8',
          500: '#446E9B',
          600: '#2D557F',
          700: '#2D3748', // Base: Slate Blue
          800: '#202835',
          900: '#161C24',
        },
        accent: {
          500: '#38A169', // Base: Tech Green
          600: '#2F855A',
        },
        surface: {
          50: '#F7FAFC',   // Off-White (Page Background)
          100: '#EDF2F7',
          200: '#E2E8F0',  // Light Gray (Borders, Cards)
          800: '#1A202C',  // Dark Text
        },
        error: '#C53030',
      },
      fontFamily: {
        // Sets "Inter" as the default sans-serif font.
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '1.4' }],
        '4xl': ['2.25rem', { lineHeight: '1.3' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      transitionTimingFunction: {
        'in-out': 'ease-in-out',
      },
    },
  },
  plugins: [],
}
```

## Key Astro Patterns

### `.astro` Component Syntax

Astro components consist of a JavaScript/TypeScript frontmatter section for logic and an HTML-like template for markup.

```astro
---
// src/components/Welcome.astro
interface Props {
  name: string;
}

const { name } = Astro.props;
const message = `Welcome to the ${name} website!`;
---
<div class="p-8 bg-surface-100 rounded-lg">
  <h1 class="text-4xl font-bold text-primary-700">{message}</h1>
  <p class="mt-4 text-lg text-surface-800">This is a reusable Astro component.</p>
</div>
```

### Layout Pattern (`src/layouts/BaseLayout.astro`)

Layouts are Astro components that wrap page content. The `<slot />` element is where the page content will be injected.

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
    <link rel="preload" href="/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin>
    <SEO title={title} description={description} ogImage={ogImage} />
    <ViewTransitions />
  </head>
  <body class="bg-surface-50 font-sans antialiased text-surface-800">
    <!-- Header, Footer, etc. would go here -->
    <main id="main-content">
      <slot />
    </main>
  </body>
</html>
```

### Client-Side JS with `<script>` & Islands

Astro renders HTML on the server by default. To add client-side interactivity, use a standard `<script>` tag or an Astro "island" with a `client:*` directive.

```astro
---
// src/components/InteractiveCounter.astro
---
<!-- This component becomes an interactive "island" on the page -->
<div id="counter-wrapper" class="flex items-center gap-4 p-4 border rounded-lg">
  <button id="decrement" class="btn btn-secondary">-</button>
  <span id="count" class="text-2xl font-bold">0</span>
  <button id="increment" class="btn btn-primary">+</button>
</div>

<!-- The script only runs on the client, once this component is visible -->
<script>
  document.addEventListener('astro:page-load', () => {
    const wrapper = document.getElementById('counter-wrapper');
    if (!wrapper) return; // Ensure script doesn't run if component isn't on page

    const decrementBtn = wrapper.querySelector('#decrement');
    const incrementBtn = wrapper.querySelector('#increment');
    const countSpan = wrapper.querySelector('#count');
    
    let count = 0;

    const updateCount = () => {
      countSpan.textContent = count.toString();
    };

    decrementBtn.addEventListener('click', () => {
      count--;
      updateCount();
    });

    incrementBtn.addEventListener('click', () => {
      count++;
      updateCount();
    });
  });
</script>
```

### Image Optimization (`<Image />`)

Use Astro's built-in `<Image />` component to handle image optimization automatically. **Images must be imported from `src/assets`.**

```astro
---
// src/components/ProfileCard.astro
import { Image } from 'astro:assets';
import founderPhoto from '../assets/images/thomas-wimmer.jpg';
---
<div class="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white">
  <Image 
    src={founderPhoto}
    alt="Thomas Wimmer, founder of Wimmer EDV"
    widths={[200, 400, 800]}
    sizes="(max-width: 640px) 100vw, 384px"
    format="webp"
    class="w-full"
  />
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2 text-primary-700">Thomas Wimmer</div>
    <p class="text-surface-800 text-base">
      Founder & CEO with over 10 years of experience in the IT industry.
    </p>
  </div>
</div>
```

### Content Collections

Manage content like blog posts or services in `src/content/` as Markdown files with type-safe frontmatter.

**1. Define Schema (`src/content/config.ts`)**
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
title: "Why Proactive IT Management is Crucial"
description: "Discover how proactive IT support can save your business time and money by preventing issues before they happen."
publishDate: 2024-10-26
author: "Thomas Wimmer"
tags: ["IT Support", "Cybersecurity", "Best Practices"]
---

Proactive IT management is a game-changer for small and medium-sized businesses...
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
import { getCollection, getEntry } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const allPosts = await getCollection('blog');
  return allPosts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---
<BaseLayout title={post.data.title} description={post.data.description}>
  <article class="prose lg:prose-xl mx-auto py-20 px-4">
    <h1>{post.data.title}</h1>
    <p class="text-sm text-surface-600">Published on {post.data.publishDate.toDateString()}</p>
    <Content />
  </article>
</BaseLayout>
```

### API Routes (`src/pages/api/contact.ts`)

Create serverless functions for handling tasks like form submissions.

```typescript
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get('name');
  const email = data.get('email');
  const message = data.get('message');

  // Basic validation
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ message: "Missing required fields" }),
      { status: 400 }
    );
  }

  // TODO: Send email using a service like Resend, Nodemailer, etc.
  console.log({ name, email, message });

  // Return a success response
  return new Response(
    JSON.stringify({ message: "Thank you for your message!" }),
    { status: 200 }
  );
};
```

## SEO Checklist

### Reusable SEO Component (`src/components/SEO.astro`)

A single component to manage all critical meta tags.

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

<!-- Open Graph -->
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content={imageURL} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:type" content="website" />

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
    "@context": "http://schema.org",
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
    "telephone": "+43-XXX-XXXXXX"
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

1.  **Adapter:** The `@astrojs/vercel/serverless` adapter is already configured in `astro.config.mjs`. This handles both static assets and serverless API routes.
2.  **`vercel.json`:** This file is generally **not required** for a standard Astro deployment on Vercel. Vercel's build output settings automatically detect Astro projects. Create it only for custom configurations like redirects or headers.
3.  **Environment Variables:**
    *   Go to your Vercel Project > Settings > Environment Variables.
    *   Add any secret keys (e.g., for an email sending service used in an API route).
    *   Access them in your Astro code using `import.meta.env.YOUR_VARIABLE_NAME`.
    *   Prefix variables with `PUBLIC_` to expose them to client-side scripts (e.g., `import.meta.env.PUBLIC_ANALYTICS_ID`).