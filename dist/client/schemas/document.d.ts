import { z } from 'zod';
/**
 * Core document schema: defines the UUID of the collection for document-related operations.
 */
export declare const DocumentCoreSchema: {
    /** The UUID of the collection associated with the document operation. */
    collectionId: z.ZodString;
};
/**
 * Request schema for uploading a document, including the target collection UUID, document name, optional MIME type, file path, processing instructions, dispatch job flag, and table-processing flag.
 */
export declare const UploadDocumentRequestSchema: {
    /** The name of the document. Must not be empty. */
    name: z.ZodString;
    /** Optional MIME type of the document (e.g., 'application/pdf'). */
    type: z.ZodOptional<z.ZodString>;
    /** The path to the file to upload. Must be a non-empty string representing a valid file path. */
    file: z.ZodString;
    /** Optional additional instructions for processing the document. If provided, must not be empty. */
    instructions: z.ZodOptional<z.ZodString>;
    /** Whether to dispatch a processing job. Defaults to true. Set to false to skip. */
    job: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    /** Flag to perform additional table processing and analysis on the document. */
    tables: z.ZodBoolean;
    /** The UUID of the collection associated with the document operation. */
    collectionId: z.ZodString;
};
/**
 * Request schema for updating a document: includes collection and document UUIDs, optional new name and instructions, a reprocessing job flag, and a table-analysis flag.
 */
export declare const UpdateDocumentRequestSchema: {
    /** The UUID of the document to update. */
    documentId: z.ZodString;
    /** The updated name of the document. If provided, must not be empty. */
    name: z.ZodOptional<z.ZodString>;
    /** Updated instructions related to the document. If provided, must not be empty. */
    instructions: z.ZodOptional<z.ZodString>;
    /** Whether to dispatch a reprocessing job. Defaults to false. Set to true to dispatch. */
    job: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    /** Flag to perform additional table processing and analysis on the document. */
    tables: z.ZodOptional<z.ZodBoolean>;
    /** The UUID of the collection associated with the document operation. */
    collectionId: z.ZodString;
};
/**
 * Request schema for deleting a document: includes the collection UUID and the document UUID to remove.
 */
export declare const DeleteDocumentRequestSchema: {
    /** The UUID of the document to delete. */
    documentId: z.ZodString;
    /** The UUID of the collection associated with the document operation. */
    collectionId: z.ZodString;
};
/**
 * Request schema for reprocessing documents: includes the collection UUID, list of document UUIDs to reprocess, and the reprocessing job type.
 */
export declare const ReprocessDocumentsRequestSchema: {
    /** An array of UUIDs of the documents to reprocess. */
    ids: z.ZodArray<z.ZodString, "many">;
    /** The type of job to dispatch reprocessing for. */
    type: z.ZodEnum<["status", "nodes", "vectors", "edges", "category"]>;
    /** The UUID of the collection associated with the document operation. */
    collectionId: z.ZodString;
};
/**
 * Request schema for exporting a document: includes the collection UUID, document UUID, and desired output format ("json" or "text").
 */
export declare const ExportDocumentRequestSchema: {
    /** The UUID of the document to retrieve. */
    documentId: z.ZodString;
    /** Output format: "json" for layout or "text" for raw text output. */
    type: z.ZodEnum<["json", "text"]>;
    /** The UUID of the collection associated with the document operation. */
    collectionId: z.ZodString;
};
/**
 * Request schema for retrieving a document: includes the collection UUID and document UUID.
 */
export declare const GetDocumentRequestSchema: {
    /** The UUID of the document to retrieve. */
    documentId: z.ZodString;
    /** The UUID of the collection associated with the document operation. */
    collectionId: z.ZodString;
};
/**
 * Enum schema for document job statuses, covering all processing states ("processing", "error", "ready", "cancelled", "unprocessed", "partial", "all").
 */
export declare const JobStatusSchema: z.ZodEnum<["processing", "error", "ready", "cancelled", "unprocessed", "partial", "all"]>;
export type JobStatusType = z.infer<typeof JobStatusSchema>;
/**
 * Request schema for listing documents: includes collection UUID, optional search filter, pagination (take, skip), extended info flag, and filters for overall and specific job statuses (nodes, edges, vectors, category).
 */
export declare const GetDocumentsRequestSchema: {
    /** A search query string to filter documents. */
    search: z.ZodOptional<z.ZodString>;
    /** The number of documents to retrieve. Must be a positive integer. */
    take: z.ZodOptional<z.ZodNumber>;
    /** The number of documents to skip for pagination. Must be a non-negative integer. */
    skip: z.ZodOptional<z.ZodNumber>;
    /** Whether to retrieve extended information for the documents. */
    extended: z.ZodOptional<z.ZodBoolean>;
    /** Filter by the overall job status. */
    status: z.ZodOptional<z.ZodEnum<["processing", "error", "ready", "cancelled", "unprocessed", "partial", "all"]>>;
    /** Filter by the job status for layout nodes. */
    nodes: z.ZodOptional<z.ZodEnum<["processing", "error", "ready", "cancelled", "unprocessed", "partial", "all"]>>;
    /** Filter by the job status for edges. */
    edges: z.ZodOptional<z.ZodEnum<["processing", "error", "ready", "cancelled", "unprocessed", "partial", "all"]>>;
    /** Filter by the job status for vectors. */
    vectors: z.ZodOptional<z.ZodEnum<["processing", "error", "ready", "cancelled", "unprocessed", "partial", "all"]>>;
    /** Filter by the job status for category. */
    category: z.ZodOptional<z.ZodEnum<["processing", "error", "ready", "cancelled", "unprocessed", "partial", "all"]>>;
    /** The UUID of the collection associated with the document operation. */
    collectionId: z.ZodString;
};
