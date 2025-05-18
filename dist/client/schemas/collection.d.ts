import { z } from 'zod';
import type { PiiIdentifierOption } from '@gestell/sdk/types';
/**
 * Core Collection schema: defines essential metadata for a collection, including a human-readable name, classification type, optional tags, detailed description, and high-level instructions for data ingestion, graph construction, prompt formatting, and search key prioritization.
 */
export declare const CollectionCoreSchema: {
    /**
     * A concise, human-readable name for the collection.
     * • Recommended max length: 50 characters
     * • Use Title Case and avoid special characters
     * • Example: “Sales Reports Q2 2025”
     */
    name: z.ZodString;
    /**
     * Indicates if this collection contains Personally Identifiable Information (PII).
     * When true, enables additional privacy controls and auditing.
     */
    pii: z.ZodDefault<z.ZodBoolean>;
    /**
     * Array of PII controls for this collection.
     * These identifiers specify what types of PII to look for and handle.
     */
    piiControls: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodEnum<[PiiIdentifierOption, ...PiiIdentifierOption[]]>, "many">>>;
    /**
     * Specifies the classification of this collection.
     * - frame: When you only want the OCR outputs
     * - searchable-frame: Lighter version of canonized collections for search-based reasoning
     * - canon: Complete canonized collection with best search-based reasoning capabilities
     * - features: Specialized collection for category extractions of content
     */
    type: z.ZodDefault<z.ZodEnum<["frame", "searchable-frame", "canon", "features"]>>;
    /**
     * Optional tags to categorize the collection.
     * • Use short, single-word labels (no spaces)
     * • Example: [ "finance", "Q2", "internal" ]
     */
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * A detailed description of the collection’s purpose and contents.
     * • Multi-sentence narrative, outlining scope and intended use
     * • Example: “Contains all client invoices from January to March 2025, used for quarterly auditing and trend analysis.”
     */
    description: z.ZodOptional<z.ZodString>;
    /**
     * High-level instructions for indexing or ingesting data.
     * • Outline source types, preprocessing steps, and field mappings
     * • Provide any contextual guidelines or constraints
     * • Aim for clear, numbered steps or bullet points
     */
    instructions: z.ZodOptional<z.ZodString>;
    /**
     * Directions for building the graph structure.
     * • Specify node types, edge semantics, and any heuristics
     * • Include rules for relationship extraction
     * • Example: “Link invoices to client nodes by matching client_id field…”
     */
    graphInstructions: z.ZodOptional<z.ZodString>;
    /**
     * Guidance for how the model should format and tone its responses.
     * • Specify desired style (formal, friendly, bullet points, etc.)
     * • Recommend structure (summary, examples, code snippets)
     * • Example: “Respond in bullet points, providing a brief summary followed by detailed steps.”
     */
    promptInstructions: z.ZodOptional<z.ZodString>;
    /**
     * A bullet-point list of search keys to prioritize.
     * • One key per line (≤5 keys)
     * • Example:
     *     - title
     *     - author
     *     - publication_date
     */
    searchInstructions: z.ZodOptional<z.ZodString>;
};
/**
 * Defines the payload for creating a new collection, including the owning organization’s UUID, optional sub-indexing categories (each with name, type, and extraction instructions), and all core collection metadata fields (name, type, tags, description, and ingestion/search/graph/prompt guidelines).
 */
export declare const CollectionCreateSchema: {
    /**
     * A concise, human-readable name for the collection.
     * • Recommended max length: 50 characters
     * • Use Title Case and avoid special characters
     * • Example: “Sales Reports Q2 2025”
     */
    name: z.ZodString;
    /**
     * Indicates if this collection contains Personally Identifiable Information (PII).
     * When true, enables additional privacy controls and auditing.
     */
    pii: z.ZodDefault<z.ZodBoolean>;
    /**
     * Array of PII controls for this collection.
     * These identifiers specify what types of PII to look for and handle.
     */
    piiControls: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodEnum<[PiiIdentifierOption, ...PiiIdentifierOption[]]>, "many">>>;
    /**
     * Specifies the classification of this collection.
     * - frame: When you only want the OCR outputs
     * - searchable-frame: Lighter version of canonized collections for search-based reasoning
     * - canon: Complete canonized collection with best search-based reasoning capabilities
     * - features: Specialized collection for category extractions of content
     */
    type: z.ZodDefault<z.ZodEnum<["frame", "searchable-frame", "canon", "features"]>>;
    /**
     * Optional tags to categorize the collection.
     * • Use short, single-word labels (no spaces)
     * • Example: [ "finance", "Q2", "internal" ]
     */
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * A detailed description of the collection’s purpose and contents.
     * • Multi-sentence narrative, outlining scope and intended use
     * • Example: “Contains all client invoices from January to March 2025, used for quarterly auditing and trend analysis.”
     */
    description: z.ZodOptional<z.ZodString>;
    /**
     * High-level instructions for indexing or ingesting data.
     * • Outline source types, preprocessing steps, and field mappings
     * • Provide any contextual guidelines or constraints
     * • Aim for clear, numbered steps or bullet points
     */
    instructions: z.ZodOptional<z.ZodString>;
    /**
     * Directions for building the graph structure.
     * • Specify node types, edge semantics, and any heuristics
     * • Include rules for relationship extraction
     * • Example: “Link invoices to client nodes by matching client_id field…”
     */
    graphInstructions: z.ZodOptional<z.ZodString>;
    /**
     * Guidance for how the model should format and tone its responses.
     * • Specify desired style (formal, friendly, bullet points, etc.)
     * • Recommend structure (summary, examples, code snippets)
     * • Example: “Respond in bullet points, providing a brief summary followed by detailed steps.”
     */
    promptInstructions: z.ZodOptional<z.ZodString>;
    /**
     * A bullet-point list of search keys to prioritize.
     * • One key per line (≤5 keys)
     * • Example:
     *     - title
     *     - author
     *     - publication_date
     */
    searchInstructions: z.ZodOptional<z.ZodString>;
    /**
     * The UUID of the organization that will own this collection.
     * Example: “3fa85f64-5717-4562-b3fc-2c963f66afa6”
     */
    organizationId: z.ZodString;
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
    categories: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        /** Category name (e.g. “Invoices”, “Products”, “UserActions”) */
        name: z.ZodString;
        /**
         * Category type, defining how data in this category is treated.
         * • concepts — for high level conceptual sumamries
         * • features — for retrieving and extracting labels
         * • content — for categorizing raw text in existing nodes
         * • table — for structured, row/column data
         */
        type: z.ZodEnum<["concepts", "features", "content", "table"]>;
        /**
         * Detailed extraction or indexing instructions for this category.
         * Describe parsing steps, field mappings, or any preprocessing rules.
         * Example: “Split each invoice into header and line-item records, map invoice_date to ISO format.”
         */
        instructions: z.ZodString;
        /**
         * If true, this category will only create one entry per document.
         */
        singleEntry: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "content" | "features" | "concepts" | "table";
        instructions: string;
        singleEntry: boolean;
    }, {
        name: string;
        type: "content" | "features" | "concepts" | "table";
        instructions: string;
        singleEntry?: boolean | undefined;
    }>, "many">>>;
};
/**
 * Payload schema for updating an existing collection, including the collection’s UUID, optional new owner organization UUID, and any core collection metadata fields (name, type, tags, description, and instructions) to modify.
 */
export declare const CollectionUpdateSchema: {
    /**
     * A concise, human-readable name for the collection.
     * • Recommended max length: 50 characters
     * • Use Title Case and avoid special characters
     * • Example: “Sales Reports Q2 2025”
     */
    name: z.ZodString;
    /**
     * Indicates if this collection contains Personally Identifiable Information (PII).
     * When true, enables additional privacy controls and auditing.
     */
    pii: z.ZodDefault<z.ZodBoolean>;
    /**
     * Array of PII controls for this collection.
     * These identifiers specify what types of PII to look for and handle.
     */
    piiControls: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodEnum<[PiiIdentifierOption, ...PiiIdentifierOption[]]>, "many">>>;
    /**
     * Specifies the classification of this collection.
     * - frame: When you only want the OCR outputs
     * - searchable-frame: Lighter version of canonized collections for search-based reasoning
     * - canon: Complete canonized collection with best search-based reasoning capabilities
     * - features: Specialized collection for category extractions of content
     */
    type: z.ZodDefault<z.ZodEnum<["frame", "searchable-frame", "canon", "features"]>>;
    /**
     * Optional tags to categorize the collection.
     * • Use short, single-word labels (no spaces)
     * • Example: [ "finance", "Q2", "internal" ]
     */
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * A detailed description of the collection’s purpose and contents.
     * • Multi-sentence narrative, outlining scope and intended use
     * • Example: “Contains all client invoices from January to March 2025, used for quarterly auditing and trend analysis.”
     */
    description: z.ZodOptional<z.ZodString>;
    /**
     * High-level instructions for indexing or ingesting data.
     * • Outline source types, preprocessing steps, and field mappings
     * • Provide any contextual guidelines or constraints
     * • Aim for clear, numbered steps or bullet points
     */
    instructions: z.ZodOptional<z.ZodString>;
    /**
     * Directions for building the graph structure.
     * • Specify node types, edge semantics, and any heuristics
     * • Include rules for relationship extraction
     * • Example: “Link invoices to client nodes by matching client_id field…”
     */
    graphInstructions: z.ZodOptional<z.ZodString>;
    /**
     * Guidance for how the model should format and tone its responses.
     * • Specify desired style (formal, friendly, bullet points, etc.)
     * • Recommend structure (summary, examples, code snippets)
     * • Example: “Respond in bullet points, providing a brief summary followed by detailed steps.”
     */
    promptInstructions: z.ZodOptional<z.ZodString>;
    /**
     * A bullet-point list of search keys to prioritize.
     * • One key per line (≤5 keys)
     * • Example:
     *     - title
     *     - author
     *     - publication_date
     */
    searchInstructions: z.ZodOptional<z.ZodString>;
    /**
     * The UUID of the collection to update.
     * Example: “3fa85f64-5717-4562-b3fc-2c963f66afa6”
     */
    collectionId: z.ZodString;
    /**
     * Optional new owner organization UUID.
     * You must have admin rights in both organizations to transfer ownership.
     * Example: “d2719e84-89b0-4c25-a6f2-1a2bef3c9dbe”
     */
    organizationId: z.ZodOptional<z.ZodString>;
};
/**
 * Request schema for retrieving a collection by its UUID.
 */
export declare const GetCollectionRequestSchema: {
    /**
     * The UUID of the collection to update.
     * Example: “3fa85f64-5717-4562-b3fc-2c963f66afa6”
     */
    collectionId: z.ZodString;
};
/**
 * Request schema for listing collections with optional search filter, pagination controls (take, skip), and an extended metadata flag.
 */
export declare const GetCollectionsRequestSchema: {
    /**
     * Optional filter string to match against collection name, description, or tags.
     * Example: "finance Q2" will return collections whose name, description, or tags contain those terms.
     */
    search: z.ZodOptional<z.ZodString>;
    /**
     * Optional limit on the number of collections to retrieve.
     * Use for pagination sizing. Example: 5
     */
    take: z.ZodOptional<z.ZodNumber>;
    /**
     * Optional offset for pagination.
     * Skip this many collections before starting to collect the result set.
     * Example: to fetch page 2 with page size 10, set skip = 10.
     */
    skip: z.ZodOptional<z.ZodNumber>;
    /**
     * When true, include extended metadata (documents in collection etc.)
     * If false or omitted, only basic metadata (id, name, type) is returned.
     */
    extended: z.ZodOptional<z.ZodBoolean>;
};
