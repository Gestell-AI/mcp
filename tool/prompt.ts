import { GestellPromptSchema } from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers a "promptCollection" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export function registerCollectionPromptTool(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'promptCollection',
    GestellPromptSchema,
    async ({
      collectionId,
      categoryId,
      prompt,
      method,
      type,
      vectorDepth,
      nodeDepth,
      maxQueries,
      maxResults,
      template,
      cot,
      messages
    }) => {
      const stream = await gestell.query.prompt({
        collectionId,
        categoryId,
        prompt,
        method,
        type,
        vectorDepth,
        nodeDepth,
        maxQueries,
        maxResults,
        template,
        cot,
        messages
      })

      const text = await new Response(stream).text()

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(text)
          }
        ]
      }
    }
  )
}
