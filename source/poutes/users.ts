import { Request, Response } from 'express'
import checkAdminAuthentication from '../adminAuthorization'
import { getAllUsers, registerClientAction } from '../logic/service'

async function getAllUsersRoute (request: Request, response: Response) {
    if (checkAdminAuthentication(request)) {
        response.json(await getAllUsers())

    } else {
        response.status(401)
        response.json([])
    }
}

async function registerClientActionRoute (request: Request, response: Response) {
    response.json(await registerClientAction(request))
}

export { getAllUsersRoute, registerClientActionRoute }