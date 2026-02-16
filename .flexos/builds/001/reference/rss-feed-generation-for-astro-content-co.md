---
type: doc
subtype: reference
title: RSS Feed Generation for Astro Content Collections
---

---
type: doc
subtype: reference
title: RSS Feed Generation for Astro Content Collections
---

This document provides a production-quality, step-by-step guide for creating an RSS 2.0 feed from an Astro Content Collection.

## 1. Installation

The official `@astrojs/rss` package is required. It provides the utility functions to generate a valid RSS feed.

```bash
# Using npm
npm install @astrojs/rss

# Using pnpm
pnpm add @astrojs/rss
```

This will add `@astrojs/rss` (latest version, e.g., `^4.0.7`) to your `package.json`.

## 2. Content Collection Setup

Your RSS feed will be generated from a content collection. Ensure your collection's schema includes the necessary fields.

**File:** `src/content/config.ts`

```typescript
import { defineCollection, z } from 'astro:content';

// Define the schema for your blog posts
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // `pubDate` is crucial for an RSS feed
    pubDate: z.date(),
    author: z.string(),
    // A featured image for the post
    heroImage: z.string().optional(), 
  }),
});

export const collections = {
  'blog': blogCollection,
};
```

## 3. Minimal Working Implementation

Create a server endpoint that will generate the `rss.xml` file. The standard practice is to place this file at `src/pages/rss.xml.ts`.

**File:** `src/pages/rss.xml.ts`

```typescript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export const GET: APIRoute = async (context) => {
  // 1. Fetch all published blog posts
  const posts = await getCollection('blog', ({ data }) => {
    // Filter out draft posts in production
    return import.meta.env.PROD ? data.pubDate <= new Date() : true;
  });

  // 2. Sort posts by publication date (newest first)
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  // 3. Generate the RSS feed
  return rss({
    // (Required) Title of your RSS feed
    title: 'Wimmer EDV | Aktuelles',
    // (Required) Description of your RSS feed
    description: 'Neuigkeiten, Tipps und Einblicke in die IT-Welt von Wimmer EDV.',
    // (Required) The base URL of your website.
    // The `context.site` property is automatically Ppulled from your `astro.config.mjs` `site` config.
    site: context.site!,
    // (Required) An array of RSS feed items from your content.
    items: sortedPosts.map((post) => ({
      // (Required) The item's title
      title: post.data.title,
      // (Required) The item's publication date
      pubDate: post.data.pubDate,
      // (Required) A brief description of the item
      description: post.data.description,
      // (Required) A unique link to the item.
      // The `post.slug` is used to generate the full URL.
      link: `/aktuelles/${post.slug}/`,
      // (Optional) Render the Markdown content to sanitized HTML.
      content: sanitizeHtml(parser.render(post.body)),
      // (Optional) Custom data for extensions, like media enclosures
      customData: post.data.heroImage 
        ? `<enclosure url="${new URL(post.data.heroImage, context.site).href}" length="0" type="image/jpeg"/>` 
        : undefined,
    })),
    // (Optional) Custom stylesheet for browser viewing
    stylesheet: '/rss/styles.xsl',
    // (Optional) Add custom XML namespaces
    xmlns: {
      media: 'http://search.yahoo.com/mrss/',
    },
  });
}
```

## 4. Add Discoverability Link

To help browsers and RSS readers find your feed, add a `<link>` tag to the `<head>` of your main layout file.

**File:** `src/layouts/BaseLayout.astro`

```astro
---
// imports...
---
<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <!-- Other meta tags, title, etc. -->

    <!-- RSS Feed Link -->
    <link 
      rel="alternate" 
      type="application/rss+xml" 
      title="Wimmer EDV | Aktuelles RSS Feed" 
      href={new URL('/rss.xml', Astro.site)} 
    />
  </head>
  <body>
    <slot />
  </body>
</html>
```

## 5. (Optional) XSL Stylesheet for Browsers

You can provide a stylesheet to make the raw XML file more readable in a web browser.

**1. Create the stylesheet:**

**File:** `public/rss/styles.xsl`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>RSS Feed: <xsl:value-of select="/rss/channel/title"/></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
          h1, h2 { color: #2D3748; }
          a { color: #38A169; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .item { border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 1.5rem; }
          .pubDate { font-size: 0.875rem; color: #718096; }
        </style>
      </head>
      <body>
        <h1><xsl:value-of select="/rss/channel/title"/></h1>
        <p><xsl:value-of select="/rss/channel/description"/></p>
        <a href="{/rss/channel/link}"><xsl:value-of select="/rss/channel/link"/></a>
        <hr/>
        <xsl:for-each select="/rss/channel/item">
          <div class="item">
            <h2><a href="{link}" target="_blank"><xsl:value-of select="title"/></a></h2>
            <p class="pubDate"><xsl:value-of select="pubDate"/></p>
            <p><xsl:value-of select="description"/></p>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
```

This stylesheet is already referenced in the `rss.xml.ts` example. No further changes are needed.

## Gotchas and Common Mistakes

1.  **`site` URL is Mandatory:** The `@astrojs/rss` package **requires** a `site` property to be set in your `astro.config.mjs`. Without it, the build will fail because it cannot generate absolute URLs for feed items.

    **File:** `astro.config.mjs`
    ```javascript
    import { defineConfig } from 'astro/config';

    export default defineConfig({
      // THIS IS REQUIRED
      site: 'https://www.wimmer-edv.at',
      // ... other configs
    });
    ```

2.  **Date Format:** The `pubDate` field in your content frontmatter must be a valid date format that can be parsed into a JavaScript `Date` object (e.g., `YYYY-MM-DD` or a full ISO 8601 string). Using `z.date()` in your schema enforces this.

3.  **File Naming is Important:** The endpoint file must end in `.xml.js` or `.xml.ts` (e.g., `rss.xml.ts` or `feed.xml.ts`) for Astro to build it with the correct `Content-Type` header (`application/rss+xml`).

4.  **HTML in Content:** RSS feeds can contain HTML in the `<content:encoded>` tag (enabled via the `content` property). If you render your full Markdown body, always sanitize the output to prevent invalid XML or potential security issues. The example above uses `sanitize-html` for this purpose. Install it with `pnpm add sanitize-html @types/sanitize-html`.