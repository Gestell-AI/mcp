#!/usr/bin/env node

import 'colors'
import { MODE, SERVICE } from '@server/config'
import startRemoteServer from '@server/remote'
import startTerminalSession from '@server/terminal'

export default async function entry() {
  console.log(`[GESTELL] SERVICE TYPE: ${SERVICE}`.blue.bold)
  console.log(`[GESTELL] SERVICE MODE: ${MODE}`.blue.bold)

  if (SERVICE === 'REMOTE') {
    await startRemoteServer()
  } else {
    await startTerminalSession()
  }
}

// Ensure proper error handling for CLI
entry().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})
