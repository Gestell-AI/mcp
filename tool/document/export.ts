import { ExportDocumentRequestSchema } from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers the "document.export" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export function registerExportDocumentTool(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'document.export',
    ExportDocumentRequestSchema,
    async ({ collectionId, documentId, type }) => {
      const result = await gestell.document.export({
        collectionId,
        documentId,
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
