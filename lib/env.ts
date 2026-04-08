/**
 * Validate required environment variables at startup.
 * Add to REQUIRED_ENV_VARS as the app adds integrations
 * (e.g. CONVERTKIT_API_KEY, DATABASE_URL, etc.)
 */
const REQUIRED_ENV_VARS: string[] = [
  // Example: 'CONVERTKIT_API_KEY',
]

export function validateEnv(): void {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key])
  if (missing.length > 0) {
    const list = missing.map((k) => `  - ${k}`).join('\n')
    throw new Error(`Missing required environment variables:\n${list}`)
  }
}
