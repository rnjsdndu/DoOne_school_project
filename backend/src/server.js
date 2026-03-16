import cron from 'node-cron'
import { createApp } from './app.js'
import { env } from './config/env.js'
import { assignMissionBatch } from './services/missionService.js'

const app = createApp()

cron.schedule('0 0 * * *', async () => {
  await assignMissionBatch()
})

app.listen(env.port, () => {
  console.log(`DO1 backend listening on ${env.port}`)
})
