import { join } from 'path'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

/**
 * Launches the Gestell MCP client over stdio by spawning a Node.js process.
 *
 * @param entrypoint - Filesystem path to the compiled MCP server entrypoint script.
 *                      Defaults to the `dist/entry.js` file relative to this module.
 * @returns A Promise that resolves to a connected MCP `Client` instance ready to issue tool calls.
 */
export default async function startTerminalClient(
  entrypoint = join(import.meta.dir, '..', 'dist', 'entry.js')
) {
  const transport = new StdioClientTransport({
    command: 'node',
    args: [entrypoint]
  })

  const client = new Client({ name: 'Gestell Client', version: '1.0.0' })
  await client.connect(transport)
  return client
}
