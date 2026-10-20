/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL for a custom domain.
 * On Vercel the production hostname is used automatically.
 */
export const siteUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
