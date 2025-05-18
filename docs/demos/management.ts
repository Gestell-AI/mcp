import { config } from 'dotenv'
import { join } from 'path'
import startTerminalClient from '@client/terminal'
import runTool from '@client/tool'
import type { Client } from '@modelcontextprotocol/sdk/client/index.js'

config()

const targetFile = join(import.meta.dir, 'samples', 'good.fellas.pdf')

const organizationId = process.env.GESTELL_ORGANIZATION_ID || ''
if (!organizationId) {
  console.error('Error: GESTELL_ORGANIZATION_ID must be set.')
  process.exit(1)
}

const client = (await startTerminalClient()) as Client

/**
 * Creates a new collection and returns its ID.
 *
 * @returns The ID of the newly created collection.
 */
export async function createCollectionFlow(): Promise<string> {
  const payload = await runTool<{ id: string }>(client, 'createCollection', {
    organizationId,
    name: 'MCP Generated Collection',
    type: 'canon',
    tags: ['mcp'],
    description: 'A brief description of this collection',
    instructions: 'Top-level instructions for tooling',
    graphInstructions: 'Instructions for graph building',
    promptInstructions: 'Instructions to guide prompting',
    searchInstructions: 'Instructions to guide search behavior',
    categories: []
  })
  console.log('Created Collection:', JSON.stringify(payload))
  return payload.id
}

/**
 * Uploads a PDF document to the specified collection.
 *
 * @param collectionId - The ID of the collection to upload into.
 * @returns The ID of the uploaded document.
 */
export async function uploadDocumentFlow(
  collectionId: string
): Promise<string> {
  const payload = await runTool<{ id: string }>(client, 'uploadDocument', {
    collectionId,
    name: 'good.fellas.pdf',
    type: 'application/pdf',
    file: targetFile,
    job: false,
    tables: false
  })
  console.log('Uploaded Document:', JSON.stringify(payload))
  return payload.id
}

/**
 * Updates the name of an existing document in the specified collection.
 *
 * @param collectionId - The ID of the collection containing the document.
 * @param documentId   - The ID of the document to update.
 */
export async function updateDocumentFlow(
  collectionId: string,
  documentId: string
): Promise<void> {
  const result = await runTool<unknown>(client, 'updateDocument', {
    collectionId,
    documentId,
    name: 'good-fellas-updated.pdf'
  })
  console.log('Updated Document:', JSON.stringify(result))
}

/**
 * Reprocesses one or more documents in the specified collection.
 *
 * @param collectionId - The ID of the collection containing the documents.
 * @param ids          - Array of document IDs to reprocess.
 * @param type         - The type of job to dispatch ('status', 'nodes', 'vectors', 'edges', 'category').
 */
export async function reprocessDocumentsFlow(
  collectionId: string,
  ids: string[],
  type: 'status' | 'nodes' | 'vectors' | 'edges' | 'category'
): Promise<void> {
  const result = await runTool<unknown>(client, 'reprocessDocuments', {
    collectionId,
    ids,
    type
  })
  console.log('Reprocess Job Result:', JSON.stringify(result))
}

/**
 * Deletes a document from the specified collection.
 *
 * @param collectionId - The ID of the collection containing the document.
 * @param documentId   - The ID of the document to delete.
 */
export async function deleteDocumentFlow(
  collectionId: string,
  documentId: string
): Promise<void> {
  const result = await runTool<unknown>(client, 'deleteDocument', {
    collectionId,
    documentId
  })
  console.log('Delete Document Result:', JSON.stringify(result))
}

async function main(): Promise<void> {
  try {
    const collectionId = await createCollectionFlow()
    const documentId = await uploadDocumentFlow(collectionId)
    console.log('Document ID:', documentId)

    // Now rename the document
    await updateDocumentFlow(collectionId, documentId)
  } catch (err) {
    console.error('Workflow error:', err)
    process.exit(1)
  }
}

main()
