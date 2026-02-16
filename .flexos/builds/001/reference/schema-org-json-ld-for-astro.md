---
type: doc
subtype: reference
title: Schema.org JSON-LD for Astro
---

---
type: doc
subtype: reference
title: Schema.org JSON-LD for Astro
---

This document provides a definitive, production-quality guide for implementing Schema.org JSON-LD structured data in an Astro 5 project. It is designed for an AI code generator and is verified against current best practices.

## 1. Overview & Core Concept

JSON-LD (JavaScript Object Notation for Linked Data) is the recommended format by Google for implementing structured data. It allows you to provide explicit information about a page's content, which helps search engines understand it better and can lead to Rich Results (e.g., review stars, business info) in search listings.

In Astro, the implementation is straightforward: we generate a JavaScript object with the schema data and then stringify it into a `<script>` tag in the page's `<head>`.

## 2. Installation & Configuration

**No external packages are required for the core implementation.** Astro's built-in features are sufficient. The process involves creating a reusable Astro component.

## 3. The Reusable Component (`src/components/JsonLd.astro`)

The best practice is to create a single component that takes a schema object as a prop and renders the script tag. This ensures consistency and prevents errors.

```astro
---
// src/components/JsonLd.astro
interface Props {
  schema: object;
}

const { schema } = Astro.props;
---
<script type="application/ld+json" is:inline set:html={JSON.stringify(schema)} />
```

**Key Points:**
*   `type="application/ld+json"`: Tells browsers and crawlers what kind of script this is.
*   `is:inline`: An Astro directive that is **critical**. It ensures the script content is embedded directly into the HTML, which is required for crawlers to see it.
*   `set:html={JSON.stringify(schema)}`: This is the core of the implementation.
    *   `schema`: The JavaScript object containing your structured data.
    *   `JSON.stringify()`: Converts the JavaScript object into a valid JSON string. **Do not forget this step.**
    *   `set:html`: An Astro directive to inject the resulting string as raw HTML inside the script tag.

## 4. Code Examples: Common Schemas

Here are practical examples for common business website schemas. These would typically be used within an `SEO.astro` component or a `BaseLayout.astro`.

### Example 1: `LocalBusiness` (Site-Wide)

This schema is perfect for the main business entity and should appear on most, if not all, pages.

**Usage in a Layout (`src/layouts/BaseLayout.astro`):**

```astro
---
import JsonLd from '../components/JsonLd.astro';

// You can fetch this from a global content collection or define it here
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Wimmer EDV GmbH",
  "image": new URL('/logo.svg', Astro.site).href,
  "@id": Astro.site,
  "url": Astro.site,
  "telephone": "+43-XXX-XXXXXX", // Replace with actual number
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Dr.-Adolf-Schärf-Straße 10",
    "addressLocality": "St. Pölten",
    "postalCode": "3107",
    "addressCountry": "AT"
  },
  "sameAs": [
    "https://www.facebook.com/wimmer-edv", // Replace with actual URLs
    "https://www.linkedin.com/company/wimmer-edv"
  ]
};

// ... other layout props
---
<html lang="de">
  <head>
    <!-- ... other head tags ... -->
    <JsonLd schema={localBusinessSchema} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### Example 2: `Service` (Service Detail Page)

Use this schema on pages that describe a specific service, like `/it-leistungen/it-sicherheit.astro`.

**Usage on a Dynamic Page (`src/pages/it-leistungen/[slug].astro`):**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import JsonLd from '../../components/JsonLd.astro';

export async function getStaticPaths() { /* ... */ }
const { post } = Astro.props;
const { Content } = await post.render();

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": post.data.title,
  "description": post.data.description,
  "provider": {
    "@type": "LocalBusiness",
    "name": "Wimmer EDV GmbH",
    "url": Astro.site,
  },
  "serviceType": "IT Support", // Be specific
  "areaServed": {
    "@type": "Place",
    "name": "St. Pölten"
  }
};
---
<BaseLayout title={post.data.title} description={post.data.description}>
  <head slot="head">
    <JsonLd schema={serviceSchema} />
  </head>
  <article>
    <h1>{post.data.title}</h1>
    <Content />
  </article>
</BaseLayout>
```

### Example 3: `BlogPosting` (Blog Post Page)

Use this on individual blog article pages.

**Usage on a Dynamic Page (`src/pages/aktuelles/[...slug].astro`):**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import JsonLd from '../../components/JsonLd.astro';

export async function getStaticPaths() { /* ... */ }
const { post } = Astro.props;
const { Content } = await post.render();

const blogPostSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.data.title,
  "description": post.data.description,
  "datePublished": post.data.publishDate.toISOString(),
  "image": new URL(post.data.image, Astro.site).href,
  "author": {
    "@type": "Person",
    "name": post.data.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "Wimmer EDV GmbH",
    "logo": {
      "@type": "ImageObject",
      "url": new URL('/logo.svg', Astro.site).href
    }
  }
};
---
<BaseLayout title={post.data.title} description={post.data.description}>
  <head slot="head">
    <JsonLd schema={blogPostSchema} />
  </head>
  <article>
    <!-- ... post content ... -->
  </article>
</BaseLayout>
```

### Example 4: Combining Schemas with `@graph`

To include multiple schemas on one page (e.g., `WebPage` and `LocalBusiness`) without multiple `<script>` tags, use the `@graph` property. This is the modern best practice.

**Usage in an `SEO.astro` component:**

```astro
---
// src/components/SEO.astro
import JsonLd from './JsonLd.astro';

interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);

// Define your schemas as separate objects
const webPageSchema = {
  "@type": "WebPage",
  "@id": `${canonicalURL.href}#webpage`,
  "url": canonicalURL.href,
  "name": title,
  "description": description,
  "isPartOf": {
    "@id": `${Astro.site}#website`
  }
};

const localBusinessSchema = {
  "@type": "LocalBusiness",
  "@id": `${Astro.site}#organization`,
  "name": "Wimmer EDV GmbH",
  "url": Astro.site,
  // ... other LocalBusiness properties
};

// Combine them using @graph
const graphSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema,
    localBusinessSchema
    // Add other schemas for the page here, like BreadcrumbList
  ]
};
---
<!-- ... Other SEO meta tags ... -->
<title>{title}</title>
<link rel="canonical" href={canonicalURL} />
<JsonLd schema={graphSchema} />
```

## 5. Environment Variables

No environment variables are strictly required for JSON-LD itself. However, it's good practice to store site-wide information (company name, phone number, social URLs) in `.env` files and access them via `import.meta.env.VARIABLE_NAME`.

**`.env` file:**
```
PUBLIC_COMPANY_NAME="Wimmer EDV GmbH"
PUBLIC_PHONE_NUMBER="+43-XXX-XXXXXX"
```

**Usage in code:**
```javascript
const name = import.meta.env.PUBLIC_COMPANY_NAME;
```

## 6. Gotchas & Common Mistakes

1.  **Forgetting `JSON.stringify()`:** The most common error. The `<script>` tag's content must be a valid JSON *string*, not a JavaScript object literal. Using `set:html={JSON.stringify(schema)}` solves this.
2.  **Missing `is:inline`:** If you forget this Astro directive, the script tag will be processed by Astro and may be bundled or hoisted, preventing crawlers from reading it correctly.
3.  **Using Relative URLs:** Schema.org properties that expect a URL (like `image`, `url`, `@id`) should almost always be **absolute URLs**. Use `new URL(path, Astro.site).href` to reliably generate them.
4.  **Invalid JSON:** A stray comma or a missing quote can invalidate the entire schema. Using `JSON.stringify()` prevents syntax errors, but the data structure must still be correct.
5.  **Not Validating:** **Always** test your URLs with the [Google Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/) to find and fix errors before deployment.