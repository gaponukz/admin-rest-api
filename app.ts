import express, { Express, Request, Response } from 'express'
import { ISettings } from "./source/settings"
import { container } from './source/dependencies'
import mongoose from 'mongoose'

import { getAllUsers } from './source/logic/service'

const settings = container.get<ISettings>("ISettings")
const app: Express = express()
const port = settings.port

mongoose.connect(settings.databaseUri, { useNewUrlParser: true } as any)

app.use((request: Request, response: Response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Content-Type', 'application/json')
    console.log(`${request.method} ${response.statusCode} ${request.path}`)
    next()
})

app.get('/', async (request: Request, response: Response) => {
    response.json(await getAllUsers()) // test
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
