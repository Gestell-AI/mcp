import { config } from 'dotenv'
import startTerminalClient from '@client/terminal'
import runTool from '@client/tool'
import type { Client } from '@modelcontextprotocol/sdk/client/index.js'

config()

const collectionId = process.env.GESTELL_COLLECTION_ID || ''
const featureCategoryId = process.env.GESTELL_CATEGORY_FEATURE || ''
const tableCategoryId = process.env.GESTELL_CATEGORY_TABLE || ''

const skip = 0
const take = 10
const exportType = 'json'

if (!collectionId || !featureCategoryId || !tableCategoryId) {
  console.error(
    'Error: GESTELL_COLLECTION_ID, GESTELL_CATEGORY_FEATURE, and GESTELL_CATEGORY_TABLE must all be set.'
  )
  process.exit(1)
}

const client = (await startTerminalClient()) as Client

/**
 * Queries features from the specified collection/category and then exports them.
 */
export async function queryFeaturesFlow(): Promise<void> {
  const features = await runTool<unknown[]>(client, 'queryFeatures', {
    collectionId,
    categoryId: featureCategoryId,
    skip,
    take
  })
  console.log('Features Query Result:')
  console.log(JSON.stringify(features, null, 2))

  const exportFeatures = await runTool<unknown[]>(client, 'exportFeatures', {
    collectionId,
    categoryId: featureCategoryId,
    type: exportType
  })
  console.log('Features Export Result:')
  console.log(JSON.stringify(exportFeatures, null, 2))
}

/**
 * Queries tables from the specified collection/category and then exports them.
 */
export async function queryTablesFlow(): Promise<void> {
  const tables = await runTool<unknown[]>(client, 'queryTables', {
    collectionId,
    categoryId: tableCategoryId,
    skip,
    take
  })
  console.log('Tables Query Result:')
  console.log(JSON.stringify(tables, null, 2))

  const exportTables = await runTool<unknown[]>(client, 'exportTable', {
    collectionId,
    categoryId: tableCategoryId,
    type: exportType
  })
  console.log('Tables Export Result:')
  console.log(JSON.stringify(exportTables, null, 2))
}

async function main(): Promise<void> {
  await queryFeaturesFlow()
  await queryTablesFlow()
}

main()
