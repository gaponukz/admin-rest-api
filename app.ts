import mongoose from 'mongoose'
import express, { Express, Request, Response } from 'express'
import { ISettings } from "./source/settings"
import { container } from './source/dependencies'
import * as userRoutes from './source/poutes/users'

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

app.get('/get_all', userRoutes.getAllUsersRoute)
app.get('/get_user', userRoutes.registerClientActionRoute)
app.get('/edit_user', userRoutes.editUserDataRoute)
app.get('/remove_user', userRoutes.removeUserRoute)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
