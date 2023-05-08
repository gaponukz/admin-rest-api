import "reflect-metadata"
import { Container } from "inversify"
import { ISettings, DotEnvSettings } from "./settings"
import {
    IRepository,
    UserRepository,
    PostRepository,
    MessageRepository
} from './logic/repositories'
import { UserEntity, PostEntity, MessageEntity } from './logic/enteties'

const container = new Container()

container.bind<ISettings>("ISettings").to(DotEnvSettings)
container.bind<IRepository<UserEntity>>("IRepository<UserEntity>").to(UserRepository)
container.bind<IRepository<PostEntity>>("IRepository<PostEntity>").to(PostRepository)
container.bind<IRepository<MessageEntity>>("IRepository<MessageEntity>").to(MessageRepository)

export { container }
