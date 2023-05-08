import express, { Express, Request, Response } from 'express'
import mongoose from 'mongoose'

const app: Express = express()
const port = 8000

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true } as any)

app.get('/', (request: Request, response: Response) => {
    response.send('Hello world')
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
