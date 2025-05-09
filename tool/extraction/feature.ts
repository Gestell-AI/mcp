import {
  ExportFeaturesRequestSchema,
  FeaturesQueryRequestSchema
} from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers the "queryFeatures" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export function registerQueryFeaturesTool(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'queryFeatures',
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
 * Registers the "exportFeatures" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export function registerExportFeaturesTool(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'exportFeatures',
    ExportFeaturesRequestSchema,
    async ({ collectionId, categoryId, type }) => {
      const result = await gestell.query.featuresExport({
        collectionId,
        categoryId,
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
