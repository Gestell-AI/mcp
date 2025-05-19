import { z } from 'zod'

/**
 * Core tables schema: defines the UUIDs of the target collection and category for table-related operations.
 */
export const TablesCoreSchema = {
  /**
   * The UUID of the collection to query.
   * Must be a 36-character RFC-4122 string.
   */
  collectionId: z
    .string()
    .uuid()
    .describe('The UUID of the collection to query.'),

  /**
   * The UUID of the category whose table data is being requested.
   * Must be a 36-character RFC-4122 string.
   */
  categoryId: z
    .string()
    .uuid()
    .describe('The UUID of the category whose table data is being requested.')
}

/**
 * Tables query schema: extends core tables schema with optional pagination parameters (skip ≥ 0, take ≥ 1).
 */
export const TablesQueryRequestSchema = {
  ...TablesCoreSchema,

  /**
   * Number of results to skip (for pagination).
   * Must be an integer ≥ 0 if provided.
   */
  skip: z
    .number()
    .int()
    .optional()
    .default(0)
    .describe(
      'An optional parameter to skip a specified number of results (for pagination); must be at least 0.'
    ),

  /**
   * Maximum number of results to return (for pagination).
   * Must be an integer ≥ 1 if provided.
   */
  take: z
    .number()
    .int()
    .optional()
    .default(10)
    .describe(
      'An optional parameter to limit the number of results returned (for pagination); must be at least 1.'
    ),

  /**
   * The prompt to use to filter the table.
   * Must be a non-empty string if provided.
   */
  prompt: z
    .string()
    .optional()
    .default('')
    .describe('The prompt to use to filter the table')
}

/**
 * Export table schema: extends core tables schema with the desired output format ("json" or "csv").
 */
export const ExportTableRequestSchema = {
  ...TablesCoreSchema,

  /**
   * Desired export format.
   * Must be either "json" or "csv".
   */
  format: z
    .enum(['json', 'csv'])
    .describe('The export format: "json" or "csv".')
}
