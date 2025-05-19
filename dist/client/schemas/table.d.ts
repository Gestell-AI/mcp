import { z } from 'zod';
/**
 * Core tables schema: defines the UUIDs of the target collection and category for table-related operations.
 */
export declare const TablesCoreSchema: {
    /**
     * The UUID of the collection to query.
     * Must be a 36-character RFC-4122 string.
     */
    collectionId: z.ZodString;
    /**
     * The UUID of the category whose table data is being requested.
     * Must be a 36-character RFC-4122 string.
     */
    categoryId: z.ZodString;
};
/**
 * Tables query schema: extends core tables schema with optional pagination parameters (skip ≥ 0, take ≥ 1).
 */
export declare const TablesQueryRequestSchema: {
    /**
     * Number of results to skip (for pagination).
     * Must be an integer ≥ 0 if provided.
     */
    skip: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    /**
     * Maximum number of results to return (for pagination).
     * Must be an integer ≥ 1 if provided.
     */
    take: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    /**
     * The prompt to use to filter the table.
     * Must be a non-empty string if provided.
     */
    prompt: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    /**
     * The UUID of the collection to query.
     * Must be a 36-character RFC-4122 string.
     */
    collectionId: z.ZodString;
    /**
     * The UUID of the category whose table data is being requested.
     * Must be a 36-character RFC-4122 string.
     */
    categoryId: z.ZodString;
};
/**
 * Export table schema: extends core tables schema with the desired output format ("json" or "csv").
 */
export declare const ExportTableRequestSchema: {
    /**
     * Desired export format.
     * Must be either "json" or "csv".
     */
    format: z.ZodEnum<["json", "csv"]>;
    /**
     * The UUID of the collection to query.
     * Must be a 36-character RFC-4122 string.
     */
    collectionId: z.ZodString;
    /**
     * The UUID of the category whose table data is being requested.
     * Must be a 36-character RFC-4122 string.
     */
    categoryId: z.ZodString;
};
