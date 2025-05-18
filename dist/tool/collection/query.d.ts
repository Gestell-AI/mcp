import type Gestell from '@gestell/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
/**
 * Registers the "getCollection" and "listCollections" tools on the MCP server.
 *
 * @param server - MCP server instance to register the tools on.
 * @param gestell - Gestell SDK instance.
 */
export declare function registerCollectionQueryTools(server: McpServer, gestell: Gestell): void;
