# Development Quick Start

*A quick guide on how to run the MCP in any way possible. Server, terminal et al.*

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


// Start a remote server
const apiKey = '...'
const port = 3000
const host = 'localhost'

await startRemoteServer({
  apiKey,
  port,
  host
})

// Start a terminal client (loads configuration from .env)
const client = await startTerminalClient()
```
