import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { type GestellTerminalConfig } from '@server/config';
/**
 * Starts a local MCP server session using stdio transport.
 *
 * @param config - Configuration options for the terminal session.
 * @param config.apiKey - Your Gestell API key. Defaults to the `API_KEY` environment variable.
 * @returns A promise that resolves to an object containing:
 *   - `server`: An initialized and connected `McpServer` instance.
 *   - `transport`: A `StdioServerTransport` instance wired to the server.
 */
export default function startTerminalSession(config?: GestellTerminalConfig): Promise<{
    server: McpServer;
    transport: StdioServerTransport;
}>;
