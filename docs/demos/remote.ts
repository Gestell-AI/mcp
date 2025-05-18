import { config } from 'dotenv'
import runTool from '@client/tool'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import {
  StreamableHTTPClientTransport,
  type StreamableHTTPClientTransportOptions
} from '@modelcontextprotocol/sdk/client/streamableHttp.js'

config()

const COLLECTION_ID = process.env.GESTELL_COLLECTION_ID || ''
const REMOTE_AUTH = process.env.GESTELL_REMOTE_AUTH || ''
const endpoint = 'http://localhost:3000/mcp'

if (!COLLECTION_ID) {
  console.error('Error: GESTELL_COLLECTION_ID must be set.')
  process.exit(1)
}

/**
 * Starts a Gestell MCP HTTP client connected to the remote server.
 * If GESTELL_REMOTE_AUTH is set, includes it as the Authorization header.
 */
export async function startRemoteClient(): Promise<Client> {
  const url = new URL(endpoint)
  const transportOptions: StreamableHTTPClientTransportOptions = {}

  if (REMOTE_AUTH) {
    transportOptions.requestInit = {
      headers: {
        Authorization: REMOTE_AUTH
      }
    }
  }

  const transport = new StreamableHTTPClientTransport(url, transportOptions)
  const client = new Client({ name: 'Gestell Remote Client', version: '1.0.0' })
  await client.connect(transport)
  return client
}

async function main() {
  const client = await startRemoteClient()
  const summary = await runTool<string>(client, 'promptCollection', {
    collectionId: COLLECTION_ID,
    prompt: 'Give me a summary of the documents in this collection'
  })

  console.log(summary)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
