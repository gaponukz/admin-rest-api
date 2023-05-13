import { Request, Response } from 'express'
import { checkAdminAuthentication } from '../adminAuthorization'
import { getAllPosts, addPost, deletePost } from '../logic/service'
import { container } from '../dependencies'
import { ISettings } from "../settings"

const settings = container.get<ISettings>("ISettings")

export async function getAllPostsRoute (request: Request, response: Response) {
    response.json(await getAllPosts())
}

export async function addPostRoute (request: Request, response: Response) {
    if (checkAdminAuthentication(request, settings.adminApiKey)) {
        response.json(await addPost(request))

    } else {
        response.status(401)
        response.json({})
    }
}


export async function removePostRoute (request: Request, response: Response) {
    if (checkAdminAuthentication(request, settings.adminApiKey)) {
        await deletePost(request).then(() => {
            response.json({ deletedCount: 1 })

        }).catch(error => {
            response.json({ deletedCount: 0 })
        })

    } else {
        response.status(401)
        response.json({ deletedCount: 0 })
    }
}