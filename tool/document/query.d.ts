import type Gestell from '@gestell/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
/**
 * Registers the "document.get" and "document.list" tools on the MCP server.
 *
 * @param server - MCP server instance to register the tools on.
 * @param gestell - Gestell SDK instance.
 */
export declare function registerDocumentQueryTools(server: McpServer, gestell: Gestell): void;
