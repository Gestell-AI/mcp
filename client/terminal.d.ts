import { Client } from '@modelcontextprotocol/sdk/client/index.js';
/**
 * Launches the Gestell MCP client over stdio by spawning a Node.js process.
 *
 * @param entrypoint - Filesystem path to the compiled MCP server entrypoint script.
 *                      Defaults to the `dist/entry.js` file relative to this module.
 * @returns A Promise that resolves to a connected MCP `Client` instance ready to issue tool calls.
 */
export default function startTerminalClient(entrypoint?: string): Promise<Client<{
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
        } | undefined;
    } | undefined;
}, {
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
        } | undefined;
    } | undefined;
}, {
    [x: string]: unknown;
    _meta?: {
        [x: string]: unknown;
    } | undefined;
}>>;
