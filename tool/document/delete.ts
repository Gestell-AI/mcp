import { DeleteDocumentRequestSchema } from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers a "document.delete" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export function registerDeleteDocumentTool(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'document.delete',
    'Delete a document from a collection',
    DeleteDocumentRequestSchema,
    async ({ collectionId, documentId }) => {
      const result = await gestell.document.delete({
        collectionId,
        documentId
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
