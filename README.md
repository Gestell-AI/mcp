# Gestell MCP SDK

![license](https://img.shields.io/badge/license-MIT-blue)
![version](https://img.shields.io/badge/version-0.5.0-blue)

A full featured MCP SDK for Gestell with multiple modalities.

Make sure to grab your API Key for Gestell [here](https://platform.gestell.ai).

- Review the [Development Guide](./docs/DEV.md) here.

- Review the [MCP Tool Spec](./docs/SPEC.md) here.

- Review [comprehensive demo workflows on usage and development here](./docs/demos).

## Windsurf Quick Start

Add this in either:

1. **Project Specific**: create `.windsurf/mcp.json` in your repo and paste the snippet.
2. **Global**: Windsurf → Settings → Cascade → View Raw Config to edit the same JSON from the UI.

```json
{
  "mcpServers": {
    "gestell": {
      "command": "npx",
      "args": ["-y", "@gestell/mcp"],
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
      "args": ["-y", "@gestell/mcp"],
      "env": {
        "GESTELL_API_KEY": "gestell-...-..."
      }
    }
  }
}
```

---

- Review the [CHANGELOG](./docs/CHANGELOG.md) to keep up to date on all changes.
