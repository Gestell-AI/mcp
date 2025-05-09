# Gestell MCP SDK

![license](https://img.shields.io/badge/license-MIT-blue)
![version](https://img.shields.io/badge/version-0.2.0-blue)

A full featured MCP SDK for Gestell with multiple modalities

Review all [comprehensive workflows here](./workflow)

## Quick Start

Install the MCP Server (globally if wanting to run it via the `gestell-mcp` command)

```bash
npm install @gestell/mcp
bun add @gestell/mcp
```

Configure your environment variables. You only need to set `GESTELL_API_KEY` if using terminal.

```env
# Service type, can be REMOTE or TERMINAL
GESTELL_MCP_SERVICE_TYPE="TERMINAL"

# Remote Configuration
GESTELL_MCP_PORT=3000
GESTELL_MCP_HOST="localhost"
GESTELL_REMOTE_AUTH="" # optional

# Gestell SDK Client Configuration
GESTELL_API_KEY="..."
```

Run the MCP Service (this will load the `.env` in your `$PWD`)

```bash
gestell-mcp
```

Alternatively, create your own start scripts

```typescript
import { startRemoteServer, startTerminalClient } from '@gestell/mcp'

// Arguments are optional
const apiKey = '...'
const port = 3000
const host = 'localhost'
const mode = 'SIMPLE'

// Start a remote server
await startRemoteServer({
  apiKey,
  port,
  host,
  mode
})

// Start a terminal client
const client = await startTerminalClient()
```

## Tools Available

- **Prompt**
- **Query**

- **Collections**
  - Get
  - List
  - Create
  - Update

- **Documents**
  - Get
  - List
  - Upload
  - Reprocess
  - Export
  - Delete

- **Tables**
  - Query
  - Export

- **Features**
  - Query
  - Export

Review [comprehensive workflows on usage here](./workflow)
