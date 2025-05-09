import { config } from 'dotenv'

config()

// The Gestell API Key
export const API_KEY = process.env.GESTELL_API_KEY || ''

// The port for remote MCP server (defaults to 3000)
export const PORT = Number(process.env.GESTELL_MCP_PORT || 3000)

// The IP to bind the remote MCP server to (defaults to 0.0.0.0)
export const HOST = process.env.GESTELL_MCP_HOST || '0.0.0.0'

// Optional Authorization Header for MCP Server
export const REMOTE_AUTH = process.env.GESTELL_REMOTE_AUTH || ''

// The service type either terminal or a remote http server
export type ServiceType = 'TERMINAL' | 'REMOTE'

// The service type for the server (defaults to TERMINAL)
export const SERVICE: ServiceType =
  (process.env.GESTELL_MCP_SERVICE_TYPE as ServiceType) || 'TERMINAL'

/**
 * Configuration options for a Gestell terminal-based MCP client.
 */
export interface GestellTerminalConfig {
  /**
   * Gestell API key used for authentication.
   * Defaults to the `GESTELL_API_KEY` environment variable if omitted.
   */
  apiKey?: string
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
  port?: number
  /**
   * Hostname or IP address for the HTTP server to bind to.
   * Defaults to the `HOST` environment variable if omitted.
   */
  host?: string
  /**
   * Token required in the `Authorization` header.
   * If provided, incoming requests must include this exact value or will receive 401.
   */
  auth?: string
}
