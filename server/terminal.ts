import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { API_KEY, type GestellTerminalConfig } from '@server/config'
import buildMcpServer from '@server/mcp'

/**
 * Starts a local MCP server session using stdio transport.
 *
 * @param config - Configuration options for the terminal session.
 * @param config.apiKey - Your Gestell API key. Defaults to the `API_KEY` environment variable.
 * @returns A promise that resolves to an object containing:
 *   - `server`: An initialized and connected `McpServer` instance.
 *   - `transport`: A `StdioServerTransport` instance wired to the server.
 */
export default async function startTerminalSession(
  config: GestellTerminalConfig = { apiKey: API_KEY }
) {
  const { apiKey } = config
  const server: McpServer = buildMcpServer(apiKey)

  const transport = new StdioServerTransport()
  await server.connect(transport)

  return {
    server,
    transport
  }
}
