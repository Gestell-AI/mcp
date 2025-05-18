import type Gestell from '@gestell/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
/**
 * Registers the "queryTable" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export declare function registerQueryTablesTool(server: McpServer, gestell: Gestell): void;
/**
 * Registers the "exportTable" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export declare function registerExportTableTool(server: McpServer, gestell: Gestell): void;
