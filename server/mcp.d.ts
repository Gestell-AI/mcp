import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
/**
 * Creates and configures a Gestell MCP server with all available tools registered.
 *
 * @param key - Your Gestell API key. Defaults to the `GESTELL_API_KEY` environment variable.
 * @returns A fully initialized `McpServer` instance with search, prompt, collection,
 *          document, and extraction tools loaded.
 */
export default function buildMcpServer(key?: string): McpServer;
