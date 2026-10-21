import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { createContractorServer } from '../../../../lib/contractors/server'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
function permitted(request: Request) {
  const url = new URL(request.url)
  const hosts = new Set(['nyclaw.io', 'www.nyclaw.io'])
  if (process.env.VERCEL_URL) hosts.add(process.env.VERCEL_URL)
  if (process.env.NODE_ENV !== 'production') {
    hosts.add('127.0.0.1:3104'); hosts.add('localhost:3104'); hosts.add('localhost:3000')
  }
  const origin = request.headers.get('origin')
  return hosts.has(url.host) && (!origin || ['https://chatgpt.com', 'https://chat.openai.com', 'https://nyclaw.io'].includes(origin) ||
    (process.env.NODE_ENV !== 'production' && origin === url.origin))
}
export async function POST(request: Request) {
  if (!permitted(request)) return Response.json({ error: 'Untrusted origin or host' }, { status: 403 })
  const server = createContractorServer()
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true, maxRequestBodySize: 8192 })
  await server.connect(transport)
  try {
    const response = await transport.handleRequest(request)
    response.headers.set('Cache-Control', 'no-store')
    return response
  } finally { await server.close() }
}
export function GET() { return Response.json({ error: 'Use MCP Streamable HTTP POST.' }, { status: 405, headers: { Allow: 'POST', 'Cache-Control': 'no-store' } }) }
export const DELETE = GET
