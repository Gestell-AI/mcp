import { Gestell } from '@gestell/sdk'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { Modality } from '@server/config'
import { registerCollectionCreateTool } from '@tool/collection/create'
import { registerCollectionQueryTools } from '@tool/collection/query'
import { registerCollectionUpdateTool } from '@tool/collection/update'
import { registerDeleteDocumentTool } from '@tool/document/delete'
import { registerExportDocumentTool } from '@tool/document/export'
import { registerDocumentQueryTools } from '@tool/document/query'
import { registerReprocessDocumentsTool } from '@tool/document/reprocess'
import { registerUpdateDocumentTool } from '@tool/document/update'
import { registerUploadDocumentTool } from '@tool/document/upload'
import {
  registerExportFeaturesTool,
  registerQueryFeaturesTool
} from '@tool/extraction/feature'
import {
  registerExportTableTool,
  registerQueryTablesTool
} from '@tool/extraction/table'
import { registerCollectionPromptTool } from '@tool/prompt'
import { registerCollectionSearchTool } from '@tool/search'

/*
 * Gestell core MCP server instance loads all resources based on configured modality (SIMPLE or ADVANCED)
 */
export function buildMcpServer(
  mode: Modality = 'SIMPLE',
  key: string = process.env.GESTELL_API_KEY || ''
): McpServer {
  const gestell = new Gestell({ key })
  const server = new McpServer({ name: 'Gestell', version: '1.0.0' })

  // Simple Tools
  registerCollectionSearchTool(server, gestell)
  registerCollectionPromptTool(server, gestell)

  if (mode === 'ADVANCED') {
    // Collection Tools
    registerCollectionQueryTools(server, gestell)
    registerCollectionCreateTool(server, gestell)
    registerCollectionUpdateTool(server, gestell)

    // Document Tools
    registerDocumentQueryTools(server, gestell)
    registerUpdateDocumentTool(server, gestell)
    registerUploadDocumentTool(server, gestell)
    registerDeleteDocumentTool(server, gestell)
    registerReprocessDocumentsTool(server, gestell)
    registerExportDocumentTool(server, gestell)

    // Extraction Tools
    registerQueryFeaturesTool(server, gestell)
    registerExportFeaturesTool(server, gestell)
    registerQueryTablesTool(server, gestell)
    registerExportTableTool(server, gestell)
  }

  return server
}
