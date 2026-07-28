/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      // Security headers on all routes
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Defense-in-depth. No external scripts/images/fonts/XHR —
          // fonts via next/font, images local/data. Next.js App Router
          // injects many inline <script> tags for Flight/RSC hydration;
          // script-src must allow 'unsafe-inline' or the page renders
          // blank (CSP blocks boot). style-src needs 'unsafe-inline'
          // for React style="" attributes (e.g. animationDelay).
          // Stronger nonce-based CSP can replace this later via middleware.
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              // Hero background video is self-hosted in /public. Without an
              // explicit media-src it falls back to default-src and, while
              // 'self' would still pass, being explicit documents that no
              // third-party media (e.g. hotlinked stock footage) is permitted.
              "media-src 'self'",
              "font-src 'self'",
              "connect-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
      // CORS: restrict API routes to same origin (no wildcard)
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nyclaw.io',
          },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ]
  },
}

export default nextConfig
