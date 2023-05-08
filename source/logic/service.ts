import { container } from '../dependencies'
import { IRepository } from './repositories'
import { UserEntity, PostEntity, MessageEntity } from './enteties'

const userDB = container.get<IRepository<UserEntity>>("IRepository<UserEntity>")

async function getAllUsers(): Promise<UserEntity[]> {
    return await userDB.getAll()
}

export { getAllUsers }