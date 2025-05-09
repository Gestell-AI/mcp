import type { FastifyReply, FastifyRequest } from 'fastify'
import Fastify from 'fastify'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import {
  API_KEY,
  type GestellRemoteConfig,
  HOST,
  PORT,
  REMOTE_AUTH
} from '@server/config'
import buildMcpServer from '@server/mcp'

export const fastify = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  }
})

/**
 * Starts the Gestell MCP HTTP server, exposing an endpoint for remote MCP tool calls.
 *
 * @param config - Configuration options for the remote server.
 * @param config.apiKey - Your Gestell API key (defaults to `API_KEY` from env).
 * @param config.host   - Hostname or IP to bind the server to (defaults to `HOST` from env).
 * @param config.port   - Port number to listen on (defaults to `PORT` from env).
 * @param config.auth   - Optional bearer token required in the `Authorization` header.
 *                        If set, requests without a matching header will receive 401.
 * @returns A promise that resolves once the server is listening.
 */
export default async function startRemoteServer(
  config: GestellRemoteConfig = {
    apiKey: API_KEY,
    host: HOST,
    port: PORT,
    auth: REMOTE_AUTH
  }
): Promise<void> {
  const { apiKey, host, port, auth } = config

  fastify.post('/mcp', async (request: FastifyRequest, reply: FastifyReply) => {
    if (auth) {
      const authHeader = request.headers.authorization
      if (!authHeader || authHeader !== auth) {
        return reply.code(401).send({ error: 'Unauthorized' })
      }
    }

    const server: McpServer = buildMcpServer(apiKey)
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

  await fastify.listen({ host, port })
  fastify.log.info(`GESTELL MCP HTTP server running on ${host}:${port}`)
}
