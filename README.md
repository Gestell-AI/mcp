# Gestell MCP SDK

![license](https://img.shields.io/badge/license-MIT-blue)
![version](https://img.shields.io/badge/version-0.1.0-blue)

A full featured MCP SDK for Gestell with multiple modalities

## Quick Start

Install the MCP Server (globally if wanting to run it via the `gestell-mcp` command)

```bash
npm install @gestell/mcp
bun add @gestell/mcp
```

Configure your environment variables. You only need to set `GESTELL_API_KEY` if using terminal.

```env
# Remote Configuration
GESTELL_MCP_SERVICE_TYPE="REMOTE" # Can be REMOTE or TERMINAL
GESTELL_MCP_PORT=3000
GESTELL_MCP_HOST="localhost"

# Modality Configuration
GESTELL_MCP_MODE="SIMPLE" # Can be SIMPLE OR ADVANCED

# Client Configuration
GESTELL_API_KEY="..."
GESTELL_MCP_URL="..."
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

// Start a terminal session (NOTE: you need to specify env variables for the terminal client)
const client = await startTerminalClient()
```

## Agent workflows

### The `SIMPLE` modality

Reducing what the model observes in context is critical for maintaining high accuracy.
This is why the simple modality only exposes `search` and `prompt`.

This makes this modality ideal to be used in tandem with other MCPs in context:

```typescript
import { config } from 'dotenv'
import { startTerminalClient, runTool } from '@gestell/mcp'
config()

const collectionId = process.env.GESTELL_COLLECTION_ID || ''
const client = await startTerminalClient()

const summary = await runTool<string>(
  client,
  'promptCollection', // or 'searchCollection'
  {
    collectionId,
    prompt: 'Give me a summary of the documents in this collection'
  }
)

console.log(summary)
```

### The `ADVANCED` modality

The advanced modality is only recommended when Gestell is the only MCP available in context. It includes all features to create and manage collections:

#### Tools Available

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

To learn about the `ADVANCED` modality more, review all [comprehensive demo workflows here](./workflow).
