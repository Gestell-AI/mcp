import type Gestell from '@gestell/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
/**
 * Registers the "exportDocument" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export declare function registerExportDocumentTool(server: McpServer, gestell: Gestell): void;
