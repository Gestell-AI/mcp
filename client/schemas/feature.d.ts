import { z } from 'zod';
/**
 * Core features schema: defines the UUIDs of the collection and feature category for feature-related operations.
 */
export declare const FeaturesCoreSchema: {
    /**
     * The ID of the collection to query.
     * Must be a valid UUID.
     */
    collectionId: z.ZodString;
    /**
     * The ID of the category whose features are being requested.
     * Must be a valid UUID.
     */
    categoryId: z.ZodString;
};
/**
 * Request schema for querying features with optional pagination parameters (skip ≥ 0, take ≥ 1).
 */
export declare const FeaturesQueryRequestSchema: {
    /**
     * An optional parameter to skip a specified number of results (for pagination).
     * Must be an integer ≥ 0.
     */
    skip: z.ZodOptional<z.ZodNumber>;
    /**
     * An optional parameter to limit the number of results returned (for pagination).
     * Must be an integer ≥ 1.
     */
    take: z.ZodOptional<z.ZodNumber>;
    /**
     * The ID of the collection to query.
     * Must be a valid UUID.
     */
    collectionId: z.ZodString;
    /**
     * The ID of the category whose features are being requested.
     * Must be a valid UUID.
     */
    categoryId: z.ZodString;
};
/**
 * Request schema for exporting features in the specified format ("json" or "csv").
 */
export declare const ExportFeaturesRequestSchema: {
    /**
     * The export format.
     * Allowed values: "json" or "csv".
     */
    format: z.ZodEnum<["json", "csv"]>;
    /**
     * The ID of the collection to query.
     * Must be a valid UUID.
     */
    collectionId: z.ZodString;
    /**
     * The ID of the category whose features are being requested.
     * Must be a valid UUID.
     */
    categoryId: z.ZodString;
};
/**
 * Request interface for querying features with optional pagination.
 */
export interface FeaturesQueryRequest {
    /** The ID of the collection to query. Must be a valid UUID. */
    collectionId: string;
    /** The ID of the category whose features are being requested. Must be a valid UUID. */
    categoryId: string;
    /**
     * An optional parameter to limit the number of results returned (for pagination).
     * Must be an integer ≥ 1.
     */
    take?: number;
    /**
     * An optional parameter to skip a specified number of results (for pagination).
     * Must be an integer ≥ 0.
     */
    skip?: number;
}
