import express, { Express, Request, Response } from 'express'

const app: Express = express()
const port = 8000

app.get('/', (request: Request, response: Response) => {
    response.send('Hello world')
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
