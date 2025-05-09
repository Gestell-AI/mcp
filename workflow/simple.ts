import { config } from 'dotenv'
import startTerminalClient from '@client/terminal'
import runTool from '@client/tool'

config()

const collectionId = process.env.GESTELL_COLLECTION_ID || ''
if (!collectionId) {
  console.error('Error: GESTELL_COLLECTION_ID must be set.')
  process.exit(1)
}

const client = await startTerminalClient()

const summary = await runTool<string>(
  client,
  'promptCollection', // or 'searchCollection'
  {
    collectionId,
    prompt: 'Give me a summary of the documents in this collection'
  }
)

console.log(summary)
