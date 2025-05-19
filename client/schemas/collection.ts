import { z } from 'zod'
import type { PiiIdentifierOption } from '@gestell/sdk/types'
import { PII_IDENTIFIER_OPTIONS } from '@gestell/sdk/types'

/**
 * Core Collection schema: defines essential metadata for a collection, including a human-readable name, classification type, optional tags, detailed description, and high-level instructions for data ingestion, graph construction, prompt formatting, and search key prioritization.
 */
export const CollectionCoreSchema = {
  /**
   * A concise, human-readable name for the collection.
   * • Recommended max length: 50 characters
   * • Use Title Case and avoid special characters
   * • Example: “Sales Reports Q2 2025”
   */
  name: z
    .string()
    .min(1, { message: 'Collection name cannot be empty.' })
    .describe(
      'A concise, human-readable name for the collection (≤50 chars; Title Case; no special symbols). Example: "Sales Reports Q2 2025".'
    ),

  /**
   * Indicates if this collection contains Personally Identifiable Information (PII).
   * When true, enables additional privacy controls and auditing.
   */
  pii: z
    .boolean()
    .default(false)
    .describe(
      'Indicates if this collection contains Personally Identifiable Information (PII).'
    ),

  /**
   * Array of PII controls for this collection.
   * These identifiers specify what types of PII to look for and handle.
   */
  piiControls: z
    .array(
      z.enum(
        PII_IDENTIFIER_OPTIONS as [
          PiiIdentifierOption,
          ...PiiIdentifierOption[]
        ]
      )
    )
    .optional()
    .default([])
    .describe('Array of PII control identifiers for this collection.'),

  /**
   * Specifies the classification of this collection.
   * - frame: When you only want the OCR outputs
   * - searchable-frame: Lighter version of canonized collections for search-based reasoning
   * - canon: Complete canonized collection with best search-based reasoning capabilities
   * - features: Specialized collection for category extractions of content
   */
  type: z
    .enum(['frame', 'searchable-frame', 'canon', 'features'] as const)
    .default('canon')
    .describe(
      'Classification of the collection. One of "frame" (ephemeral), "searchable-frame" (search-optimized), "canon" (default long-term), or "features" (embeddings store); Always default to "canon" unless directed otherwise by the user.'
    ),

  /**
   * Optional tags to categorize the collection.
   * • Use short, single-word labels (no spaces)
   * • Example: [ "finance", "Q2", "internal" ]
   */
  tags: z
    .array(z.string().min(1), {
      invalid_type_error: 'Each tag must be a non‐empty string.'
    })
    .optional()
    .describe(
      'Array of short keyword tags (single words, no spaces). Example: ["finance","Q2","internal"].'
    ),

  /**
   * A detailed description of the collection’s purpose and contents.
   * • Multi-sentence narrative, outlining scope and intended use
   * • Example: “Contains all client invoices from January to March 2025, used for quarterly auditing and trend analysis.”
   */
  description: z
    .string()
    .optional()
    .describe(
      'Multi-sentence description of purpose, contents, and intended usage (≤500 chars). Example: "Contains all client invoices from Jan–Mar 2025 for auditing."'
    ),

  /**
   * High-level instructions for indexing or ingesting data.
   * • Outline source types, preprocessing steps, and field mappings
   * • Provide any contextual guidelines or constraints
   * • Aim for clear, numbered steps or bullet points
   */
  instructions: z
    .string()
    .optional()
    .describe(
      'High-level ingestion guidelines: outline data sources, preprocessing steps, and field mappings (e.g. "1. Convert PDFs to text…").'
    ),

  /**
   * Directions for building the graph structure.
   * • Specify node types, edge semantics, and any heuristics
   * • Include rules for relationship extraction
   * • Example: “Link invoices to client nodes by matching client_id field…”
   */
  graphInstructions: z
    .string()
    .optional()
    .describe(
      'Graph generation rules: define node types, edge semantics, and heuristics (e.g. "Link orders to customers by matching customer_id").'
    ),

  /**
   * Guidance for how the model should format and tone its responses.
   * • Specify desired style (formal, friendly, bullet points, etc.)
   * • Recommend structure (summary, examples, code snippets)
   * • Example: “Respond in bullet points, providing a brief summary followed by detailed steps.”
   */
  promptInstructions: z
    .string()
    .optional()
    .describe(
      'LLM response guidelines: tone, format, and structure (e.g. "Use bullets, start with a one-sentence summary").'
    ),

  /**
   * A bullet-point list of search keys to prioritize.
   * • One key per line (≤5 keys)
   * • Example:
   *     - title
   *     - author
   *     - publication_date
   */
  searchInstructions: z
    .string()
    .optional()
    .describe(
      'Bullet-point list of ≤5 search keys (one per line). Example:\n- title\n- author\n- publication_date'
    )
}

/**
 * Defines the payload for creating a new collection, including the owning organization’s UUID, optional sub-indexing categories (each with name, type, and extraction instructions), and all core collection metadata fields (name, type, tags, description, and ingestion/search/graph/prompt guidelines).
 */
export const CollectionCreateSchema = {
  /**
   * The UUID of the organization that will own this collection.
   * Example: “3fa85f64-5717-4562-b3fc-2c963f66afa6”
   */
  organizationId: z
    .string()
    .uuid()
    .describe(
      'The UUID of the organization that owns this collection. Example: "3fa85f64-5717-4562-b3fc-2c963f66afa6".'
    ),

  /**
   * Optional, fine-grained categories for breaking your data into sub-groups.
   * • Leave empty ([]) unless you need to index by specific facets
   * • Each category should have:
   *     – name: human-readable label (e.g. “Customer Profiles”)
   *     – type: one of
   *         • concepts — high-level topics or tags
   *         • features — numeric vectors for ML embedding stores
   *         • content — chunks of text or documents
   *         • table — tabular data structures
   *     – instructions: how to extract or interpret items in this category
   * Example:
   * ```jsonc
   * [
   *   {
   *     "name": "Invoices",
   *     "type": "content",
   *     "instructions": "Index each invoice PDF as a separate document, extracting header fields and line items."
   *   }
   * ]
   * ```
   */
  categories: z
    .array(
      z.object({
        /** Category name (e.g. “Invoices”, “Products”, “UserActions”) */
        name: z
          .string()
          .describe(
            'Human-readable category name, e.g. "Invoices", "Products".'
          ),

        /**
         * Category type, defining how data in this category is treated.
         * • concepts — for high level conceptual sumamries
         * • features — for retrieving and extracting labels
         * • content — for categorizing raw text in existing nodes
         * • table — for structured, row/column data
         */
        type: z
          .enum(['concepts', 'features', 'content', 'table'] as const)
          .describe(
            'The data model for this category: "concepts", "features", "content", or "table".'
          ),

        /**
         * Detailed extraction or indexing instructions for this category.
         * Describe parsing steps, field mappings, or any preprocessing rules.
         * Example: “Split each invoice into header and line-item records, map invoice_date to ISO format.”
         */
        instructions: z
          .string()
          .describe(
            'Extraction or indexing guidelines for items in this category (e.g. parsing rules, field mappings). For features describe what needs to be extracted from the document. For tables, clearly describe each column and what the column is extracting.'
          ),

        /**
         * If true, this category will only create one entry per document.
         */
        singleEntry: z
          .boolean()
          .optional()
          .default(false)
          .describe(
            'If true, this category will only create one entry per document.'
          )
      })
    )
    .optional()
    .default([])
    .describe(
      'List of categories for indexing. Leave as [] unless the user specifies they need additional indexing via categories. Avoid concepts and content unless specified and prioritize indexing via features and table.'
    ),

  // Reuse all of the core collection fields (name, type, tags, descriptions, instructions, etc.)
  ...CollectionCoreSchema
}

/**
 * Payload schema for updating an existing collection, including the collection’s UUID, optional new owner organization UUID, and any core collection metadata fields (name, type, tags, description, and instructions) to modify.
 */
export const CollectionUpdateSchema = {
  /**
   * The UUID of the collection to update.
   * Example: “3fa85f64-5717-4562-b3fc-2c963f66afa6”
   */
  collectionId: z
    .string()
    .uuid()
    .describe(
      'The UUID of the collection to update. Example: "3fa85f64-5717-4562-b3fc-2c963f66afa6".'
    ),

  /**
   * Optional new owner organization UUID.
   * You must have admin rights in both organizations to transfer ownership.
   * Example: “d2719e84-89b0-4c25-a6f2-1a2bef3c9dbe”
   */
  organizationId: z
    .string()
    .uuid()
    .optional()
    .describe(
      'New organization UUID to assign this collection. Requires admin permissions in both orgs.'
    ),
  ...CollectionCoreSchema
}

/**
 * Request schema for retrieving a collection by its UUID.
 */
export const GetCollectionRequestSchema = {
  /**
   * The UUID of the collection to update.
   * Example: “3fa85f64-5717-4562-b3fc-2c963f66afa6”
   */
  collectionId: z
    .string()
    .uuid()
    .describe(
      'The UUID of the collection to update. Example: "3fa85f64-5717-4562-b3fc-2c963f66afa6".'
    )
}

/**
 * Request schema for listing collections with optional search filter, pagination controls (take, skip), and an extended metadata flag.
 */
export const GetCollectionsRequestSchema = {
  /**
   * Optional filter string to match against collection name, description, or tags.
   * Example: "finance Q2" will return collections whose name, description, or tags contain those terms.
   */
  search: z
    .string()
    .optional()
    .default('')
    .describe(
      'Optional filter string to match name, description, or tags. Example: "finance Q2".'
    ),

  /**
   * Optional limit on the number of collections to retrieve.
   * Use for pagination sizing. Example: 5
   */
  take: z
    .number()
    .int()
    .optional()
    .default(10)
    .describe('Optional maximum number of collections to return. Example: 5.'),

  /**
   * Optional offset for pagination.
   * Skip this many collections before starting to collect the result set.
   * Example: to fetch page 2 with page size 10, set skip = 10.
   */
  skip: z
    .number()
    .int()
    .optional()
    .default(0)
    .describe(
      'Optional number of collections to skip (pagination offset). Example: 10.'
    ),

  /**
   * When true, include extended metadata (documents in collection etc.)
   * If false or omitted, only basic metadata (id, name, type) is returned.
   */
  extended: z
    .boolean()
    .optional()
    .default(false)
    .describe(
      'Optional flag to include extended details (documents in collection etc.).'
    )
}
