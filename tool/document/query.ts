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
    'Get a document from a collection by its UUID',
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

  server.tool(
    'listDocuments',
    'List documents in a collection',
    GetDocumentsRequestSchema,
    async (payload) => {
      const results = await gestell.document.list(payload)
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
