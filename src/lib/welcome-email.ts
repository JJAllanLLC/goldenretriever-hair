/**
 * Welcome email content for new newsletter subscribers.
 * Subject and HTML body — personal tone, JJ greeting, site intro, app tease, Products teaser, disclaimer.
 */

export const WELCOME_EMAIL_SUBJECT = "Welcome to GoldenRetriever.hair!";

export function getWelcomeEmailHtml(): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${WELCOME_EMAIL_SUBJECT}</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fffbeb; color: #1f2937;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
    <div style="text-align: center; margin-bottom: 24px;">
      <h1 style="color: #b45309; font-size: 24px; margin: 0;">GoldenRetriever.hair</h1>
    </div>
    <p style="font-size: 16px; line-height: 1.6;">Hi there,</p>
    <p style="font-size: 16px; line-height: 1.6;">Thanks for signing up — you're in the right place. GoldenRetriever.hair is your one-stop for everything Golden: guides, health tips, training, and hand-picked products we actually use with our own Goldens.</p>
    <p style="font-size: 16px; line-height: 1.6;">We're building something fun for Golden lovers: our upcoming <strong>Golden Mobile App</strong> will be perfect for sharing photos, entering fun contests with prizes, and celebrating daily life with your Golden. Giveaways and more are coming — stay on this list so you don't miss out.</p>
    <p style="font-size: 16px; line-height: 1.6;">In the meantime, explore the site: <a href="https://goldenretriever.hair/guides" style="color: #b45309;">Guides</a>, <a href="https://goldenretriever.hair/products" style="color: #b45309;">Products</a>, and the <a href="https://goldenretriever.hair/blog" style="color: #b45309;">Blog</a> are full of practical, real-world advice.</p>
    <p style="font-size: 16px; line-height: 1.6;">No spam — just Golden love and useful updates. Unsubscribe anytime.</p>
    <p style="font-size: 16px; line-height: 1.6;">🐾<br>The GoldenRetriever.hair team</p>
    <p style="font-size: 12px; color: #6b7280; margin-top: 32px;">GoldenRetriever.hair is part of the JJ Allan LLC portfolio. We are not veterinarians; always consult your vet for health decisions.</p>
  </div>
</body>
</html>
  `.trim();
}
