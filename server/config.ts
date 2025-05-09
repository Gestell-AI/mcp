import { config } from 'dotenv'

config()

// The Gestell API Key
export const API_KEY = process.env.GESTELL_API_KEY || ''

// The port for remote MCP server (defaults to 3000)
export const PORT = Number(process.env.GESTELL_MCP_PORT || 3000)

// The IP to bind the remote MCP server to (defaults to 0.0.0.0)
export const HOST = process.env.GESTELL_MCP_HOST || '0.0.0.0'

// The resources exposed in the MCP server (advanced = more tools exposed)
export type Modality = 'SIMPLE' | 'ADVANCED'

// The mode the MCP server is set to (defaults to SIMPLE)
export const MODE: Modality =
  (process.env.GESTELL_MCP_MODE as Modality) || 'SIMPLE'

// The service type either terminal or a remote http server
export type ServiceType = 'TERMINAL' | 'REMOTE'

// The service type for the server (defaults to TERMINAL)
export const SERVICE: ServiceType =
  (process.env.GESTELL_MCP_SERVICE_TYPE as ServiceType) || 'TERMINAL'

// Gestell MCP Configuration Controls
export interface GestellTerminalConfig {
  apiKey?: string
  mode?: Modality
}

export interface GestellRemoteConfig extends GestellTerminalConfig {
  port?: number
  host?: string
}
