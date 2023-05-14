import { Request } from 'express'
import { container } from '../dependencies'
import { IRepository, SendTelegramMessageDecorator } from './repositories'
import { generateUserKey, getUTCDate, afterHours } from '../utils'
import { UserEntity, PostEntity, MessageEntity } from './enteties'
import { QueryUserParser, PostBodyUserParser, ParserResult } from '../requestUserParsers'

const userDB = container.get<IRepository<UserEntity>>("IRepository<UserEntity>")
const postsDB = container.get<IRepository<PostEntity>>("IRepository<PostEntity>")
const messagesDB = new SendTelegramMessageDecorator(
    container.get<IRepository<MessageEntity>>("IRepository<MessageEntity>")
)

export async function getAllUsers(): Promise<UserEntity[]> {
    return await userDB.getAll()
}

async function getUserFromRequest(request: Request): Promise<ParserResult | undefined> {
    let parser = new PostBodyUserParser()
    parser = new QueryUserParser(parser)

    return await parser.getUserAndUuidFromRequest(request, userDB)
}

async function getSameUuidUsers(uuid: string): Promise<UserEntity[]> {
    return (await userDB.getAll()).filter(user => uuid && user.uuid == uuid)
}

export async function registerClientAction(request: Request): Promise<UserEntity | undefined> {
    const result = await getUserFromRequest(request)
    if (!result) return

    const { user, uuid } = result

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
            uuid: uuid,
            impersonates: sameUuidUsers[0]
        })

    }

    return user
}

export async function createUser(request: Request): Promise<UserEntity> {
    const user = UserEntity.fromObject(request)
    user.key = generateUserKey(user.username || '')
    return await userDB.create(user)
}

export async function editUserData(request: Request): Promise<UserEntity> {
    const user = await userDB.getBy({ key: request.query.key })

    delete request.query.key
    delete request.query.adminApiKey

    return await userDB.update(user, request.query)
}

export async function deleteUser(request: Request): Promise<void> {
    await userDB.delete(await userDB.getBy( { key: request.query.key } ))
}

export async function getAllPosts(): Promise<PostEntity[]> {
    return await postsDB.getAll()
}

export async function addPost(request: Request): Promise<PostEntity> {
    const post = PostEntity.fromObject(request)
    return await postsDB.create(post)
}

export async function deletePost(request: Request): Promise<void> {
    await postsDB.delete(await postsDB.getBy( { _id: request.query.id } ))
}

export async function addMessage(request: Request): Promise<MessageEntity> {
    const message = MessageEntity.fromObject(request)
    return await messagesDB.create(message)
}

export async function getAllMessages(): Promise<MessageEntity[]> {
    return await messagesDB.getAll()
}

export async function deleteMessage(request: Request): Promise<void> {
    await messagesDB.delete(await messagesDB.getBy( { _id: request.query.id } ))
}