import { CollectionUpdateSchema } from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers the "updateCollection" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export function registerCollectionUpdateTool(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'updateCollection',
    CollectionUpdateSchema,
    async ({
      collectionId,
      organizationId,
      name,
      type,
      tags,
      description,
      instructions,
      graphInstructions,
      promptInstructions,
      searchInstructions
    }) => {
      const result = await gestell.collection.update({
        collectionId,
        organizationId,
        name,
        type,
        tags,
        description,
        instructions,
        graphInstructions,
        promptInstructions,
        searchInstructions
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
