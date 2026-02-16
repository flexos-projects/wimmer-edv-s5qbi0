---
type: doc
subtype: reference
title: Astro API Endpoints on Vercel for Form Handling
---

---
type: doc
subtype: reference
title: Astro API Endpoints on Vercel for Form Handling
---

This document provides a definitive, production-quality guide for creating API endpoints in Astro 5 to handle form submissions when deployed on Vercel. It uses modern, recommended libraries and best practices.

## 1. Core Concept

When using the `@astrojs/vercel` adapter with `output: 'server'`, any file created in `src/pages/api/` becomes a serverless function on Vercel. This is the ideal method for handling backend tasks like form submissions without managing a separate server. We will use the **Resend** email service for its simplicity and excellent integration with serverless environments.

## 2. Installation & Configuration

### Step 1: Install Dependencies

Install the Vercel adapter, Resend for sending emails, and Zod for robust data validation.

```bash
npm install @astrojs/vercel resend zod
```

This will add the following to your `package.json`:

```json
"dependencies": {
  // ... other dependencies
  "@astrojs/vercel": "^7.7.2",
  "resend": "^3.4.0",
  "zod": "^3.23.8"
}
```

### Step 2: Configure `astro.config.mjs`

Ensure your Astro config is set up for server-side rendering on Vercel.

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://www.wimmer-edv.at',
  output: 'server',
  adapter: vercel({
    imageService: true,
  }),
  integrations: [tailwind({ applyBaseStyles: false })],
});
```

### Step 3: Set Up Environment Variables

You need a Resend API key.

1.  Sign up for a free account at [resend.com](https://resend.com).
2.  Create an API key.
3.  Add your domain and the necessary DNS records to be able to send emails from `your-domain.com`. For testing, Resend allows sending from `onboarding@resend.dev`.

Create a `.env` file in your project root for local development:

```
# .env
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
# The email address you will send notifications TO (your own email)
CONTACT_FORM_SEND_TO="your-email@example.com"
```

In your Vercel project, add these same variables under **Project > Settings > Environment Variables**.

## 3. Implementation

This is a two-part process: the frontend component that the user interacts with and the backend API route that processes the data.

### Part 1: The Frontend Form (`src/components/ContactForm.astro`)

This component includes the HTML form, a simple honeypot for spam prevention, and a client-side script to handle the submission process for a better user experience.

```astro
---
// src/components/ContactForm.astro
---
<div id="contact-form-wrapper" class="w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
  <form id="contact-form" class="space-y-6">
    <h2 class="text-3xl font-bold text-primary-700">Kontakt aufnehmen</h2>
    
    <!-- Honeypot field for spam prevention -->
    <div class="hidden">
      <label for="bot-field">Do not fill this out if you're human:</label>
      <input type="text" id="bot-field" name="bot-field" />
    </div>

    <div>
      <label for="name" class="block text-sm font-medium text-surface-700 mb-1">Name</label>
      <input type="text" id="name" name="name" required class="form-input" placeholder="Ihr Name">
    </div>
    
    <div>
      <label for="email" class="block text-sm font-medium text-surface-700 mb-1">E-Mail</label>
      <input type="email" id="email" name="email" required class="form-input" placeholder="ihre@email.at">
    </div>
    
    <div>
      <label for="message" class="block text-sm font-medium text-surface-700 mb-1">Nachricht</label>
      <textarea id="message" name="message" rows="5" required class="form-input" placeholder="Womit können wir Ihnen helfen?"></textarea>
    </div>
    
    <div>
      <button type="submit" id="submit-button" class="btn btn-primary w-full sm:w-auto">
        <span id="button-text">Nachricht senden</span>
        <span id="button-loader" class="hidden">Senden...</span>
      </button>
    </div>
  </form>
  <div id="form-status" class="mt-4 text-center"></div>
</div>

<style>
  .form-input {
    @apply w-full px-4 py-3 rounded-lg border border-surface-200 bg-surface-50 text-surface-800 transition-all duration-200 ease-in-out;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300;
  }
  .btn {
    @apply inline-flex items-center justify-center font-medium py-3 px-8 rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  .btn-primary {
    @apply bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500;
  }
</style>

<script>
  document.addEventListener('astro:page-load', () => {
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');
    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const buttonLoader = document.getElementById('button-loader');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Disable button and show loader
      submitButton.setAttribute('disabled', 'true');
      buttonText.classList.add('hidden');
      buttonLoader.classList.remove('hidden');
      statusDiv.textContent = '';
      statusDiv.className = 'mt-4 text-center';

      const formData = new FormData(form);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          statusDiv.textContent = result.message;
          statusDiv.classList.add('text-accent-600');
          form.reset();
        } else {
          statusDiv.textContent = result.message || 'Ein Fehler ist aufgetreten.';
          statusDiv.classList.add('text-error');
        }
      } catch (error) {
        statusDiv.textContent = 'Netzwerkfehler. Bitte versuchen Sie es später erneut.';
        statusDiv.classList.add('text-error');
      } finally {
        // Re-enable button and hide loader
        submitButton.removeAttribute('disabled');
        buttonText.classList.remove('hidden');
        buttonLoader.classList.add('hidden');
      }
    });
  });
</script>
```

### Part 2: The API Endpoint (`src/pages/api/contact.ts`)

This serverless function receives the form data, validates it, and sends an email using Resend.

```typescript
// src/pages/api/contact.ts
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const contactEmail = import.meta.env.CONTACT_FORM_SEND_TO;

// Define the schema for your form data
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  'bot-field': z.string().optional(), // Honeypot field
});

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData.entries());

  // Honeypot check
  if (rawData['bot-field']) {
    return new Response(null, { status: 200 }); // Silently fail for bots
  }

  // Validate the data against the schema
  const validationResult = contactFormSchema.safeParse(rawData);

  if (!validationResult.success) {
    const errorMessages = validationResult.error.issues.map(issue => issue.message).join(', ');
    return new Response(JSON.stringify({ message: `Validation Error: ${errorMessages}` }), { status: 400 });
  }
  
  const { name, email, message } = validationResult.data;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Website Kontaktformular <onboarding@resend.dev>', // Replace with your verified domain
      to: [contactEmail],
      subject: `Neue Kontaktanfrage von ${name}`,
      reply_to: email,
      html: `
        <h1>Neue Kontaktanfrage</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error({ error });
      return new Response(
        JSON.stringify({ message: "Error sending email." }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet." }),
      { status: 200 }
    );
  } catch (exception) {
    console.error(exception);
    return new Response(
      JSON.stringify({ message: "An unexpected error occurred." }),
      { status: 500 }
    );
  }
};
```

## 4. Gotchas & Best Practices

*   **Server-Side Validation is Crucial:** Never trust data from the client. The client-side `required` attribute is for UX; the server-side Zod validation is for security and data integrity.
*   **API Keys are Secrets:** Your `RESEND_API_KEY` must *never* be exposed in client-side code. Using `import.meta.env` in a server-side API route is the correct and safe way to access it.
*   **Honeypot:** The hidden `bot-field` is a simple but effective technique to filter out basic bots. A bot will likely fill out all fields, including the hidden one. Our API route checks if this field has a value and, if so, exits without processing, preventing spam.
*   **Error Handling:** Provide clear feedback to the user on success, validation failure, or server error. The frontend script handles the JSON response from the API to do this.
*   **Debugging:** If the form isn't working on Vercel, check the serverless function logs. Go to your Vercel Project > Logs > select the `/api/contact` function to see `console.log` or error outputs.