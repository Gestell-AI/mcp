import {
  GetCollectionRequestSchema,
  GetCollectionsRequestSchema
} from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers the "getCollection" and "listCollections" tools on the MCP server.
 *
 * @param server - MCP server instance to register the tools on.
 * @param gestell - Gestell SDK instance.
 */
export function registerCollectionQueryTools(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'getCollection',
    'Get a collection by its UUID',
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
    'listCollections',
    'List all collections you are a member of',
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
