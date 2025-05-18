# CHANGELOG

## 0.3.1

- Improved Windsurf and Cursor UX

- Cleaned up build artifacts

## 0.3.0

- Added `mcp.json` manifest

- Normalized tool call conventions and synced to sdk

- Added observable schema input/outputs for tools in `client/artifacts`

- Ported observed zod schemas from sdk as seen in `@client/schemas/sdk`

## 0.2.2

- Remove `bun build` and switched to `rollup` (experimented with bun and not good for libraries that need type declarations)

- Fixed type declarations and intellisense displays

- Improved intellisense displays

## 0.2.1

- Updated ESM/CJS Exports

- Made sure `GESTELL_REMOTE_AUTH` can be changed via scripts

## 0.2.0

- Added header auth keys for remote server mode

- Added more verbose, clearer documentation

- Added more verbose and clear intellisense, including zod schemas to maximize LLM utility

- Fixed prompt tool calling on python and remote modalities

- Added python example workflows

- Added remote server example workflows

- Removed `Modality` in favour of a scope utility function for tools

- Added prompt utility functions
