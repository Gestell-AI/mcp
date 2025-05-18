import {
  GetCollectionRequestSchema,
  GetCollectionsRequestSchema
} from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers the "collection.get" and "collection.list" tools on the MCP server.
 *
 * @param server - MCP server instance to register the tools on.
 * @param gestell - Gestell SDK instance.
 */
export function registerCollectionQueryTools(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'collection.get',
    GetCollectionRequestSchema,
    async ({ collectionId }) => {
      const result = await gestell.collection.get(collectionId)
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
    'collection.list',
    GetCollectionsRequestSchema,
    async (payload) => {
      const results = await gestell.collection.list(payload)
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
