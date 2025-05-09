import { z } from 'zod'

/*
 * Core definition shared by both create- and update-collection operations.
 * All fields except IDs are defined here so they can be reused consistently.
 */
export const CollectionCoreSchema = {
  /** The name of the collection */
  name: z.string().describe('The name of the collection'),

  /** Collection classification; defaults to `canon` */
  type: z
    .enum(['frame', 'searchable-frame', 'canon', 'features'])
    .describe(
      'The type of collection to create. Defaults to `canon` unless instructed otherwise.'
    )
    .default('canon'),

  /** Optional tags applied to the collection */
  tags: z
    .array(z.string())
    .optional()
    .describe('Optional tags to label the collection'),

  /** Human-readable description */
  description: z
    .string()
    .optional()
    .describe('A description of the collection'),

  /** High-level ingestion instructions */
  instructions: z
    .string()
    .optional()
    .describe('The instructions for indexing data in the collection'),

  /** Graph-generation instructions */
  graphInstructions: z
    .string()
    .optional()
    .describe(
      'The instructions for generating relations in the graph for the collection'
    ),

  /** Prompt-handling instructions */
  promptInstructions: z
    .string()
    .optional()
    .describe('The instructions for how the model should respond to prompts'),

  /** Search-specific instructions */
  searchInstructions: z
    .string()
    .optional()
    .describe(
      'Bullet-point list of search keys to use (e.g. name, topic). Aim for ≤ 3 keys unless otherwise specified.'
    )
}

/*
 * Schema used when **creating** a collection.
 * Requires `organizationId` in addition to the core fields.
 */
export const CollectionCreateSchema = {
  organizationId: z.string(),
  /** Optional fine-grained categories */
  categories: z
    .array(
      z.object({
        /** Category name */
        name: z.string(),
        /** Category type */
        type: z.enum(['concepts', 'features', 'content', 'table']),
        /** Category-specific instructions */
        instructions: z.string()
      })
    )
    .optional()
    .default([])
    .describe(
      'Categories to index data further. Leave empty unless instructed otherwise.'
    ),
  ...CollectionCoreSchema
}

/*
 * Schema used when **updating** an existing collection.
 * `collectionId` is mandatory; everything else is optional so callers can
 * patch only what they need.
 */
export const CollectionUpdateSchema = {
  /** Target collection ID (required) */
  collectionId: z
    .string()
    .describe('The unique identifier of the collection to update.'),
  /** Optionally move the collection to another organization */
  organizationId: z
    .string()
    .optional()
    .describe(
      'Optional update for the Organization ID associated with the collection. You must be an admin of both Organizations to change this.'
    ),
  ...CollectionCoreSchema
}

/**
 * Schema for the `get` collection operation.
 * Validates the `collectionId` parameter.
 */
export const GetCollectionRequestSchema = {
  /** The ID of the collection to retrieve. */
  collectionId: z.string().describe('The ID of the collection to retrieve.')
}

/**
 * Schema for the `list` collections operation payload.
 * All fields are optional to allow filtering, pagination, and detail level.
 */
export const GetCollectionsRequestSchema = {
  /** A search query to filter collections by name, description, or tags. */
  search: z
    .string()
    .optional()
    .describe(
      'A search query to filter collections by name, description, or tags.'
    ),
  /** The number of collections to retrieve. */
  take: z
    .number()
    .optional()
    .describe('The number of collections to retrieve.'),
  /** The number of collections to skip (useful for pagination). */
  skip: z
    .number()
    .optional()
    .describe('The number of collections to skip (useful for pagination).'),
  /** Whether to include extended details for each collection. */
  extended: z
    .boolean()
    .optional()
    .describe('Whether to include extended details for each collection.')
}
