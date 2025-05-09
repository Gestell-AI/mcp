import { z } from 'zod'

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

export const TablesQueryRequestSchema = {
  ...TablesCoreSchema,

  /**
   * Number of results to skip (for pagination).
   * Must be an integer ≥ 0 if provided.
   */
  skip: z
    .number()
    .min(0)
    .optional()
    .describe(
      'An optional parameter to skip a specified number of results (for pagination); must be at least 0.'
    ),

  /**
   * Maximum number of results to return (for pagination).
   * Must be an integer ≥ 1 if provided.
   */
  take: z
    .number()
    .min(1)
    .optional()
    .describe(
      'An optional parameter to limit the number of results returned (for pagination); must be at least 1.'
    )
}

export const ExportTableRequestSchema = {
  ...TablesCoreSchema,

  /**
   * Desired export format.
   * Must be either "json" or "csv".
   */
  type: z.enum(['json', 'csv']).describe('The export format: "json" or "csv".')
}
