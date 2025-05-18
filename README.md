# Gestell MCP SDK

![license](https://img.shields.io/badge/license-MIT-blue)
![version](https://img.shields.io/badge/version-1.0.1-blue)
[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/7sUmZuDYQ6cd8WbCiCCnfR/HhgpL3FetZmz1eVLbATvDe/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/7sUmZuDYQ6cd8WbCiCCnfR/HhgpL3FetZmz1eVLbATvDe/tree/master)

A full featured MCP SDK for Gestell with multiple modalities.

Make sure to grab your API Key for Gestell [here](https://platform.gestell.ai).

- **[Windsurf and Cursor Vibe Code Guide](./docs/VIBE.md)**

- **[Windows Setup Guide](./docs/WINDOWS.md)**

- **[Development Guide](./docs/DEV.md)**

- **[MCP Tool Spec](./docs/SPEC.md)**

- **[Development Workflows](./docs/demos)**

## Windsurf Quick Start

Add this in either:

1. **Project Specific**: create `.windsurf/mcp.json` in your repo and paste the snippet.
2. **Global**: Windsurf → Settings → Cascade → View Raw Config to edit the same JSON from the UI.

```json
{
  "mcpServers": {
    "gestell": {
      "command": "npx",
      "args": ["-y", "@gestell/mcp@latest"],
      "env": {
        "GESTELL_API_KEY": "gestell-...-..."
      }
    }
  }
}
```

## Cursor Quick Start

Add this in either:

1. **Project Specific**: create `.cursor/mcp.json` in your repo and paste the snippet.
2. **Global**: open Cursor → Settings → MCP → “Edit global mcp.json”; paste the snippet anywhere inside the top-level `mcpServers` object.

Then restart Cursor (or reload the window) so the agent can detect the new server.

```json
{
  "mcpServers": {
    "gestell": {
      "command": "npx",
      "args": ["-y", "@gestell/mcp@latest"],
      "env": {
        "GESTELL_API_KEY": "gestell-...-..."
      }
    }
  }
}
```

---

Alternatively you can install it directly and run `gestell-mcp`:

```bash
npm install --global @gestell/mcp@latest
# Run the command directly
gestell-mcp
```

---

- Review the **[CHANGELOG](./docs/CHANGELOG.md)** to keep up to date on all changes.
