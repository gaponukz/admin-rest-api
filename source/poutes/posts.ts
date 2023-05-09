import { Request, Response } from 'express'
import checkAdminAuthentication from '../adminAuthorization'
import { getAllPosts, addPost, deletePost } from '../logic/service'

export async function getAllPostsRoute (request: Request, response: Response) {
    if (checkAdminAuthentication(request)) {
        response.json(await getAllPosts())

    } else {
        response.status(401)
        response.json([])
    }
}

export async function addPostRoute (request: Request, response: Response) {
    if (checkAdminAuthentication(request)) {
        response.json(await addPost(request))

    } else {
        response.status(401)
        response.json({})
    }
}


export async function removePostRoute (request: Request, response: Response) {
    if (checkAdminAuthentication(request)) {
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