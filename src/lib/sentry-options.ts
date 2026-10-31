// Shared Sentry options: errors only (no tracing, no session replay, no user info).
// The DSN is a public identifier; NEXT_PUBLIC_SENTRY_DSN overrides the fallback.
const FALLBACK_SENTRY_DSN =
  "https://1293f188c580b88775c0f46dff1a23b6@o4512352681525248.ingest.us.sentry.io/4512352686768128";

export const sentryOptions = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || FALLBACK_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV || process.env.NODE_ENV,
  // Only report from deployed builds, not local dev or tests.
  enabled: process.env.NODE_ENV === "production",
  tracesSampleRate: 0,
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpBodies: [],
  },
};
