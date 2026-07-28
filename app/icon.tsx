import { ImageResponse } from 'next/og'

/**
 * Favicon, generated from the wordmark rather than shipped as a binary.
 *
 * The site had no icon at all — /favicon.ico returned 404 in the browser,
 * which reads as unfinished in a tab or bookmark bar. This mirrors the header
 * logo mark in SiteHeader: white rounded square, "NY" in zinc-950.
 *
 * Next generates and caches this at build time; no asset to keep in sync.
 */
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: '-0.04em',
          background: '#ffffff',
          color: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 7,
        }}
      >
        NY
      </div>
    ),
    { ...size }
  )
}
