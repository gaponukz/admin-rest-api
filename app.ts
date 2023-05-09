import mongoose from 'mongoose'
import express, { Express, Request, Response } from 'express'
import { ISettings } from "./source/settings"
import { container } from './source/dependencies'
import * as userRoutes from './source/poutes/users'
import * as postRoutes from './source/poutes/posts'
import * as messageRoutes from './source/poutes/messages'

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

app.get('/get_posts', postRoutes.getAllPostsRoute)
app.get('/add_post', postRoutes.addPostRoute)
app.get('/remove_post', postRoutes.addPostRoute)

app.get('/send_message', messageRoutes.sendMessageRoute)
app.get('/get_messages', messageRoutes.getAllMessagesRoute)
app.get('/remove_message', messageRoutes.deleteMessageRoute)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
