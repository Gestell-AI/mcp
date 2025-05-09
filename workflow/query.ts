import { config } from 'dotenv'
import startTerminalClient from '@client/terminal'
import runTool from '@client/tool'
import type { Client } from '@modelcontextprotocol/sdk/client/index.js'

config()

const collectionId = process.env.GESTELL_COLLECTION_ID || ''
const client = (await startTerminalClient()) as Client

if (!collectionId) {
  console.error('Error: GESTELL_COLLECTION_ID must be set.')
  process.exit(1)
}

/**
 * Lists documents in the collection, then fetches each document's details.
 */
async function documentQueryFlow(): Promise<void> {
  const listPayload = await runTool<{
    result: { id: string; name: string }[]
  }>(client, 'listDocuments', {
    collectionId,
    search: undefined,
    skip: 0,
    take: 10,
    extended: false
  })

  console.log('Documents in collection:')
  for (const doc of listPayload.result) {
    console.log(doc)

    console.log('Querying document', doc.name)
    const getPayload = await runTool<unknown>(client, 'getDocument', {
      collectionId,
      documentId: doc.id
    })
    console.log(getPayload)
  }
}

/**
 * Lists collections in the organization, then fetches each collection's details.
 */
async function collectionQueryFlow(): Promise<void> {
  const listPayload = await runTool<{
    result: { id: string; name: string }[]
  }>(client, 'listCollections', { skip: 0, take: 10 })

  console.log('Collections in organization:')
  for (const coll of listPayload.result) {
    console.log(coll)

    console.log('Querying collection', coll.name)
    const getPayload = await runTool<unknown>(client, 'getCollection', {
      collectionId: coll.id
    })
    console.log(getPayload)
  }
}

async function main(): Promise<void> {
  await documentQueryFlow()
  await collectionQueryFlow()
}

main()
