#!/usr/bin/env node
import { SERVICE } from '@server/config'
import startRemoteServer from '@server/remote'
import startTerminalSession from '@server/terminal'

export default async function entry() {
  if (SERVICE === 'REMOTE') {
    await startRemoteServer()
  } else {
    await startTerminalSession()
  }
}

entry().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})
