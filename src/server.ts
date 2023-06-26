import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { infoLogger, errorLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server

async function databaseConnection() {
  try {
    await mongoose.connect(config.database_url as string)
    infoLogger.info(`🤟🥂connect is  successfully`)
    server = app.listen(config.port, () => {
      infoLogger.info(`🍄 server is listining ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('failed to connect database', err)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

databaseConnection()

process.on('SIGTERM', () => {
  infoLogger.info(`😭 SIGTREM is resevied`)
  if (server) {
    server.close()
  }
})
