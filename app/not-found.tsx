import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md px-6">
        <div className="text-8xl font-bold text-navy mb-2">404</div>
        <h1 className="text-2xl font-semibold text-charcoal mb-4">Page not found</h1>
        <p className="text-charcoal/70 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link href="/" className="btn-primary px-6 py-3 text-sm">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
