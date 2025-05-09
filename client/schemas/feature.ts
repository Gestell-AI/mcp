import { z } from 'zod'

export const FeaturesCoreSchema = {
  /**
   * The ID of the collection to query.
   * Must be a valid UUID.
   */
  collectionId: z
    .string()
    .uuid()
    .describe('The ID of the collection to query. Must be a valid UUID.'),

  /**
   * The ID of the category whose features are being requested.
   * Must be a valid UUID.
   */
  categoryId: z
    .string()
    .uuid()
    .describe(
      'The ID of the category whose features are being requested. Must be a valid UUID.'
    )
}

export const FeaturesQueryRequestSchema = {
  ...FeaturesCoreSchema,

  /**
   * An optional parameter to skip a specified number of results (for pagination).
   * Must be an integer ≥ 0.
   */
  skip: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe(
      'An optional parameter to skip a specified number of results (for pagination). Must be ≥ 0.'
    ),

  /**
   * An optional parameter to limit the number of results returned (for pagination).
   * Must be an integer ≥ 1.
   */
  take: z
    .number()
    .int()
    .min(1)
    .optional()
    .describe(
      'An optional parameter to limit the number of results returned (for pagination). Must be ≥ 1.'
    )
}

export const ExportFeaturesRequestSchema = {
  ...FeaturesCoreSchema,

  /**
   * The export format.
   * Allowed values: "json" or "csv".
   */
  type: z.enum(['json', 'csv']).describe('The export format: "json" or "csv".')
}
