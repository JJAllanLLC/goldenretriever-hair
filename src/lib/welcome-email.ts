/**
 * Welcome email content for new newsletter subscribers.
 * Personal tone, app tease (photo contests & prizes), giveaway hint. No affiliates. Mobile-friendly HTML.
 */

export const WELCOME_EMAIL_SUBJECT = "Welcome to GoldenRetriever.hair!";

export function getWelcomeEmailHtml(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${WELCOME_EMAIL_SUBJECT}</title>
  <style type="text/css">
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; }
    .wrap { max-width: 100%; width: 100%; min-width: 0; }
    a { color: #b45309; text-decoration: underline; }
    @media screen and (max-width: 600px) {
      .container { padding: 16px !important; }
      .title { font-size: 20px !important; }
      .text { font-size: 15px !important; line-height: 1.5 !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fffbeb; color: #1f2937;">
  <div class="wrap">
    <div class="container" style="max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 class="title" style="color: #b45309; font-size: 24px; margin: 0;">GoldenRetriever.hair</h1>
      </div>
      <p class="text" style="font-size: 16px; line-height: 1.6;">Hi there,</p>
      <p class="text" style="font-size: 16px; line-height: 1.6;">Thanks for signing up — you're in the right place. GoldenRetriever.hair is your one-stop for everything Golden: guides, health tips, training, and real-world advice from people who live with Goldens.</p>
      <p class="text" style="font-size: 16px; line-height: 1.6;">We're building something fun for Golden lovers: our upcoming <strong>Golden Mobile App</strong> will be perfect for sharing photos and entering fun contests with prizes. Giveaways (including a custom mug with your Golden's photo) are coming — stay on this list so you don't miss out.</p>
      <p class="text" style="font-size: 16px; line-height: 1.6;">In the meantime, explore the site: <a href="https://goldenretriever.hair/guides">Guides</a>, <a href="https://goldenretriever.hair/products">Products</a>, and the <a href="https://goldenretriever.hair/blog">Blog</a>.</p>
      <p class="text" style="font-size: 16px; line-height: 1.6;">No spam — just Golden love and useful updates. Unsubscribe anytime.</p>
      <p class="text" style="font-size: 16px; line-height: 1.6;">🐾<br>The GoldenRetriever.hair team</p>
      <p style="font-size: 12px; color: #6b7280; margin-top: 32px;">GoldenRetriever.hair is part of the JJ Allan LLC portfolio. We are not veterinarians; always consult your vet for health decisions.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
