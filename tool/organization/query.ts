import {
  GetOrganizationRequestSchema,
  GetOrganizationsRequestSchema
} from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers the "getOrganization" and "listOrganizations" tools on the MCP server.
 *
 * @param server - MCP server instance to register the tools on.
 * @param gestell - Gestell SDK instance.
 */
export function registerOrganizationQueryTools(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'getOrganization',
    'Get an organization by its UUID',
    GetOrganizationRequestSchema,
    async ({ organizationId }) => {
      const result = await gestell.organization.get(organizationId)
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result)
          }
        ]
      }
    }
  )

  server.tool(
    'listOrganizations',
    'List all organizations you are a member of',
    GetOrganizationsRequestSchema,
    async (payload) => {
      const results = await gestell.organization.list(payload)
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(results)
          }
        ]
      }
    }
  )
}
