import { z } from 'zod'

/**
 * Core features schema: defines the UUIDs of the collection and feature category for feature-related operations.
 */
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

/**
 * Request schema for querying features with optional pagination parameters (skip ≥ 0, take ≥ 1).
 */
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

/**
 * Request schema for exporting features in the specified format ("json" or "csv").
 */
export const ExportFeaturesRequestSchema = {
  ...FeaturesCoreSchema,

  /**
   * The export format.
   * Allowed values: "json" or "csv".
   */
  format: z
    .enum(['json', 'csv'])
    .describe('The export format: "json" or "csv".')
}

/**
 * Request interface for querying features with optional pagination.
 */
export interface FeaturesQueryRequest {
  /** The ID of the collection to query. Must be a valid UUID. */
  collectionId: string

  /** The ID of the category whose features are being requested. Must be a valid UUID. */
  categoryId: string

  /**
   * An optional parameter to limit the number of results returned (for pagination).
   * Must be an integer ≥ 1.
   */
  take?: number

  /**
   * An optional parameter to skip a specified number of results (for pagination).
   * Must be an integer ≥ 0.
   */
  skip?: number
}
