import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'
import {
  CollectionCreateSchema,
  CollectionUpdateSchema,
  GetCollectionRequestSchema,
  GetCollectionsRequestSchema
} from '@client/schemas/collection'
import {
  DeleteDocumentRequestSchema,
  ExportDocumentRequestSchema,
  GetDocumentRequestSchema,
  GetDocumentsRequestSchema,
  ReprocessDocumentsRequestSchema,
  UpdateDocumentRequestSchema,
  UploadDocumentRequestSchema
} from '@client/schemas/document'
import {
  ExportFeaturesRequestSchema,
  FeaturesQueryRequestSchema
} from '@client/schemas/feature'
import { createCollectionResponseSchema } from '@client/schemas/sdk/collection/create.zod'
import { getCollectionResponseSchema } from '@client/schemas/sdk/collection/get.zod'
import { getCollectionsResponseSchema } from '@client/schemas/sdk/collection/list.zod'
import { updateCollectionResponseSchema } from '@client/schemas/sdk/collection/update.zod'
import { createDocumentResponseSchema } from '@client/schemas/sdk/document/create.zod'
import { deleteDocumentResponseSchema } from '@client/schemas/sdk/document/delete.zod'
import { exportDocumentResponseSchema } from '@client/schemas/sdk/document/export.zod'
import { getDocumentResponseSchema } from '@client/schemas/sdk/document/get.zod'
import { getDocumentsResponseSchema } from '@client/schemas/sdk/document/list.zod'
import { reprocessDocumentsResponseSchema } from '@client/schemas/sdk/document/reprocess.zod'
import { updateDocumentResponseSchema } from '@client/schemas/sdk/document/update.zod'
import { featuresQueryResponseSchema } from '@client/schemas/sdk/extraction/features.zod'
import { exportFeaturesResponseSchema } from '@client/schemas/sdk/extraction/features-export.zod'
import { tablesQueryResponseSchema } from '@client/schemas/sdk/extraction/table.zod'
import { exportTableResponseSchema } from '@client/schemas/sdk/extraction/table-export.zod'
import {
  promptQueryResponseSchema,
  searchQueryResponseSchema
} from '@client/schemas/sdk/query/search.zod'
import {
  GestellPromptSchema,
  GestellSearchSchema
} from '@client/schemas/search'
import {
  ExportTableRequestSchema,
  TablesQueryRequestSchema
} from '@client/schemas/table'

async function generateInputSchemas() {
  console.log('Generating input schemas')
  const outputDir = join(process.cwd(), 'client', 'artifacts')

  const schemas = {
    collection: {
      create: CollectionCreateSchema,
      update: CollectionUpdateSchema,
      id: GetCollectionRequestSchema,
      list: GetCollectionsRequestSchema
    },
    document: {
      create: UploadDocumentRequestSchema,
      update: UpdateDocumentRequestSchema,
      id: GetDocumentRequestSchema,
      list: GetDocumentsRequestSchema,
      delete: DeleteDocumentRequestSchema,
      reprocess: ReprocessDocumentsRequestSchema,
      export: ExportDocumentRequestSchema
    },
    feature: {
      export: ExportFeaturesRequestSchema,
      query: FeaturesQueryRequestSchema
    },
    search: {
      prompt: GestellPromptSchema,
      search: GestellSearchSchema
    },
    table: {
      export: ExportTableRequestSchema,
      query: TablesQueryRequestSchema
    }
  }

  for (const [entity, ops] of Object.entries(schemas)) {
    const entityDir = join(outputDir, entity)
    mkdirSync(entityDir, { recursive: true })
    console.log(`Generating schemas for ${entity}`)

    for (const [operation, schema] of Object.entries(ops)) {
      const schemaType = z.object(schema)
      const jsonSchema = zodToJsonSchema(schemaType, `${entity}.${operation}`)
      const fileName = `${operation}.json`
      const filePath = join(entityDir, fileName)

      writeFileSync(filePath, JSON.stringify(jsonSchema, null, 2))
      console.log(`Written schema to ${filePath}`)
    }
  }
  console.log('Completed input schema generation')
}

async function generateOutputSchemas() {
  console.log('Generating output schemas')
  const outputDir = join(process.cwd(), 'client', 'artifacts', 'output')

  const schemas = {
    collection: {
      create: createCollectionResponseSchema,
      update: updateCollectionResponseSchema,
      id: getCollectionResponseSchema,
      list: getCollectionsResponseSchema
    },
    document: {
      create: createDocumentResponseSchema,
      update: updateDocumentResponseSchema,
      id: getDocumentResponseSchema,
      list: getDocumentsResponseSchema,
      delete: deleteDocumentResponseSchema,
      reprocess: reprocessDocumentsResponseSchema,
      export: exportDocumentResponseSchema
    },
    feature: {
      export: exportFeaturesResponseSchema,
      query: featuresQueryResponseSchema
    },
    search: {
      prompt: promptQueryResponseSchema,
      search: searchQueryResponseSchema
    },
    table: {
      export: exportTableResponseSchema,
      query: tablesQueryResponseSchema
    }
  }

  for (const [entity, ops] of Object.entries(schemas)) {
    const entityDir = join(outputDir, entity)
    mkdirSync(entityDir, { recursive: true })
    console.log(`Generating schemas for ${entity}`)

    for (const [operation, schema] of Object.entries(ops)) {
      const schemaType = schema
      const jsonSchema = zodToJsonSchema(schemaType, `${entity}.${operation}`)
      const fileName = `${operation}.json`
      const filePath = join(entityDir, fileName)

      writeFileSync(filePath, JSON.stringify(jsonSchema, null, 2))
      console.log(`Written schema to ${filePath}`)
    }
  }

  console.log('Completed output schema generation')
}

await generateInputSchemas()
await generateOutputSchemas()
