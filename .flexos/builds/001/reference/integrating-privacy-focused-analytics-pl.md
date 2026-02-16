---
type: doc
subtype: reference
title: Integrating Privacy-Focused Analytics (Plausible/Umami)
---

---
type: doc
subtype: reference
title: Integrating Privacy-Focused Analytics (Plausible/Umami)
---

This document provides a definitive, production-ready guide for integrating privacy-focused analytics services, Plausible and Umami, into an Astro 5 website. These methods prioritize performance, simplicity, and GDPR compliance.

## 1. Plausible Analytics Integration

Plausible is a lightweight, open-source, and cookieless analytics platform. The recommended integration method is a simple, dependency-free script tag.

### Step 1: Create the Plausible Component

Create a reusable component to house the script. This keeps your layout file clean and makes the integration easy to manage.

**File: `src/components/analytics/PlausibleAnalytics.astro`**

```astro
---
// This component conditionally renders the Plausible analytics script.
// It should only run in the production environment.

// Ensure your Plausible domain is set in your environment variables.
// Vercel: Project > Settings > Environment Variables
// Local: .env file
const plausibleDomain = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN;
---
{
  import.meta.env.PROD && plausibleDomain && (
    <script 
      is:inline 
      defer 
      data-domain={plausibleDomain}
      src="/js/script.js" 
    />
  )
}
```

### Step 2: Configure Script Proxy (Optional but Recommended)

To avoid ad-blockers, Plausible recommends proxying their script. This is straightforward in Astro.

**File: `astro.config.mjs`**

Add the following `rewrites` configuration. This tells Astro to serve the Plausible script from your own domain at `/js/script.js`.

```javascript
import { defineConfig } from 'astro/config';

// ... other imports

export default defineConfig({
  // ... other configs
  rewrites: {
    '/js/script.js': 'https://plausible.io/js/script.js',
  },
});
```

*Note: If you choose not to proxy, change the `src` in `PlausibleAnalytics.astro` to `https://plausible.io/js/script.js`.*

### Step 3: Add Component to Base Layout

Import and place the component within the `<head>` of your main layout file.

**File: `src/layouts/BaseLayout.astro`**

```astro
---
import PlausibleAnalytics from '../components/analytics/PlausibleAnalytics.astro';
// ... other imports
---
<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <!-- Other meta tags, links, etc. -->
    <title>{title}</title>
    
    <!-- Add Plausible Analytics Script -->
    <PlausibleAnalytics />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### Step 4: Set Environment Variables

Your Plausible "Domain Name" is the value you set in your Plausible account settings.

**File: `.env` (for local development)**

```
PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

**Vercel Deployment:**

Go to your Vercel Project > Settings > Environment Variables and add `PUBLIC_PLAUSIBLE_DOMAIN` with your site's domain name. The `PUBLIC_` prefix is required by Astro to expose the variable to client-side scripts.

---

## 2. Umami Analytics Integration

Umami is another excellent open-source, privacy-focused analytics tool. It's very lightweight and often self-hosted.

### Step 1: Create the Umami Component

**File: `src/components/analytics/UmamiAnalytics.astro`**

```astro
---
// This component conditionally renders the Umami analytics script.
// It requires your Website ID and the script URL.

const websiteId = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID;
const scriptUrl = import.meta.env.PUBLIC_UMAMI_SCRIPT_URL;
---
{
  import.meta.env.PROD && websiteId && scriptUrl && (
    <script 
      is:inline
      async
      defer
      data-website-id={websiteId}
      src={scriptUrl}
    />
  )
}
```

### Step 2: Add Component to Base Layout

Place the component within the `<head>` of your main layout file.

**File: `src/layouts/BaseLayout.astro`**

```astro
---
import UmamiAnalytics from '../components/analytics/UmamiAnalytics.astro';
// ... other imports
---
<!doctype html>
<html lang="de">
  <head>
    <!-- Other meta tags, links, etc. -->
    <title>{title}</title>
    
    <!-- Add Umami Analytics Script -->
    <UmamiAnalytics />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### Step 3: Set Environment Variables

You will get the Website ID and Script URL from your Umami dashboard.

**File: `.env` (for local development)**

```
# For Umami's cloud service
PUBLIC_UMAMI_WEBSITE_ID="abc-123-def-456"
PUBLIC_UMAMI_SCRIPT_URL="https://analytics.umami.is/script.js"

# Example for a self-hosted instance
# PUBLIC_UMAMI_WEBSITE_ID="your-self-hosted-id"
# PUBLIC_UMAMI_SCRIPT_URL="https://your-umami-instance.com/script.js"
```

**Vercel Deployment:**

Add `PUBLIC_UMAMI_WEBSITE_ID` and `PUBLIC_UMAMI_SCRIPT_URL` to your Vercel project's environment variables.

---

## Gotchas & Best Practices

1.  **Production Only:** The examples use `import.meta.env.PROD` to ensure analytics scripts are only injected during a production build (`astro build`). This prevents tracking of local development activity.
2.  **`PUBLIC_` Prefix is Mandatory:** For Astro to expose an environment variable to the client (which these scripts are), it **must** be prefixed with `PUBLIC_`. A common mistake is forgetting this prefix, causing the variable to be `undefined`.
3.  **`is:inline` Directive:** This Astro directive is crucial. It tells Astro to render the `<script>` tag exactly as written, preventing it from being bundled or processed. This is necessary for external analytics scripts.
4.  **No Cookie Banner Needed:** Both Plausible and Umami are cookieless by default and do not collect personal data, making them compliant with GDPR, CCPA, and PECR without requiring a cookie consent banner.
5.  **Ad Blockers:** Be aware that all client-side analytics scripts, including these, can be blocked by browsers with strict tracking protection or ad-blocking extensions. This may result in under-reporting of traffic. Using a proxy (as shown for Plausible) can help mitigate this.
6.  **Choose One:** Only use one analytics provider at a time to avoid unnecessary script loading and potential data conflicts.