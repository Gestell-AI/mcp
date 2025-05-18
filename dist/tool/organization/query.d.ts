import type Gestell from '@gestell/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
/**
 * Registers the "getOrganization" and "listOrganizations" tools on the MCP server.
 *
 * @param server - MCP server instance to register the tools on.
 * @param gestell - Gestell SDK instance.
 */
export declare function registerOrganizationQueryTools(server: McpServer, gestell: Gestell): void;
