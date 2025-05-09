import Fastify from 'fastify'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import {
  API_KEY,
  type GestellRemoteConfig,
  HOST,
  MODE,
  PORT
} from '@server/config'
import { buildMcpServer } from '@server/mcp'

export const fastify = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  }
})

/*
 * Starts the Gestell MCP HTTP server
 * Configure the exposed PORT in a terminal session or using an .env file
 */
export default async function startRemoteServer(
  config: GestellRemoteConfig = {
    apiKey: API_KEY,
    host: HOST,
    port: PORT,
    mode: MODE
  }
) {
  const { apiKey, host, port, mode } = config

  fastify.post('/mcp', async (request, reply) => {
    const server: McpServer = buildMcpServer(mode, apiKey)
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined
    })

    reply.raw.on('close', () => {
      transport.close()
      server.close()
    })

    await server.connect(transport)
    await transport.handleRequest(
      request.raw,
      reply.raw,
      request.body as Record<string, unknown>
    )
  })

  await fastify.listen({ port, host })
  fastify.log.info(`GESTELL MCP HTTP server running on :${PORT}`)
  console.log(`GESTELL MCP HTTP server running on :${PORT}`.green.bold)
}
