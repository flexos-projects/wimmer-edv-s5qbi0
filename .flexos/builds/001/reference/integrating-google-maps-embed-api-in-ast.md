---
type: doc
subtype: reference
title: Integrating Google Maps Embed API in Astro
---

---
type: doc
subtype: reference
title: Integrating Google Maps Embed API in Astro
---

This document provides a definitive, production-quality guide for integrating the Google Maps Embed API into an Astro 5 project. It is designed for an AI code generator and focuses on a minimal, performant, and secure implementation.

### 1. Overview

The Google Maps Embed API is the simplest and most performant way to add a map to a webpage. It uses a standard `<iframe>` and is part of Google Maps' free usage tier, making it ideal for displaying a business location on a contact page without incurring costs or adding JavaScript overhead.

### 2. Prerequisites

Before implementation, you must have:

1.  A **Google Cloud Platform (GCP) Project**.
2.  The **"Maps Embed API"** enabled within that project.
3.  An **API Key**.
4.  **Crucially, the API Key must be restricted.** Go to GCP > Credentials > Your API Key. Under "Application restrictions," select "HTTP referrers (web sites)" and add your website's domain (e.g., `www.wimmer-edv.at`, `*.wimmer-edv.at`). This prevents others from using your key.

### 3. Configuration: Environment Variables

Store your API key securely using Astro's environment variables.

1.  Create a file named `.env` in the root of your project (if it doesn't exist).
2.  Add your API key, prefixed with `PUBLIC_` so it can be accessed in client-side templates.

**File: `.env`**

```
# This key is exposed in the browser but restricted to your domain in GCP.
PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_API_KEY_HERE"
```

### 4. Reusable Astro Component

Create a reusable component to encapsulate the map logic. This component will accept the location as a prop.

**File: `src/components/GoogleMapEmbed.astro`**

```astro
---
interface Props {
  locationQuery: string;
  title: string;
  className?: string;
}

const { locationQuery, title, className } = Astro.props;

// Retrieve the API key from environment variables.
const apiKey = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;

if (!apiKey) {
  throw new Error("Missing PUBLIC_GOOGLE_MAPS_API_KEY. Please check your .env file.");
}

// Construct the URL for the iframe source. The location query must be URL-encoded.
const mapSrc = new URL("https://www.google.com/maps/embed/v1/place");
mapSrc.searchParams.set('key', apiKey);
mapSrc.searchParams.set('q', locationQuery);
---

<div class:list={["relative w-full overflow-hidden rounded-xl shadow-md aspect-w-16 aspect-h-9", className]}>
  <iframe
    class="absolute inset-0 w-full h-full border-0"
    loading="lazy"
    title={title}
    src={mapSrc.toString()}
    allowfullscreen
  >
  </iframe>
</div>

<style>
  /* Simple aspect ratio for responsive embedding */
  .aspect-w-16 {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
  }

  .aspect-h-9 {
    height: 0;
  }
</style>
```

### 5. Usage on a Page

Import and use the component on any page, such as the contact page. Pass the business address and an accessible title as props.

**File: `src/pages/kontakt.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Section from '../components/Section.astro';
import GoogleMapEmbed from '../components/GoogleMapEmbed.astro';
// Other component imports...

const companyAddress = "Dr.-Adolf-Schärf-Straße 10, 3107 St. Pölten, Austria";
---
<BaseLayout title="Kontakt" description="Nehmen Sie Kontakt mit Wimmer EDV auf.">
  
  <!-- Other page content like contact form, etc. -->

  <Section variant="light">
    <div class="text-center">
      <h2 class="text-4xl font-bold text-primary-700">Unser Standort</h2>
      <p class="mt-4 text-lg text-surface-600">{companyAddress}</p>
    </div>

    <div class="mt-12 max-w-4xl mx-auto">
      <GoogleMapEmbed
        locationQuery={companyAddress}
        title="Standort von Wimmer EDV in St. Pölten"
      />
    </div>
  </Section>

</BaseLayout>
```

### 6. Best Practices & Gotchas

*   **API Key Restriction is NOT Optional:** Without HTTP referrer restrictions, anyone can find your key in the page source and use it, potentially leading to unexpected charges if you enable other, non-free Google Maps APIs.
*   **Accessibility:** The `title` attribute on the `<iframe>` is essential for screen reader users to understand its content. Make it descriptive.
*   **Performance:** The `loading="lazy"` attribute is critical. It prevents the map from loading until it's near the viewport, which significantly improves initial page load speed.
*   **Styling:** The `<iframe>` itself can be styled like any other element (size, border, shadow). The map's internal appearance is controlled by Google. For custom map styles, you would need to use the more complex Google Maps JavaScript API.
*   **URL Encoding:** The component above handles URL encoding automatically via `URLSearchParams`. If constructing the URL manually, ensure the `q` parameter value is properly encoded to handle special characters in addresses.
*   **Cost:** The Maps Embed API is free for unlimited use. This is its primary advantage over the JavaScript API for simple map displays.