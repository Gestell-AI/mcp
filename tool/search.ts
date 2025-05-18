import { GestellSearchSchema } from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers a "searchCollection" tool on an MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export function registerCollectionSearchTool(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'searchCollection',
    'Perform search based reasoning over a Collection',
    GestellSearchSchema,
    async ({
      collectionId,
      categoryId,
      prompt,
      method,
      type,
      vectorDepth,
      nodeDepth,
      maxQueries,
      maxResults,
      includeContent,
      includeEdges
    }) => {
      const payload = await gestell.query.search({
        collectionId,
        categoryId,
        prompt,
        method,
        type,
        vectorDepth,
        nodeDepth,
        maxQueries,
        maxResults,
        includeContent,
        includeEdges
      })

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(payload)
          }
        ]
      }
    }
  )
}
