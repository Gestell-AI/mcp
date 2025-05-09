import { z } from 'zod'

/**
 * Core fields shared by feature-related endpoints.
 */
export const FeaturesCoreSchema = {
  /** The ID of the collection to query. */
  collectionId: z.string().describe('The ID of the collection to query.'),
  /** The ID of the category of features. */
  categoryId: z
    .string()
    .describe('The ID of the category whose features are being requested.')
}

/**
 * Schema for the features query request.
 */
export const FeaturesQueryRequestSchema = {
  ...FeaturesCoreSchema,
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
 * Schema for the export-features request.
 */
export const ExportFeaturesRequestSchema = {
  ...FeaturesCoreSchema,
  /** Desired export format. */
  type: z.enum(['json', 'csv']).describe('The export format: "json" or "csv".')
}
