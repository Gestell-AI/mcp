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
 * Starts the Gestell MCP HTTP server.
 *
 * @param config - Configuration options for the remote server.
 */
export default async function startRemoteServer(
  config: GestellRemoteConfig = {
    apiKey: API_KEY,
    host: HOST,
    port: PORT
  }
): Promise<void> {
  const { apiKey, host, port } = config

  fastify.post('/mcp', async (request: FastifyRequest, reply: FastifyReply) => {
    if (REMOTE_AUTH) {
      const authHeader = request.headers.authorization
      if (!authHeader || authHeader !== REMOTE_AUTH) {
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
