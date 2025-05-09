import { z } from 'zod'

/**
 * Shared subset of fields for any document‐based payload.
 */
export const DocumentCoreSchema = {
  /** The ID of the collection where the document will be created. */
  collectionId: z
    .string()
    .describe('The ID of the collection where the document will be created.')
} as const

/**
 * Schema for the “upload” operation payload.
 */
export const UploadDocumentRequestSchema = {
  ...DocumentCoreSchema,

  /** The name of the document. */
  name: z.string().describe('The name of the document.'),

  /** Optional MIME type of the document (e.g., 'application/pdf'). */
  type: z
    .string()
    .optional()
    .describe('Optional MIME type of the document (e.g., application/pdf).'),

  /** The file to upload — **must** be a Buffer. */
  file: z.string().describe('The path to the file to upload'),

  /** Additional instructions related to the document. */
  instructions: z
    .string()
    .optional()
    .describe(
      'Additional instructions related to the document. Not recommended unless needed.'
    ),

  /**
   * Whether to dispatch a processing job.
   * Set to `false` to skip dispatching.
   */
  job: z
    .boolean()
    .optional()
    .default(true)
    .describe('Whether to dispatch a processing job; set to false to skip.'),

  /** Flag to perform extra table processing & analysis on the document. */
  tables: z
    .boolean()
    .describe(
      'Flag to perform additional table processing and analysis on the document.'
    )
}

/**
 * Schema for the “update” operation payload.
 */
export const UpdateDocumentRequestSchema = {
  ...DocumentCoreSchema,

  /** The ID of the document to update. */
  documentId: z.string().describe('The ID of the document to update.'),

  /** The updated name of the document. */
  name: z.string().optional().describe('The updated name of the document.'),

  /** Updated instructions related to the document. */
  instructions: z
    .string()
    .optional()
    .describe('Updated instructions related to the document.'),

  /**
   * Whether to dispatch a reprocessing job.
   * Set to `true` to reprocess; defaults to `false`.
   */
  job: z
    .boolean()
    .optional()
    .describe(
      'Whether to dispatch a reprocessing job; set to true to dispatch.'
    ),

  /**
   * Flag to perform additional table processing and analysis
   * on the document (useful for PDFs with complex tables).
   */
  tables: z
    .boolean()
    .optional()
    .describe(
      'Flag to perform additional table processing and analysis on the document.'
    )
}

/**
 * Payload schema for deleting a document.
 */
export const DeleteDocumentRequestSchema = {
  ...DocumentCoreSchema,

  /** The ID of the document to delete. */
  documentId: z.string().describe('The ID of the document to delete.')
}

/**
 * Payload schema for reprocessing documents in a collection.
 */
export const ReprocessDocumentsRequestSchema = {
  ...DocumentCoreSchema,

  /** An array of Document IDs to reprocess. */
  ids: z.array(z.string()).describe('An array of Document IDs to reprocess'),

  /**
   * The type of job to dispatch reprocessing for.
   * One of: 'status', 'nodes', 'vectors', 'edges', 'category'.
   */
  type: z
    .enum(['status', 'nodes', 'vectors', 'edges', 'category'])
    .describe(
      "The type of the job to dispatch reprocessing for ('status', 'nodes', 'vectors', 'edges', 'category')"
    )
}

export const ExportDocumentRequestSchema = {
  ...DocumentCoreSchema,

  /** The ID of the document to retrieve. */
  documentId: z.string().describe('The ID of the document to retrieve.'),

  /** Output format: "json" for layout or "text" for raw text output. */
  type: z
    .enum(['json', 'text'])
    .describe('Output format: "json" for layout or "text" for raw text output.')
}

/**
 * Schema for the `get` document operation.
 * Validates the `collectionId` and `documentId` parameters.
 */
export const GetDocumentRequestSchema = {
  ...DocumentCoreSchema,
  /** The ID of the document to retrieve. */
  documentId: z.string().describe('The ID of the document to retrieve.')
}

/**
 * Allowed job status values.
 */
export const JobStatusSchema = z.enum([
  'processing',
  'error',
  'ready',
  'cancelled',
  'unprocessed',
  'partial',
  'all'
])

export type JobStatusType = z.infer<typeof JobStatusSchema>

/**
 * Schema for the `list` documents operation payload.
 * Includes collection context plus optional filters and pagination.
 */
export const GetDocumentsRequestSchema = {
  ...DocumentCoreSchema,

  /** A search query string to filter documents. */
  search: z
    .string()
    .optional()
    .describe('A search query string to filter documents.'),

  /** The number of documents to retrieve. */
  take: z.number().optional().describe('The number of documents to retrieve.'),

  /** The number of documents to skip for pagination. */
  skip: z
    .number()
    .optional()
    .describe('The number of documents to skip for pagination.'),

  /** Whether to retrieve extended information for the documents. */
  extended: z
    .boolean()
    .optional()
    .describe('Whether to retrieve extended information for the documents.'),

  /** Filter by the overall job status. */
  status: JobStatusSchema.optional().describe(
    'Filter by the overall job status.'
  ),

  /** Filter by the job status of layout nodes. */
  nodes: JobStatusSchema.optional().describe(
    'Filter by the job status for layout nodes.'
  ),

  /** Filter by the job status for edge processing. */
  edges: JobStatusSchema.optional().describe(
    'Filter by the job status for edges.'
  ),

  /** Filter by the job status for vector generation. */
  vectors: JobStatusSchema.optional().describe(
    'Filter by the job status for vectors.'
  ),

  /** Filter by the job status for category assignment. */
  category: JobStatusSchema.optional().describe(
    'Filter by the job status for category.'
  )
}
