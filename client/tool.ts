import type { GestellToolOutput } from '@client/types'
import type { Client } from '@modelcontextprotocol/sdk/client/index.js'

export default async function runTool<T>(
  client: Client,
  name: string,
  args: Record<string, unknown>
): Promise<T> {
  const result = await client.callTool({ name, arguments: args })
  const content = result.content as GestellToolOutput[]
  const text = content[0]?.text
  if (!text) throw new Error(`Empty response from ${name}`)
  return JSON.parse(text) as T
}
