import { type GestellRemoteConfig } from '@server/config';
export declare const fastify: import("fastify").FastifyInstance<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault> & PromiseLike<import("fastify").FastifyInstance<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>> & {
    __linterBrands: "SafePromiseLike";
};
/**
 * Starts the Gestell MCP HTTP server, exposing an endpoint for remote MCP tool calls.
 *
 * @param config - Configuration options for the remote server.
 * @param config.apiKey - Your Gestell API key (defaults to `API_KEY` from env).
 * @param config.host   - Hostname or IP to bind the server to (defaults to `HOST` from env).
 * @param config.port   - Port number to listen on (defaults to `PORT` from env).
 * @param config.auth   - Optional bearer token required in the `Authorization` header.
 *                        If set, requests without a matching header will receive 401.
 * @returns A promise that resolves once the server is listening.
 */
export default function startRemoteServer(config?: GestellRemoteConfig): Promise<void>;
