# Gestell MCP Workflows

## Node Workflows

These workflows work with the internal functions directly and differ from the library implementation in imports. The following is how to run these examples easily:

```bash
# Clone the repo
git clone https://github.com/Gestell-AI/mcp gestell-mcp
cd gestell-mcp

# Run the script
bun install
bun run workflow/simple.ts
```

To use it in your own projects, instead of:

```typescript
import startTerminalClient from '@client/terminal'
import runTool from '@client/tool'
```

change it to:

```typescript
import { startTerminalClient, runTool } from '@gestell/mcp'
```

Here are all the workflows you can run:

- [Prompt Workflow](./prompt.ts): Ideal when you just want to search or prompt an existing collection

- [Create & Manage Collection Workflow](./management.ts): When you want an agent to create and upload documents

- [Query Workflow](./query.ts): How to query collections and documents

- [Extract Features and Tables Workflow](./extractions.ts): When you want an agent to extract features from a collection post processing

- [Remote Server Workflow](./remote.ts): If setting up a remote MCP server for easy access across multiple clients. Demo includes optional authorization headers.

## Python Workflow

The simple workflow is replicated in python for demonstration purposes, it's setup using `uv` as follows:

```bash
# Install @gestell/mcp globally
npm install @gestell/mcp --global

# Clone the repo and cd into workflow/python
git clone https://github.com/Gestell-AI/mcp gestell-mcp
cd gestell-mcp/workflow/python

# sync and run
uv sync
uv run prompt.py
```

## Additional Notes

Heavily recommend you run through the <https://github.com/Gestell-AI/guides> repository to make sure you can run workflows like `Extractions` and `Query` easily.

Please open an issue if you would like to a certain type of workflow demonstrated or if workflows are unclear.
