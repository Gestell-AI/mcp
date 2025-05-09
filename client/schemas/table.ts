import { z } from 'zod'

/**
 * Core fields shared by table-related endpoints.
 */
export const TablesCoreSchema = {
  /** The ID of the collection to query. */
  collectionId: z.string().describe('The ID of the collection to query.'),
  /** The ID of the category whose table data is being requested. */
  categoryId: z
    .string()
    .describe('The ID of the category whose table data is being requested.')
}

/**
 * Schema for the tables query request.
 */
export const TablesQueryRequestSchema = {
  ...TablesCoreSchema,
  /** Number of results to skip (for pagination). */
  skip: z
    .number()
    .optional()
    .describe(
      'An optional parameter to skip a specified number of results (for pagination).'
    ),
  /** Maximum number of results to return (for pagination). */
  take: z
    .number()
    .optional()
    .describe(
      'An optional parameter to limit the number of results returned (for pagination).'
    )
}

/**
 * Schema for the export-table request.
 */
export const ExportTableRequestSchema = {
  ...TablesCoreSchema,
  /** Desired export format. */
  type: z.enum(['json', 'csv']).describe('The export format: "json" or "csv".')
}
