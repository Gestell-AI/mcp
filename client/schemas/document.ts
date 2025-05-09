import { z } from 'zod'

/**
 * Core document schema: defines the UUID of the collection for document-related operations.
 */
export const DocumentCoreSchema = {
  /** The UUID of the collection associated with the document operation. */
  collectionId: z
    .string()
    .uuid()
    .describe(
      'The UUID of the collection associated with the document operation.'
    )
}

/**
 * Request schema for uploading a document, including the target collection UUID, document name, optional MIME type, file path, processing instructions, dispatch job flag, and table-processing flag.
 */
export const UploadDocumentRequestSchema = {
  ...DocumentCoreSchema,

  /** The name of the document. Must not be empty. */
  name: z
    .string()
    .min(1)
    .describe('The name of the document. Must not be empty.'),

  /** Optional MIME type of the document (e.g., 'application/pdf'). */
  type: z
    .string()
    .optional()
    .describe('Optional MIME type of the document (e.g., "application/pdf").'),

  /** The path to the file to upload. Must be a non-empty string representing a valid file path. */
  file: z
    .string()
    .min(1)
    .describe(
      'The path to the file to upload. Must be a non-empty string representing a valid file path.'
    ),

  /** Optional additional instructions for processing the document. If provided, must not be empty. */
  instructions: z
    .string()
    .min(1)
    .optional()
    .describe(
      'Optional additional instructions for processing the document. If provided, must not be empty.'
    ),

  /** Whether to dispatch a processing job. Defaults to true. Set to false to skip. */
  job: z
    .boolean()
    .optional()
    .default(true)
    .describe(
      'Whether to dispatch a processing job. Defaults to true. Set to false to skip.'
    ),

  /** Flag to perform additional table processing and analysis on the document. */
  tables: z
    .boolean()
    .describe(
      'Flag to perform additional table processing and analysis on the document.'
    )
}

/**
 * Request schema for updating a document: includes collection and document UUIDs, optional new name and instructions, a reprocessing job flag, and a table-analysis flag.
 */
export const UpdateDocumentRequestSchema = {
  ...DocumentCoreSchema,

  /** The UUID of the document to update. */
  documentId: z.string().uuid().describe('The UUID of the document to update.'),

  /** The updated name of the document. If provided, must not be empty. */
  name: z
    .string()
    .min(1)
    .optional()
    .describe(
      'The updated name of the document. If provided, must not be empty.'
    ),

  /** Updated instructions related to the document. If provided, must not be empty. */
  instructions: z
    .string()
    .min(1)
    .optional()
    .describe(
      'Updated instructions related to the document. If provided, must not be empty.'
    ),

  /** Whether to dispatch a reprocessing job. Defaults to false. Set to true to dispatch. */
  job: z
    .boolean()
    .optional()
    .default(false)
    .describe(
      'Whether to dispatch a reprocessing job. Defaults to false. Set to true to dispatch.'
    ),

  /** Flag to perform additional table processing and analysis on the document. */
  tables: z
    .boolean()
    .optional()
    .describe(
      'Flag to perform additional table processing and analysis on the document.'
    )
}

/**
 * Request schema for deleting a document: includes the collection UUID and the document UUID to remove.
 */
export const DeleteDocumentRequestSchema = {
  ...DocumentCoreSchema,

  /** The UUID of the document to delete. */
  documentId: z.string().uuid().describe('The UUID of the document to delete.')
}

/**
 * Request schema for reprocessing documents: includes the collection UUID, list of document UUIDs to reprocess, and the reprocessing job type.
 */
export const ReprocessDocumentsRequestSchema = {
  ...DocumentCoreSchema,

  /** An array of UUIDs of the documents to reprocess. */
  ids: z
    .array(z.string().uuid())
    .describe('An array of UUIDs of the documents to reprocess.'),

  /** The type of job to dispatch reprocessing for. */
  type: z
    .enum(['status', 'nodes', 'vectors', 'edges', 'category'])
    .describe(
      'The type of the job to dispatch reprocessing for ("status", "nodes", "vectors", "edges", "category").'
    )
}

/**
 * Request schema for exporting a document: includes the collection UUID, document UUID, and desired output format ("json" or "text").
 */
export const ExportDocumentRequestSchema = {
  ...DocumentCoreSchema,

  /** The UUID of the document to retrieve. */
  documentId: z
    .string()
    .uuid()
    .describe('The UUID of the document to retrieve.'),

  /** Output format: "json" for layout or "text" for raw text output. */
  type: z
    .enum(['json', 'text'])
    .describe('Output format: "json" for layout or "text" for raw text output.')
}

/**
 * Request schema for retrieving a document: includes the collection UUID and document UUID.
 */
export const GetDocumentRequestSchema = {
  ...DocumentCoreSchema,

  /** The UUID of the document to retrieve. */
  documentId: z
    .string()
    .uuid()
    .describe('The UUID of the document to retrieve.')
}

/**
 * Enum schema for document job statuses, covering all processing states ("processing", "error", "ready", "cancelled", "unprocessed", "partial", "all").
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
 * Request schema for listing documents: includes collection UUID, optional search filter, pagination (take, skip), extended info flag, and filters for overall and specific job statuses (nodes, edges, vectors, category).
 */
export const GetDocumentsRequestSchema = {
  ...DocumentCoreSchema,

  /** A search query string to filter documents. */
  search: z
    .string()
    .optional()
    .describe('A search query string to filter documents.'),

  /** The number of documents to retrieve. Must be a positive integer. */
  take: z
    .number()
    .int()
    .positive()
    .optional()
    .describe(
      'The number of documents to retrieve. Must be a positive integer.'
    ),

  /** The number of documents to skip for pagination. Must be a non-negative integer. */
  skip: z
    .number()
    .int()
    .nonnegative()
    .optional()
    .describe(
      'The number of documents to skip for pagination. Must be a non-negative integer.'
    ),

  /** Whether to retrieve extended information for the documents. */
  extended: z
    .boolean()
    .optional()
    .describe('Whether to retrieve extended information for the documents.'),

  /** Filter by the overall job status. */
  status: JobStatusSchema.optional().describe(
    'Filter by the overall job status.'
  ),

  /** Filter by the job status for layout nodes. */
  nodes: JobStatusSchema.optional().describe(
    'Filter by the job status for layout nodes.'
  ),

  /** Filter by the job status for edges. */
  edges: JobStatusSchema.optional().describe(
    'Filter by the job status for edges.'
  ),

  /** Filter by the job status for vectors. */
  vectors: JobStatusSchema.optional().describe(
    'Filter by the job status for vectors.'
  ),

  /** Filter by the job status for category. */
  category: JobStatusSchema.optional().describe(
    'Filter by the job status for category.'
  )
}
