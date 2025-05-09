import type { GestellToolOutput } from '@client/types'
import type { Client } from '@modelcontextprotocol/sdk/client/index.js'

/*
 * Invokes an MCP tool for usage outside of chat contexts:
 * 1) Throws if the tool reports an error
 * 2) Tries to JSON.parse the output
 * 3) If parsing fails, returns the raw string
 *
 * @param client – an initialized MCP Client
 * @param name   – the name of the tool to call
 * @param args   – the arguments object for the tool
 * @returns      – either the parsed JSON (T) or the raw text
 */
export default async function runTool<T>(
  client: Client,
  name: string,
  args: Record<string, unknown>
): Promise<T> {
  const result = await client.callTool({ name, arguments: args })

  if (result.isError) {
    const errText = (result.content as GestellToolOutput[])[0]?.text ?? ''
    throw new Error(`MCP tool "${name}" error: ${errText}`)
  }

  const content = result.content as GestellToolOutput[]
  const text = content[0]?.text
  if (!text) throw new Error(`Empty response from ${name}`)

  try {
    return JSON.parse(text) as T
  } catch {
    return text as unknown as T
  }
}
