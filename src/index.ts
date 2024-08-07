import 'reflect-metadata'
import dotenv from 'dotenv'
import { setupInversifyExpressApp } from './adapters/inversify-express'
import Mongodb from './config/database'
import http from 'http'

dotenv.config()

const PORT = process.env?.PORT ?? 8000
const inversifyExpressApp = setupInversifyExpressApp()

const initServer = async () => {
  await Mongodb.init()
  const httpServer = http.createServer(inversifyExpressApp)
  httpServer.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
  })
}

initServer()
