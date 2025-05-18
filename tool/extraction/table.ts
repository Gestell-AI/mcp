import {
  ExportTableRequestSchema,
  TablesQueryRequestSchema
} from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers the "table.query" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export function registerQueryTablesTool(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'table.query',
    TablesQueryRequestSchema,
    async ({ collectionId, categoryId, skip, take }) => {
      const result = await gestell.query.table({
        collectionId,
        categoryId,
        skip,
        take
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

/**
 * Registers the "table.export" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export function registerExportTableTool(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'table.export',
    ExportTableRequestSchema,
    async ({ collectionId, categoryId, format }) => {
      const result = await gestell.query.tableExport({
        collectionId,
        categoryId,
        format
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
