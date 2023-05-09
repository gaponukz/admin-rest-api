import express, { Express, Request, Response } from 'express'
import { ISettings } from "./source/settings"
import { container } from './source/dependencies'
import mongoose from 'mongoose'

import checkAdminAuthentication from './source/adminAuthorization'
import { getAllUsers, registerClientAction } from './source/logic/service'

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
    response.json({isWork: true}) // test
})

app.get('/get_all', async (request: Request, response: Response) => {
    if (checkAdminAuthentication(request)) {
        console.log(request.headers.authorization)
        response.json(await getAllUsers())

    } else {
        response.status(401)
        response.json([])
    }
})

app.get('/get_user', async (request: Request, response: Response) => {
    response.json(await registerClientAction(request))
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
