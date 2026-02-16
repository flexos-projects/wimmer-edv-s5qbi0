```ts
import type { APIRoute } from 'astro';

// A simple email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Handles POST requests from the website's contact form.
 * This function validates the submitted data, checks for spam,
 * and sends a formatted email notification.
 * It is designed to run as a Vercel serverless function.
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const company = formData.get('company')?.toString().trim(); // Optional field
    const message = formData.get('message')?.toString().trim();
    const honeypot = formData.get('honeypot')?.toString();

    // 1. Honeypot check for spam. If this field is filled,
    // it's likely a bot. We'll pretend it was successful.
    if (honeypot) {
      return new Response(
        JSON.stringify({ message: "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet." }),
        { status: 200 }
      );
    }

    // 2. Validate the required fields.
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "Name, E-Mail und Nachricht sind Pflichtfelder." }),
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ message: "Bitte geben Sie eine gültige E-Mail-Adresse an." }),
        { status: 400 }
      );
    }

    // 3. Prepare data for the email notification.
    const subject = `Neue Kontaktanfrage von ${name}`;
    const textContent = `
      Neue Anfrage über das Kontaktformular von wimmer-edv.at:
      
      Name: ${name}
      E-Mail: ${email}
      Firma: ${company || 'Nicht angegeben'}
      
      Nachricht:
      ${message}
    `;

    const htmlContent = `
      <html>
        <body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1A202C;">
          <h2 style="color: #2D3748;">Neue Kontaktanfrage</h2>
          <p>Sie haben eine neue Anfrage über das Kontaktformular Ihrer Webseite erhalten.</p>
          <hr style="border: 0; border-top: 1px solid #E2E8F0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> <a href="mailto:${email}" style="color: #446E9B;">${email}</a></p>
          <p><strong>Firma:</strong> ${company || 'Nicht angegeben'}</p>
          <p><strong>Nachricht:</strong></p>
          <div style="background-color: #F7FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px;">
            <p style="margin: 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #E2E8F0;">
          <p style="font-size: 0.8em; color: #718096;">Diese E-Mail wurde automatisch von wimmer-edv.at gesendet.</p>
        </body>
      </html>
    `;
    
    // 4. Retrieve email configuration from environment variables.
    // These must be set in the Vercel project environment settings.
    const apiKey = import.meta.env.RESEND_API_KEY;
    const toEmail = import.meta.env.CONTACT_FORM_TO_EMAIL;
    const fromEmail = import.meta.env.CONTACT_FORM_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.error("Server Configuration Error: Missing required environment variables for sending email.");
      return new Response(
        JSON.stringify({ message: "Server-Konfigurationsfehler. Bitte kontaktieren Sie uns direkt." }),
        { status: 500 }
      );
    }

    // 5. Send the email using an email service provider (e.g., Resend).
    // In a real project, you would typically use the `resend` SDK, but `fetch` is also viable.
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `Wimmer EDV Webseite <${fromEmail}>`,
        to: toEmail,
        reply_to: email,
        subject: subject,
        text: textContent,
        html: htmlContent,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error('Failed to send email:', errorData);
      return new Response(
        JSON.stringify({ message: "Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut." }),
        { status: 500 }
      );
    }
    
    // 6. Return a success response to the client.
    return new Response(
      JSON.stringify({ message: "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet." }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in contact form API route:', error);
    return new Response(
      JSON.stringify({ message: "Ein unerwarteter Fehler ist aufgetreten. Bitte kontaktieren Sie uns direkt per Telefon oder E-Mail." }),
      { status: 500 }
    );
  }
};
```