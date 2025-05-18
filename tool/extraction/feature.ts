import {
  ExportFeaturesRequestSchema,
  FeaturesQueryRequestSchema
} from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers the "queryFeature" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export function registerQueryFeaturesTool(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'queryFeature',
    'Query features from a category in a collection',
    FeaturesQueryRequestSchema,
    async ({ collectionId, categoryId, skip, take }) => {
      const result = await gestell.query.features({
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
 * Registers the "exportFeature" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export function registerExportFeaturesTool(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'exportFeature',
    'Export features from a category in a collection to json or csv',
    ExportFeaturesRequestSchema,
    async ({ collectionId, categoryId, format }) => {
      const result = await gestell.query.featuresExport({
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
