import { UpdateDocumentRequestSchema } from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers an "updateDocument" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export function registerUpdateDocumentTool(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'updateDocument',
    'Update a document in a collection',
    UpdateDocumentRequestSchema,
    async ({ collectionId, documentId, name, instructions, job, tables }) => {
      const result = await gestell.document.update({
        collectionId,
        documentId,
        name,
        instructions,
        job,
        tables
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
