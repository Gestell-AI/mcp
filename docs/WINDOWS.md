# Windows MCP Setup

Run the `fnm` install script from [Node.js' Website](https://nodejs.org/en/download)

Create profile for powershell if not set:

```bash
if (!(Test-Path -Path $PROFILE)) {
  New-Item -ItemType File -Path $PROFILE -Force
}

notepad $PROFILE
```

Then paste this in:

```text
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
```

Load the profile

```bash
. $PROFILE
```

Verify `node` and `npm` are accessible:

```bash
node --version
npm --version
```

Setup your `mcp.json` file using the following format:

```json
{
  "mcpServers": {
    "gestell": {
      "command": "powershell",
      "args": [
        "npx -y @gestell/mcp@latest"
      ],
      "env": {
        "GESTELL_API_KEY": "gestell-...-..."
      }
    }
  }
}
```
