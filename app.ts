import express, { Express, Request, Response } from 'express'
import { ISettings } from "./src/settings"
import { container } from './src/dependencies'
import mongoose from 'mongoose'

const settings = container.get<ISettings>("ISettings")
const app: Express = express()
const port = settings.port

mongoose.connect(settings.databaseUri, { useNewUrlParser: true } as any)

app.get('/', (request: Request, response: Response) => {
    response.send('Hello world')
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
