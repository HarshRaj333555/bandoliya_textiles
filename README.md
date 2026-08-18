# Bandoliya Textiles

Premium multi-page website for Bandoliya Textiles, built with Next.js, React, TypeScript and Manrope.

## Before publishing

Update these verified business details in `lib/site.ts`:

- WhatsApp number (international digits only)
- Phone number
- Email address
- Street address
- Business hours
- Final website domain (`SITE_URL`)

Also replace the editable company-history and production-capacity placeholders when verified information is available.

## Local preview

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Push this folder to a Git repository, or import the folder through Vercel.
2. Vercel automatically detects Next.js from `vercel.json`.
3. Keep the default build command (`npm run build`) and publish.

No database, server secret or third-party account is required for the website itself. WhatsApp calls-to-action begin working after the placeholder number in `lib/site.ts` is replaced.

