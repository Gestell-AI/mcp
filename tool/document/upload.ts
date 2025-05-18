import { UploadDocumentRequestSchema } from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers the "uploadDocument" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export function registerUploadDocumentTool(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'uploadDocument',
    'Upload and create a document in a collection',
    UploadDocumentRequestSchema,
    async ({ collectionId, name, type, file, instructions, job, tables }) => {
      const result = await gestell.document.upload({
        collectionId,
        name,
        type,
        file,
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
