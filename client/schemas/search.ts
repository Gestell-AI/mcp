import { z } from 'zod'

export const GestellSearchSimpleSchema = {
  /**
   * The ID of the collection to query. This must be a UUID.
   * Required field that identifies the target collection for the search operation.
   */
  collectionId: z
    .string()
    .uuid()
    .describe('The ID of the collection to query (UUID)'),

  /**
   * The prompt or query to search,
   * should be a short, simple, and direct question or statement
   */
  prompt: z
    .string()
    .describe(
      'The prompt or query to search, should be a short, simple, and direct question or statement'
    )
}

/**
 * Core search schema for Gestell: defines required and optional parameters for performing a search on a collection,
 * including collectionId (UUID), optional categoryId (UUID), prompt text, search method (fast|normal|precise),
 * search type (keywords|phrase|summary), vectorDepth, nodeDepth, maxQueries, and maxResults.
 */
export const GestellCoreSearchSchema = {
  ...GestellSearchSimpleSchema,
  /**
   * Optional category ID to filter the search results. If provided, it must be a UUID.
   * Used to narrow down the scope of the search within the specified collection.
   */
  categoryId: z
    .string()
    .uuid()
    .optional()
    .default('')
    .describe('Optional category ID to filter results (UUID)'),

  /**
   * The search method to use, balancing accuracy and speed.
   * - 'fast': Prioritizes speed, potentially reducing accuracy.
   * - 'normal': A balanced approach between speed and accuracy (default).
   * - 'precise': Prioritizes accuracy, potentially increasing computation time.
   * Optional, defaults to 'normal' if not specified.
   */
  method: z
    .enum(['fast', 'normal', 'precise'])
    .optional()
    .default('normal')
    .describe('The search method to use'),

  /**
   * The type of search to perform, determining how content is matched.
   * - 'keywords': Matches individual keywords within the content.
   * - 'phrase': Matches the exact phrase as provided in the prompt (default).
   * - 'summary': Matches based on document summaries or abstracted content.
   * Optional, defaults to 'phrase' if not specified.
   */
  type: z
    .enum(['keywords', 'phrase', 'summary'])
    .optional()
    .default('phrase')
    .describe('The type of search to perform'),

  /**
   * Optional depth for vector search, controlling how far the vector-graph traversal extends.
   * Must be a positive integer (greater than 0) if provided. Higher values may yield more
   * comprehensive results but increase computational cost.
   */
  vectorDepth: z
    .number()
    .int()
    .positive()
    .optional()
    .default(8)
    .describe('Depth of vector search'),

  /**
   * Optional depth for node search, controlling how far the knowledge-graph node traversal extends.
   * Must be a positive integer (greater than 0) if provided. Higher values may yield more
   * detailed results but increase computational cost.
   */
  nodeDepth: z
    .number()
    .int()
    .positive()
    .optional()
    .default(3)
    .describe('Depth of node search'),

  /**
   * Optional maximum number of concurrent sub-queries to run.
   * Must be a positive integer (greater than 0) if provided. Limits the number of simultaneous
   * queries, affecting resource usage and performance.
   */
  maxQueries: z
    .number()
    .int()
    .positive()
    .optional()
    .default(2)
    .describe('Maximum number of queries to run'),

  /**
   * Optional maximum number of results to return in the response.
   * Must be a positive integer (greater than 0) if provided. Limits the size of the result set,
   * impacting response payload size and processing time.
   */
  maxResults: z
    .number()
    .int()
    .positive()
    .optional()
    .default(10)
    .describe('Maximum number of results to return')
}

/**
 * Gestell search schema: extends core search parameters with flags to include full content (includeContent)
 * and edge metadata (includeEdges) in the search response payload.
 */
export const GestellSearchSchema = {
  ...GestellCoreSearchSchema,

  /**
   * Whether to include the full content in the response payload.
   * Defaults to true, meaning content is included unless explicitly set to false.
   * Set to false to reduce payload size when content is not needed.
   */
  includeContent: z
    .boolean()
    .optional()
    .default(true)
    .describe(
      'Include the content from the search in your response, defaults to true'
    ),

  /**
   * Whether to include edge metadata (relationships) in the response payload.
   * Defaults to false, excluding edges unless explicitly requested.
   * Including edges can significantly increase payload size due to additional relational data.
   */
  includeEdges: z
    .boolean()
    .optional()
    .default(false)
    .describe(
      'Include the edges from the search in your response, not recommended'
    )
}

/**
 * Gestell prompt schema: extends core search parameters with an optional system template override (template),
 * a chain-of-thought reasoning flag (cot), and an array of chat history messages (messages) for conversational prompt generation.
 */
export const GestellPromptSchema = {
  ...GestellCoreSearchSchema,

  /**
   * Optional system template to override the default prompt instructions for the collection.
   * If provided, this string replaces the collection’s predefined template, allowing
   * customization of the prompt structure.
   */
  template: z
    .string()
    .optional()
    .default('')
    .describe(
      'Optional system template to use for the prompt, overrides the existing prompt instructions for the collections'
    ),

  /**
   * Flag to enable chain-of-thought reasoning in prompt generation.
   * Defaults to true, enabling this feature unless explicitly disabled.
   * Chain-of-thought reasoning enhances the model's ability to break down complex queries.
   */
  cot: z
    .boolean()
    .optional()
    .default(true)
    .describe('Flag to enable chain-of-thought reasoning'),

  /**
   * Array of messages providing chat history for context in prompt generation.
   * Each message consists of a role and content. Defaults to an empty array if not provided.
   * Useful for maintaining conversational context or guiding the model’s response.
   */
  messages: z
    .array(
      z.object({
        /**
         * The role of the message sender.
         * - 'system': Instructions or context from the system.
         * - 'user': Input or queries from the user.
         * - 'model': Responses or outputs from the model.
         */
        role: z.enum(['system', 'user', 'model']),

        /**
         * The content of the message.
         * A string containing the text of the message, relevant to its role.
         */
        content: z.string()
      })
    )
    .optional()
    .default([])
    .describe('Chat history messages for context')
}
