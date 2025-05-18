import os
import sys
import asyncio
from contextlib import AsyncExitStack
from typing import Any, Dict, Tuple
from dotenv import load_dotenv
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

load_dotenv()


async def start_terminal_client() -> Tuple[ClientSession, AsyncExitStack]:
    server_params = StdioServerParameters(command="gestell-mcp", args=[])

    exit_stack = AsyncExitStack()
    stdio, write = await exit_stack.enter_async_context(stdio_client(server_params))
    session = await exit_stack.enter_async_context(ClientSession(stdio, write))
    await session.initialize()
    return session, exit_stack


async def run_tool(
    session: ClientSession, tool_name: str, arguments: Dict[str, Any]
) -> str:
    resp = await session.call_tool(tool_name, arguments)
    if not resp.content:
        raise RuntimeError(f"No response from tool `{tool_name}`")
    return resp.content[0].text


async def main():
    collection_id = os.getenv("GESTELL_COLLECTION_ID", "")
    if not collection_id:
        print("Error: GESTELL_COLLECTION_ID must be set (check your .env).")
        sys.exit(1)

    try:
        session, stack = await start_terminal_client()
    except FileNotFoundError as e:
        print("Failed to launch `gestell-mcp`:", e)
        sys.exit(1)

    summary = await run_tool(
        session,
        "promptCollection",
        {
            "collectionId": collection_id,
            "prompt": "Give me a summary of the documents in this collection",
        },
    )

    print("\nSummary:\n")
    print(summary)

    await stack.aclose()


if __name__ == "__main__":
    asyncio.run(main())
