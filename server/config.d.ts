export declare const API_KEY: string;
export declare const PORT: number;
export declare const HOST: string;
export declare const REMOTE_AUTH: string;
export type ServiceType = 'TERMINAL' | 'REMOTE';
export declare const SERVICE: ServiceType;
/**
 * Configuration options for a Gestell terminal-based MCP client.
 */
export interface GestellTerminalConfig {
    /**
     * Gestell API key used for authentication.
     * Defaults to the `GESTELL_API_KEY` environment variable if omitted.
     */
    apiKey?: string;
}
/**
 * Configuration options for a Gestell remote MCP HTTP server.
 * Extends the terminal config with network and auth settings.
 */
export interface GestellRemoteConfig extends GestellTerminalConfig {
    /**
     * Port number on which the HTTP server listens.
     * Defaults to the `PORT` environment variable if omitted.
     */
    port?: number;
    /**
     * Hostname or IP address for the HTTP server to bind to.
     * Defaults to the `HOST` environment variable if omitted.
     */
    host?: string;
    /**
     * Token required in the `Authorization` header.
     * If provided, incoming requests must include this exact value or will receive 401.
     */
    auth?: string;
}
