import { CollectionCreateSchema } from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers the "createCollection" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export function registerCollectionCreateTool(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'createCollection',
    CollectionCreateSchema,
    async ({
      organizationId,
      name,
      type,
      tags,
      description,
      instructions,
      graphInstructions,
      promptInstructions,
      searchInstructions,
      categories
    }) => {
      const result = await gestell.collection.create({
        organizationId,
        name,
        type,
        tags,
        description,
        instructions,
        graphInstructions,
        promptInstructions,
        searchInstructions,
        categories
      })

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
}
