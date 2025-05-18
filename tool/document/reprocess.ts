import { ReprocessDocumentsRequestSchema } from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers a "reprocessDocument" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export function registerReprocessDocumentsTool(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'reprocessDocument',
    'Reprocess documents in a collection by their UUIDs',
    ReprocessDocumentsRequestSchema,
    async ({ collectionId, ids, type }) => {
      const result = await gestell.job.reprocess({
        collectionId,
        ids,
        type
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
