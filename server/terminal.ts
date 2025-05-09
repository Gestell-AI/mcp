import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { API_KEY, type GestellTerminalConfig, MODE } from '@server/config'
import { buildMcpServer } from '@server/mcp'

export default async function startTerminalSession(
  config: GestellTerminalConfig = { apiKey: API_KEY, mode: MODE }
) {
  const { apiKey, mode } = config
  const server: McpServer = buildMcpServer(mode, apiKey)

  const transport = new StdioServerTransport()
  await server.connect(transport)

  return {
    server,
    transport
  }
}
