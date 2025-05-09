import {
  GetDocumentRequestSchema,
  GetDocumentsRequestSchema
} from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers the "getDocument" and "listDocuments" tools on the MCP server.
 *
 * @param server - MCP server instance to register the tools on.
 * @param gestell - Gestell SDK instance.
 */
export function registerDocumentQueryTools(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'getDocument',
    GetDocumentRequestSchema,
    async ({ collectionId, documentId }) => {
      const result = await gestell.document.get({ collectionId, documentId })
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

  server.tool('listDocuments', GetDocumentsRequestSchema, async (payload) => {
    const results = await gestell.document.list(payload)
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(results)
        }
      ]
    }
  })
}
