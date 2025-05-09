import type { GestellToolOutput } from '@client/types'
import type { Client } from '@modelcontextprotocol/sdk/client/index.js'

/**
 * Invokes a tool on the given MCP client and returns its result.
 *
 * @template T - The expected type of the parsed result.
 * @param client - An initialized MCP Client instance.
 * @param name - The name of the tool to call.
 * @param args - A record of arguments to pass to the tool.
 * @returns A promise that resolves to the tool’s output parsed as type T, or the raw text if JSON parsing fails.
 * @throws If the tool invocation returns an error, or if the response is empty.
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
