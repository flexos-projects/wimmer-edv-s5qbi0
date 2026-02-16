---
type: doc
subtype: reference
title: Newsletter Signup API Integration (Vercel Function)
---

---
type: doc
subtype: reference
title: Newsletter Signup API Integration (Vercel Function)
---

This document provides the definitive, production-quality guide for creating a newsletter signup form in an Astro 5 project. The form submits data to a serverless API route deployed on Vercel, which securely communicates with the Mailchimp API.

---

## 1. Overview & Prerequisites

This pattern uses an Astro API route to create a secure backend endpoint. The frontend component, an Astro island, posts the user's email to this endpoint. The serverless function then adds the email to a Mailchimp audience list. This prevents exposing sensitive API keys on the client side.

**You will need:**
*   A Mailchimp account.
*   Your Mailchimp **API Key**.
*   Your Mailchimp **Server Prefix** (e.g., `us19`).
*   Your Mailchimp **Audience ID** (also called List ID).

**Finding your Mailchimp credentials:**
1.  **API Key & Server Prefix:** Account > Extras > API keys. Create a new key. The key will look like `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us19`. The long string is the API Key, and the part after the dash (`us19`) is the Server Prefix.
2.  **Audience ID:** Audience > All contacts > Settings > Audience name and defaults. The Audience ID is listed there.

## 2. Installation

Install the official Mailchimp Marketing Node.js client.

```bash
npm install @mailchimp/mailchimp_marketing
```

*Verified with `@mailchimp/mailchimp_marketing@^4.0.0`*

## 3. Environment Variables

Create a `.env` file in your project's root directory and add your Mailchimp credentials. These **must** be added to your Vercel project's Environment Variables settings for production deployment.

**.env**
```env
# Mailchimp Credentials
MAILCHIMP_API_KEY="your-long-api-key-string"
MAILCHIMP_SERVER_PREFIX="us19" # The prefix from the end of your API key
MAILCHIMP_AUDIENCE_ID="your-audience-id"
```

## 4. The API Route (Vercel Function)

Create a file at `src/pages/api/subscribe.ts`. This endpoint will handle the server-side logic.

**`src/pages/api/subscribe.ts`**
```typescript
import type { APIRoute } from 'astro';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize the Mailchimp client with credentials from environment variables
mailchimp.setConfig({
  apiKey: import.meta.env.MAILCHIMP_API_KEY,
  server: import.meta.env.MAILCHIMP_SERVER_PREFIX,
});

const audienceId = import.meta.env.MAILCHIMP_AUDIENCE_ID;

export const POST: APIRoute = async ({ request }) => {
  // Basic validation: ensure we have the necessary credentials
  if (!audienceId || !import.meta.env.MAILCHIMP_API_KEY) {
    return new Response(JSON.stringify({ error: 'Mailchimp configuration is missing.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get the email from the request body
  const { email } = await request.json();

  // Basic email validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'A valid email is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Attempt to add the new member to the Mailchimp list
    const response = await mailchimp.lists.addListMember(audienceId, {
      email_address: email,
      status: 'subscribed', // or 'pending' for double opt-in
    });

    // Success response
    return new Response(JSON.stringify({ message: 'Success! You are subscribed.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    // Handle specific Mailchimp errors
    if (error.response && error.response.body) {
      // "Member Exists" is a common case we want to handle gracefully
      if (error.response.body.title === 'Member Exists') {
        return new Response(JSON.stringify({ message: 'You are already subscribed!' }), {
          status: 409, // Conflict
          headers: { 'Content-Type': 'application/json' },
        });
      }
      // Log other Mailchimp API errors for debugging
      console.error('Mailchimp API Error:', error.response.body.detail);
    }
    
    // Generic server error for all other cases
    return new Response(JSON.stringify({ error: 'An unexpected error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
```

## 5. The Frontend Form (Astro Component)

Create a reusable component for the form. It uses client-side JavaScript to submit the form without a page reload and handle API responses.

**`src/components/NewsletterForm.astro`**
```astro
---
import { Icon } from 'astro-icon/components';
---
<div id="newsletter-form-wrapper" class="max-w-md mx-auto p-2 border border-surface-200 rounded-lg bg-white shadow-sm">
  <form id="newsletter-form" class="flex items-center gap-2">
    <label for="email-input" class="sr-only">Email address</label>
    <div class="relative flex-grow">
      <Icon name="lucide:mail" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400 pointer-events-none" />
      <input
        type="email"
        id="email-input"
        name="email"
        required
        placeholder="your.email@example.com"
        class="w-full pl-10 pr-3 py-2.5 rounded-md border border-surface-300 bg-surface-50 text-surface-800 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all duration-200 ease-in-out"
      />
    </div>
    <button
      type="submit"
      id="submit-button"
      class="btn btn-primary inline-flex items-center justify-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span class="submit-text">Subscribe</span>
      <Icon name="lucide:loader-circle" class="animate-spin w-5 h-5 ml-2 hidden" />
    </button>
  </form>
  <p id="response-message" aria-live="polite" class="text-sm mt-2 px-2 text-center min-h-[1.25rem]"></p>
</div>

<script>
  document.addEventListener('astro:page-load', () => {
    const form = document.getElementById('newsletter-form') as HTMLFormElement | null;
    if (!form) return;

    const submitButton = form.querySelector('#submit-button') as HTMLButtonElement;
    const submitText = submitButton.querySelector('.submit-text') as HTMLSpanElement;
    const loadingIcon = submitButton.querySelector('svg') as SVGSVGElement;
    const responseMessage = document.getElementById('response-message') as HTMLParagraphElement;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      // Disable form and show loading state
      submitButton.disabled = true;
      submitText.textContent = 'Submitting...';
      loadingIcon.classList.remove('hidden');
      responseMessage.textContent = '';
      responseMessage.className = 'text-sm mt-2 px-2 text-center min-h-[1.25rem]';

      const formData = new FormData(form);
      const email = formData.get('email');

      try {
        const res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        
        const data = await res.json();

        if (res.ok) {
          responseMessage.textContent = data.message || 'Success! Check your inbox.';
          responseMessage.classList.add('text-accent-600');
          form.reset();
        } else if (res.status === 409) { // Conflict - Member Exists
          responseMessage.textContent = data.message || 'You are already subscribed!';
          responseMessage.classList.add('text-primary-700');
        } else {
          throw new Error(data.error || 'An error occurred.');
        }

      } catch (error: any) {
        responseMessage.textContent = error.message || 'Failed to subscribe. Please try again.';
        responseMessage.classList.add('text-error');
      } finally {
        // Re-enable form and hide loading state
        submitButton.disabled = false;
        submitText.textContent = 'Subscribe';
        loadingIcon.classList.add('hidden');
      }
    });
  });
</script>
```

## 6. Gotchas & Best Practices

*   **Double Opt-In:** The example uses `status: 'subscribed'`. For better compliance and list quality, you can change this to `status: 'pending'`. This will send a confirmation email to the user, and they won't be added to the list until they click the link inside it.
*   **Error Handling is Crucial:** The most common "error" is a user trying to subscribe with an email that's already on the list. The API route correctly handles Mailchimp's `Member Exists` response and returns a friendly message with a `409 Conflict` status, which the frontend script interprets.
*   **Security:** This pattern is secure because the `MAILCHIMP_API_KEY` is only ever accessed on the server (in the Vercel Function). It is never exposed to the browser.
*   **Astro Page Load Event:** The client-side script is wrapped in `document.addEventListener('astro:page-load', ...)` to ensure it re-initializes correctly when using Astro's View Transitions for page navigation.