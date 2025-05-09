import { join } from 'path'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

export default async function startTerminalClient(
  entrypoint = join(import.meta.dir, '..', 'dist', 'entry.js')
) {
  const transport = new StdioClientTransport({
    command: 'bun',
    args: ['run', entrypoint]
  })

  const client = new Client({ name: 'Gestell Client', version: '1.0.0' })
  await client.connect(transport)
  return client
}
