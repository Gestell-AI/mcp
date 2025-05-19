import { z } from 'zod';
/**
 * Schema for validating get organization requests.
 * Validates that the request contains a valid organization ID.
 */
export declare const GetOrganizationRequestSchema: {
    /**
     * The unique identifier of the organization to retrieve.
     * @example "3fa85f64-5717-4562-b3fc-2c963f66afa6"
     */
    organizationId: z.ZodString;
};
/**
 * Schema for validating list organizations requests.
 * Supports filtering by search term and pagination.
 */
export declare const GetOrganizationsRequestSchema: {
    /**
     * Optional search term to filter organizations by name
     * @example "acme"
     */
    search: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    /**
     * Maximum number of organizations to return (default: 10)
     * @example 10
     */
    take: z.ZodDefault<z.ZodNumber>;
    /**
     * Number of organizations to skip for pagination (default: 0)
     * @example 0
     */
    skip: z.ZodDefault<z.ZodNumber>;
    /**
     * Whether to include extended organization details (default: false)
     * @example false
     */
    extended: z.ZodDefault<z.ZodBoolean>;
};
