---
type: doc
subtype: reference
title: Calendly Embed Integration in Astro
---

---
type: doc
subtype: reference
title: Calendly Embed Integration in Astro
---

This document provides a production-quality guide for integrating Calendly booking widgets into an Astro 5 project. The focus is on performance, responsiveness, and adherence to best practices like Astro Islands and GDPR compliance.

## 1. Installation & Configuration

No special NPM package is required. Calendly integration is achieved by embedding a standard HTML snippet and a JavaScript file provided by Calendly.

The primary performance consideration is to **avoid loading the Calendly script on every page load**. We will use an Astro Island with a `client:visible` directive to ensure the script is only fetched and executed when the embed component is scrolled into the viewport.

## 2. Astro Component Examples

There are two primary ways to embed Calendly: as an inline calendar on a dedicated booking page, or as a popup widget that appears on top of the page content.

### A) Inline Embed Component (`src/components/CalendlyInline.astro`)

This is the recommended approach for a dedicated `/kontakt` or `/buchen` page.

**Purpose:** Renders the full Calendly scheduling interface directly within the page layout.

```astro
---
// src/components/CalendlyInline.astro
import type { HTMLAttributes } from 'astro/types';

interface Props extends HTMLAttributes<'div'> {
  calendlyUrl: string;
  prefill?: {
    name?: string;
    email?: string;
    // Add other custom prefill fields here
  };
}

const { calendlyUrl, prefill = {}, ...rest } = Astro.props;

// Construct prefill query parameters
const prefillParams = new URLSearchParams();
if (prefill.name) prefillParams.set('name', prefill.name);
if (prefill.email) prefillParams.set('email', prefill.email);

const finalUrl = `${calendlyUrl}?${prefillParams.toString()}`;

// Ensure the container has a minimum height to avoid layout shift while the widget loads.
const defaultStyles = 'min-h-[720px]';
const userClasses = rest.class || '';
---

<!-- 
  The `client:visible` directive is crucial. It turns this component into an 
  "island" and ensures the Calendly widget script is only loaded when the 
  user scrolls this component into view, which is essential for performance.
-->
<div
  class:list={[defaultStyles, userClasses]}
  data-url={finalUrl}
  {...rest}
  client:visible
>
  <!-- This div will be replaced by the Calendly iframe. -->
</div>

<script>
  // This client-side script runs only when the component becomes visible.
  document.addEventListener('astro:page-load', () => {
    const calendlyContainers = document.querySelectorAll<HTMLElement>('[data-url]');
    
    if (calendlyContainers.length === 0) return;

    // Check if the Calendly script is already on the page to avoid duplicates.
    if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }

    // Initialize widgets once the script is loaded.
    script.onload = () => {
      calendlyContainers.forEach(container => {
        // @ts-ignore - Calendly is available on the window object after script load
        window.Calendly.initInlineWidget({
          url: container.dataset.url,
          parentElement: container,
        });
      });
    };
  });
</script>
```

**Usage in a Page (`src/pages/kontakt.astro`):**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import CalendlyInline from '../components/CalendlyInline.astro';

const CALENDLY_BOOKING_URL = import.meta.env.PUBLIC_CALENDLY_URL;
---
<BaseLayout title="Book a Consultation" description="Schedule a free consultation with our team.">
  <section class="container mx-auto py-24 px-4">
    <div class="text-center max-w-3xl mx-auto">
      <h1 class="text-5xl font-bold text-primary-700">Schedule a Consultation</h1>
      <p class="mt-4 text-lg text-surface-600">
        Choose a time that works for you. We look forward to speaking with you.
      </p>
    </div>

    <!-- The Calendly widget will be loaded here when it becomes visible -->
    <div class="mt-12 max-w-4xl mx-auto rounded-xl overflow-hidden border border-surface-200 shadow-lg">
      <CalendlyInline calendlyUrl={CALENDLY_BOOKING_URL} />
    </div>
  </section>
</BaseLayout>
```

### B) Popup Widget Component (`src/components/CalendlyWidget.astro`)

This approach adds a floating button to the page that opens the Calendly scheduler in a popup modal. It's suitable for site-wide CTAs.

```astro
---
// src/components/CalendlyWidget.astro
interface Props {
  calendlyUrl: string;
  buttonText?: string;
}

const { calendlyUrl, buttonText = 'Schedule a Call' } = Astro.props;
---

<!-- This is an Astro Island. The script runs as soon as the component is loaded. -->
<div id="calendly-popup-container" client:load>
  <!-- This is just a placeholder button. The real floating widget will be added by the script. -->
  <!-- You can also use this button to trigger the popup manually if you customize the script. -->
</div>

<script define:vars={{ calendlyUrl, buttonText }}>
  document.addEventListener('astro:page-load', () => {
    // Check if the Calendly script is already on the page
    if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;

      script.onload = () => {
        // @ts-ignore - Calendly is available after script load
        window.Calendly.initBadgeWidget({
          url: calendlyUrl,
          text: buttonText,
          color: '#2D3748', // Corresponds to primary-700 from design system
          textColor: '#F7FAFC', // Corresponds to surface-50
          branding: true,
        });
      };
      
      document.head.appendChild(script);
    }
  });
</script>
```

**Usage (in `src/layouts/BaseLayout.astro` for site-wide access):**

```astro
---
// ... other BaseLayout imports
import CalendlyWidget from '../components/CalendlyWidget.astro';

const CALENDLY_BOOKING_URL = import.meta.env.PUBLIC_CALENDLY_URL;
---
<!-- ... inside <body> tag of BaseLayout.astro ... -->
<body class="bg-surface-50 font-sans antialiased text-surface-800">
  <Header />
  <main id="main-content">
    <slot />
  </main>
  <Footer />
  
  <!-- Add the Calendly popup widget here -->
  <CalendlyWidget calendlyUrl={CALENDLY_BOOKING_URL} />
</body>
</html>
```

## 3. Environment Variables

It is best practice to store your Calendly URL in your `.env` file to keep it manageable.

**.env**
```
PUBLIC_CALENDLY_URL="https://calendly.com/your-username/your-event"
```

Prefixing with `PUBLIC_` makes the variable accessible in client-side scripts if needed, but it's safer to pass it as a prop from server-rendered Astro components.

## 4. Gotchas and Common Mistakes

1.  **Forgetting `client:visible` or `client:load`:** This is the most common mistake. Without a `client:*` directive, the component's `<script>` will not run on the client, and the Calendly widget will never initialize. Use `client:visible` for the inline embed for best performance and `client:load` for the popup widget which needs to be available on page load.

2.  **Layout Shift:** The inline embed loads an `iframe`. If its container has no set height, the page will "jump" when the widget loads. Prevent this by setting a `min-h-[value]` on the container, as shown in the `CalendlyInline.astro` example. A value around `720px` is a good starting point.

3.  **Styling Conflicts:** You cannot directly style the content *inside* the Calendly `iframe`. Customization is limited to what Calendly's settings allow. Your CSS should target the container `div`, not the `iframe` itself.

4.  **GDPR & Cookie Consent:** Calendly is a third-party service and may set cookies. To be compliant, you should wrap the Calendly component in a component that checks for user consent *before* rendering it. The Calendly script should only be loaded after the user accepts marketing or functional cookies.

## 5. Minimal Working Implementation

The `CalendlyInline.astro` component using `client:visible` is the most direct and performant way to add a full booking calendar to a page.

**The critical pattern is:**
1.  Create a container `div` in your Astro component.
2.  Add the `client:visible` directive to that container.
3.  Use a `<script>` tag within the same component to load Calendly's `widget.js` and initialize the widget, targeting the container.

This pattern correctly leverages Astro Islands to defer loading of the third-party script until it's actually needed, significantly improving initial page load performance.