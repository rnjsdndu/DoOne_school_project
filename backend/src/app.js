import cors from 'cors'
import express from 'express'
import apiRouter from './routes/index.js'
import { env } from './config/env.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { notFound } from './middlewares/notFound.js'

export function createApp() {
  const app = express()

  app.use(
    cors({
      origin: env.clientOrigin,
      credentials: true,
    }),
  )
  app.use(express.json())

  app.get('/health', (req, res) => {
    res.json({ success: true, message: 'OK' })
  })

  app.use('/api', apiRouter)
  app.use(notFound)
  app.use(errorHandler)

  return app
}
