import { GestellPromptSchema } from '@client/types'
import type Gestell from '@gestell/sdk'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Registers a "prompt" tool on the MCP server.
 *
 * @param server - MCP server instance to register the tool on.
 * @param gestell - Gestell SDK instance.
 */
export function registerCollectionPromptTool(
  server: McpServer,
  gestell: Gestell
): void {
  server.tool(
    'prompt',
    'Perform search based reasoning, and have the Gestell agent respond to a prompt',
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
      const response = await gestell.query.prompt({
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

      const stream = response.getReader()
      let text = ''

      while (true) {
        const { done, value } = await stream.read()
        if (done) break
        text += value
      }

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
