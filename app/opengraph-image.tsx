import { ImageResponse } from 'next/og'

export const alt = 'NYClaw.io — AI automation agency for Westchester County and NYC'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Dusk theme tokens from app/globals.css (--canvas, --brand-blue, --accent,
// --text-muted). No next/font or remote asset fetch — the sandbox blocks
// network access for next/font, and ImageResponse's default system font
// renders fine without one. Mark mirrors the header wordmark in
// app/components/SiteHeader.tsx (white square, "NY" in zinc-950).
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#09090b',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: '#ffffff',
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '-0.04em',
              color: '#09090b',
            }}
          >
            NY
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 40,
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            NYClaw<span style={{ color: '#71717a' }}>.io</span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 56,
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            maxWidth: '900px',
          }}
        >
          AI Automation Agency
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '32px',
            fontSize: 28,
            color: '#a1a1aa',
            textAlign: 'center',
          }}
        >
          Westchester County and NYC
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '48px',
            width: '96px',
            height: '4px',
            borderRadius: '2px',
            backgroundColor: '#22d3ee',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
