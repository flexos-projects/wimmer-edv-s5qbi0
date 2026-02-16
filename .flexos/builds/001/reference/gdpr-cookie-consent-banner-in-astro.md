---
type: doc
subtype: reference
title: GDPR Cookie Consent Banner in Astro
---

---
type: doc
subtype: reference
title: GDPR Cookie Consent Banner in Astro
---

This document provides the exact, production-quality pattern for implementing a GDPR-compliant cookie consent banner in an Astro 5 project. It uses `localStorage` for persistence and custom events to cleanly manage third-party script initialization. This approach avoids external libraries, minimizing bloat and ensuring full control.

### Purpose

To create a banner that:
1.  Asks for user consent before loading tracking scripts (e.g., analytics).
2.  Remembers the user's choice across sessions.
3.  Provides a clean, event-driven way for other scripts to initialize only after consent is given.
4.  Is styled according to the project's design system and avoids layout shifts.

### Implementation

The implementation consists of three parts: the banner component, its integration into the base layout, and an example of a script that respects the user's consent.

#### 1. The Cookie Banner Component (`src/components/CookieConsent.astro`)

This component is an Astro "island" that runs a small script on the client to manage the consent state. It is hidden by default and only shown if consent has not been granted.

```astro
---
// src/components/CookieConsent.astro
// This component uses Tailwind CSS classes derived from the design system.
---

<div
  id="cookie-consent-banner"
  class="hidden fixed bottom-4 right-4 md:bottom-8 md:right-8 max-w-md w-[calc(100%-2rem)] z-50 p-6 bg-surface-800 text-surface-50 rounded-xl shadow-2xl transition-transform duration-500 ease-in-out transform translate-y-8 opacity-0"
  role="dialog"
  aria-modal="true"
  aria-labelledby="cookie-consent-title"
  aria-describedby="cookie-consent-description"
>
  <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
    <div class="flex-grow">
      <h2 id="cookie-consent-title" class="text-lg font-bold">Cookie-Einstellungen</h2>
      <p id="cookie-consent-description" class="text-sm mt-1 text-surface-200">
        Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und den Website-Verkehr zu analysieren. Mit Ihrer Zustimmung helfen Sie uns, unseren Service zu optimieren.
        <a href="/datenschutz" class="underline hover:text-white">Mehr erfahren</a>.
      </p>
    </div>
    <div class="flex gap-3 flex-shrink-0 w-full md:w-auto">
      <button
        id="cookie-consent-accept"
        class="flex-1 bg-accent-500 hover:bg-accent-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 ease-in-out w-full"
      >
        Akzeptieren
      </button>
    </div>
  </div>
</div>

<script>
  // This script runs on the client and manages the consent banner's visibility and state.
  document.addEventListener('astro:page-load', () => {
    const banner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('cookie-consent-accept');

    if (!banner || !acceptBtn) {
      return;
    }

    const CONSENT_KEY = 'wimmer_gdpr_consent';
    const HAS_CONSENT = localStorage.getItem(CONSENT_KEY) === 'true';

    // If consent is already given, do nothing.
    if (HAS_CONSENT) {
      // Dispatch the event immediately on page load for scripts that need it.
      document.dispatchEvent(new CustomEvent('consent-given'));
      return;
    }

    // If no consent, show the banner with a smooth animation.
    setTimeout(() => {
        banner.classList.remove('hidden', 'translate-y-8', 'opacity-0');
    }, 1000); // Delay showing the banner slightly to not intrude immediately.

    // When the user accepts, save the consent and hide the banner.
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'true');
      
      // Dispatch the event so other scripts can start initializing.
      document.dispatchEvent(new CustomEvent('consent-given'));

      banner.classList.add('translate-y-8', 'opacity-0');
      setTimeout(() => {
        banner.classList.add('hidden');
      }, 500); // Wait for animation to finish.
    });
  });
</script>
```

#### 2. Integration into the Layout (`src/layouts/BaseLayout.astro`)

Place the `CookieConsent` component just before the closing `</body>` tag in your main layout file. This ensures it's available on every page.

```astro
---
// src/layouts/BaseLayout.astro
import CookieConsent from '../components/CookieConsent.astro';
import Analytics from '../components/Analytics.astro';
// ... other imports
---
<!doctype html>
<html lang="de">
  <head>
    <!-- ... head content ... -->
  </head>
  <body class="bg-surface-50 font-sans antialiased text-surface-800">
    <main>
      <slot />
    </main>
    
    <CookieConsent />
    <Analytics />
  </body>
</html>
```

#### 3. Analytics Script Respecting Consent (`src/components/Analytics.astro`)

This is an example of a script (for a privacy-focused analytics tool like Umami) that will **only execute** after it receives the `consent-given` event.

```astro
---
// src/components/Analytics.astro
const umamiWebsiteId = import.meta.env.PUBLIC_UMAMI_ID;
const umamiScriptUrl = import.meta.env.PUBLIC_UMAMI_SCRIPT_URL;

// Only render the script tag if the necessary environment variables are set.
const shouldRender = umamiWebsiteId && umamiScriptUrl;
---

{shouldRender && (
  <script is:inline define:vars={{ umamiWebsiteId, umamiScriptUrl }}>
    function initAnalytics() {
      // Check if the script has already been injected
      if (document.getElementById('umami-analytics-script')) {
        return;
      }

      console.log('Analytics consent given. Initializing...');
      const script = document.createElement('script');
      script.id = 'umami-analytics-script';
      script.async = true;
      script.src = umamiScriptUrl;
      script.setAttribute('data-website-id', umamiWebsiteId);
      document.head.appendChild(script);
    }
    
    // Listen for the custom event dispatched by the cookie banner.
    document.addEventListener('consent-given', initAnalytics);
  </script>
)}
```

### Environment Variables

The analytics component requires environment variables to be set in your `.env` file and exposed to the client with the `PUBLIC_` prefix.

**.env**
```
PUBLIC_UMAMI_ID="your-umami-website-id"
PUBLIC_UMAMI_SCRIPT_URL="https://your-umami-instance.com/script.js"
```

### Gotchas & Best Practices

1.  **Prevent Layout Shift (FOUC):** The banner is `hidden` by default using a standard class. The script then removes this class to show it. This prevents the banner from flashing on screen for a moment on page load if consent has already been given.
2.  **Use Custom Events:** The `consent-given` custom event is the cleanest way to decouple the banner from the scripts that depend on it. This avoids race conditions and makes the system modular. Never try to initialize analytics from within the banner's script directly.
3.  **Client-Side Persistence:** `localStorage` is the standard and simplest method for persisting consent on the user's browser. It has excellent browser support.
4.  **Accessibility:** The banner uses `role="dialog"` and `aria-modal="true"` to signal its purpose to screen readers.
5.  **Don't Block Rendering:** The analytics script is injected dynamically and asynchronously (`async = true`) into the `<head>` to avoid blocking page rendering.
6.  **`astro:page-load`:** Using this event ensures the script re-evaluates correctly during client-side page transitions when using Astro's `<ViewTransitions />`.