import { Request, Response } from 'express'
import { checkAdminAuthentication } from '../adminAuthorization'
import {
    getAllUsers,
    createUser,
    registerClientAction,
    editUserData,
    deleteUser
} from '../logic/service'
import { container } from '../dependencies'
import { ISettings } from "../settings"

const settings = container.get<ISettings>("ISettings")

export async function getAllUsersRoute (request: Request, response: Response) {
    if (checkAdminAuthentication(request, settings.adminApiKey)) {
        response.json(await getAllUsers())

    } else {
        response.status(401)
        response.json([])
    }
}

export async function addUserRoute (request: Request, response: Response) {
    if (checkAdminAuthentication(request, settings.adminApiKey)) {
        response.json(await createUser(request))

    } else {
        response.status(401)
        response.json({})
    }
}

export async function registerClientActionRoute (request: Request, response: Response) {
    response.json(await registerClientAction(request))
}

export async function editUserDataRoute (request: Request, response: Response) {
    if (checkAdminAuthentication(request, settings.adminApiKey)) {
        response.json(await editUserData(request))

    } else {
        response.status(401)
        response.json({})
    }
}

export async function removeUserRoute (request: Request, response: Response) {
    if (checkAdminAuthentication(request, settings.adminApiKey)) {
        await deleteUser(request).then(() => {
            response.json({ deletedCount: 1 })

        }).catch(error => {
            response.json({ deletedCount: 0 })
        })

    } else {
        response.status(401)
        response.json({ deletedCount: 0 })
    }
}
