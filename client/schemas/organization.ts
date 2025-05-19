import { z } from 'zod'

/**
 * Schema for validating get organization requests.
 * Validates that the request contains a valid organization ID.
 */
export const GetOrganizationRequestSchema = {
  /**
   * The unique identifier of the organization to retrieve.
   * @example "3fa85f64-5717-4562-b3fc-2c963f66afa6"
   */
  organizationId: z
    .string()
    .uuid()
    .describe('Unique identifier for the organization')
}

/**
 * Schema for validating list organizations requests.
 * Supports filtering by search term and pagination.
 */
export const GetOrganizationsRequestSchema = {
  /**
   * Optional search term to filter organizations by name
   * @example "acme"
   */
  search: z
    .string()
    .optional()
    .default('')
    .describe('Search term to filter organizations by name'),

  /**
   * Maximum number of organizations to return (default: 10)
   * @example 10
   */
  take: z
    .number()
    .int()
    .default(10)
    .describe('Maximum number of organizations to return per page'),

  /**
   * Number of organizations to skip for pagination (default: 0)
   * @example 0
   */
  skip: z
    .number()
    .int()
    .default(0)
    .describe('Number of organizations to skip for pagination'),

  /**
   * Whether to include extended organization details (default: false)
   * @example false
   */
  extended: z
    .boolean()
    .default(false)
    .describe('Include extended organization details in the response')
}
