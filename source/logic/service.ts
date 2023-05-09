import { Request } from 'express'
import { container } from '../dependencies'
import { IRepository } from './repositories'
import { generateUserKey, getUTCDate, afterHours } from '../utils'
import { UserEntity, PostEntity, MessageEntity } from './enteties'

const userDB = container.get<IRepository<UserEntity>>("IRepository<UserEntity>")

async function getAllUsers(): Promise<UserEntity[]> {
    return await userDB.getAll()
}

async function getUserFromRequest(request: Request): Promise<UserEntity> {
    return await userDB.getBy({ key: request.query.key })
}

async function getSameUuidUsers(uuid: string): Promise<UserEntity[]> {
    return (await userDB.getAll()).filter(user => uuid && user.uuid == uuid)
}

async function registerClientAction(request: Request): Promise<UserEntity> {
    const user = await getUserFromRequest(request)

    if (user.isKeyActive) {
        let howMuchLeft = user.endPeriodDate.getTime() - user.startPeriodDate.getTime()
        howMuchLeft /= (60 * 60 * 1000)

        user.startPeriodDate = getUTCDate()
        user.endPeriodDate = afterHours(howMuchLeft)

        let sameUuidUsers = await getSameUuidUsers(request.query.uuid as string)
        sameUuidUsers =  sameUuidUsers.filter(_user => _user.key != user.key)

        await userDB.update(user, {
            startPeriodDate: user.startPeriodDate,
            endPeriodDate: user.endPeriodDate,
            isKeyActive: true,
            uuid: request.query.uuid,
            impersonates: sameUuidUsers[0]
        })

    }

    return user
}

async function createUser(user: UserEntity): Promise<UserEntity> {
    user.key = generateUserKey(user.username || '')
    return await userDB.create(user)
}

export { getAllUsers, registerClientAction, createUser }
