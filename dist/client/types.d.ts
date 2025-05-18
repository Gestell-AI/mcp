export * from '@client/schemas/collection';
export * from '@client/schemas/document';
export * from '@client/schemas/feature';
export * from '@client/schemas/organization';
export * from '@client/schemas/search';
export * from '@client/schemas/table';
/**
 * Represents a single message output from a Gestell tool invocation.
 *
 * @interface GestellToolOutput
 */
export interface GestellToolOutput {
    /**
     * The category of the output message (e.g., "text", "error", etc.).
     */
    type: string;
    /**
     * The content of the message returned by the tool.
     */
    text: string;
}
