import type Gestell from '@gestell/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
/**
 * Registers a "search" tool on an MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export declare function registerCollectionSearchTool(server: McpServer, gestell: Gestell): void;
