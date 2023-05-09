import { Request, Response } from 'express'
import checkAdminAuthentication from '../adminAuthorization'
import { getAllMessages, addMessage, deleteMessage } from '../logic/service'

export async function getAllMessagesRoute (request: Request, response: Response) {
    if (checkAdminAuthentication(request)) {
        response.json(await getAllMessages())

    } else {
        response.status(401)
        response.json([])
    }
}

export async function sendMessageRoute (request: Request, response: Response) {
    response.json(await addMessage(request)) 
}

export async function deleteMessageRoute (request: Request, response: Response) {
    if (checkAdminAuthentication(request)) {
        await deleteMessage(request).then(() => {
            response.json({ deletedCount: 1 })

        }).catch(error => {
            response.json({ deletedCount: 0 })
        })

    } else {
        response.status(401)
        response.json({ deletedCount: 0 })
    }
}