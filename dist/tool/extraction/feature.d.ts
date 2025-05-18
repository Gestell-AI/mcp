import type Gestell from '@gestell/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
/**
 * Registers the "queryFeature" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export declare function registerQueryFeaturesTool(server: McpServer, gestell: Gestell): void;
/**
 * Registers the "exportFeature" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export declare function registerExportFeaturesTool(server: McpServer, gestell: Gestell): void;
