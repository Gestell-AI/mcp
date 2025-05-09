import { z } from 'zod'

/*
 *  Gestell-core search parameters:
 *  Shared subset of fields used by both `GestellSearchSchema` (data retrieval)
 */
export const GestellCoreSearchSchema = {
  /** Target collection ID */
  collectionId: z.string().describe('The ID of the collection to query'),

  /** Optional category filter */
  categoryId: z
    .string()
    .optional()
    .describe('Optional category ID to filter results'),

  /** User-supplied query */
  prompt: z.string().describe('The prompt or query to execute'),

  /** Accuracy/speed trade-off mode (defaults to `normal`) */
  method: z
    .enum(['fast', 'normal', 'precise'])
    .optional()
    .default('normal')
    .describe('The search method to use'),

  /** Content-matching style (defaults to `phrase`) */
  type: z
    .enum(['keywords', 'phrase', 'summary'])
    .default('phrase')
    .optional()
    .describe(
      'Optional search type to specify, default to phrase unless otherwise specified'
    ),

  /** Maximum vector-graph traversal depth */
  vectorDepth: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Depth of vector search'),

  /** Maximum knowledge-graph node traversal depth */
  nodeDepth: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Depth of node search'),

  /** Upper bound on concurrent sub-queries */
  maxQueries: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Maximum number of queries to run'),

  /** Upper bound on returned documents */
  maxResults: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Maximum number of results to return')
}

/*
 *  Gestell search schema:
 *  Extends `GestellCoreSearchSchema` with flags specific for search
 */
export const GestellSearchSchema = {
  ...GestellCoreSearchSchema,

  /** Return full content in the response payload (default `true`) */
  includeContent: z
    .boolean()
    .optional()
    .default(true)
    .describe(
      'Include the content from the search in your response, defaults to true'
    ),

  /** Return edge metadata (relations) in the response payload (default `false`) */
  includeEdges: z
    .boolean()
    .optional()
    .default(false)
    .describe(
      'Include the edges from the search in your response, not recommended'
    )
} as const

/*
 *  Gestell prompt schema:
 *  Extends `GestellCoreSearchSchema` with fields required for prompt-generation
 */
export const GestellPromptSchema = {
  ...GestellCoreSearchSchema,

  /** Optional system template that overrides collection prompt instructions */
  template: z
    .string()
    .optional()
    .describe(
      'Optional system template to use for the prompt, overrides the existing prompt instructions for the collections'
    ),

  /** Enable chain-of-thought reasoning (default `true`) */
  cot: z
    .boolean()
    .optional()
    .default(true)
    .describe('Flag to enable chain-of-thought reasoning'),

  /** Chat context history */
  messages: z
    .array(
      z.object({
        /** Message role */
        role: z.enum(['system', 'user', 'model']),

        /** Message content */
        content: z.string()
      })
    )
    .optional()
    .default([])
    .describe('Chat history messages for context')
}
