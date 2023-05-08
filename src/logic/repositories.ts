import mongoose, { Model, Document } from 'mongoose'
import { injectable } from "inversify"
import { User, Post, Message } from './interfaces'
import { UserSchema, PostSchema, MessageSchema } from './schemas'
import { UserEntity, PostEntity, MessageEntity } from './enteties'
import { sendTelegramMessage } from '../utils'

interface UserDocument extends Document, User {}
interface PostDocument extends Document, Post {}
interface MessageDocument extends Document, Message {}

interface IRepository<Entity> {
    getBy(key: string, fields: any): Promise<Entity>
    getAll(): Promise<Entity[]>
    create(user: Entity): Promise<Entity>
    update(user: Entity, fields: any): Promise<Entity>
    delete(user: Entity): void
}

@injectable()
class UserRepository implements IRepository<UserEntity> {
    private mongoUser: Model<UserDocument>

    constructor() {
        this.mongoUser = mongoose.model<UserDocument>('User', UserSchema)
    }

    async create(user: UserEntity): Promise<UserEntity> {
        const newUser = new this.mongoUser(user)
        await newUser.save()

        return UserEntity.fromObject(newUser)
    }

    async update(user: UserEntity, fields: any): Promise<UserEntity> {
        return UserEntity.fromObject(await this.mongoUser.updateOne({ key: user.key }, fields))
    }

    async delete(user: UserEntity) {
        await this.mongoUser.deleteOne({ key: user.key })
    }

    async getBy(fields: any): Promise<UserEntity> {
        return UserEntity.fromObject(await this.mongoUser.findOne(fields))
    }

    async getAll(): Promise<UserEntity[]> {
        return (await this.mongoUser.find()).map(user => UserEntity.fromObject(user))
    }
}

@injectable()
class PostRepository implements IRepository<PostEntity> {
    private mongoPost: Model<PostDocument>

    constructor() {
        this.mongoPost = mongoose.model<PostDocument>('Post', PostSchema)
    }

    async create(post: PostEntity): Promise<PostEntity> {
        const newPost = new this.mongoPost(post)
        await newPost.save()

        return PostEntity.fromObject(newPost)
    }

    async update(post: PostEntity, fields: any): Promise<PostEntity> {
        return PostEntity.fromObject(await this.mongoPost.updateOne({ description: post.description }, fields))
    }

    async delete(post: PostEntity) {
        await this.mongoPost.deleteOne({ description: post.description })
    }

    async getBy(fields: any): Promise<PostEntity> {
        return PostEntity.fromObject(await this.mongoPost.findOne(fields))
    }

    async getAll(): Promise<PostEntity[]> {
        return (await this.mongoPost.find()).map(post => PostEntity.fromObject(post))
    }
}

@injectable()
class MessageRepository implements IRepository<MessageEntity> {
    private mongoMessage: Model<MessageDocument>

    constructor() {
        this.mongoMessage = mongoose.model<MessageDocument>('Message', MessageSchema)
    }

    async create(post: MessageEntity): Promise<MessageEntity> {
        const newMessage = new this.mongoMessage(post)
        await newMessage.save()

        return MessageEntity.fromObject(newMessage)
    }

    async update(message: MessageEntity, fields: any): Promise<MessageEntity> {
        return MessageEntity.fromObject(await this.mongoMessage.updateOne({ date: message.date }, fields))
    }

    async delete(message: MessageEntity) {
        await this.mongoMessage.deleteOne({ date: message.date  })
    }

    async getBy(fields: any): Promise<MessageEntity> {
        return MessageEntity.fromObject(await this.mongoMessage.findOne(fields))
    }

    async getAll(): Promise<MessageEntity[]> {
        return (await this.mongoMessage.find()).map(message => MessageEntity.fromObject(message))
    }
}

class SendTelegramMessageRepositoryDecorator extends MessageRepository {
    private messageRepository: MessageRepository

    constructor(messageRepository: MessageRepository) {
        super()
        this.messageRepository = messageRepository
    }

    async create(message: MessageEntity): Promise<MessageEntity> {
        await sendTelegramMessage(message, async () => {
            await this.messageRepository.create(message)
        })

        return message
    }
}

export {
    IRepository,
    UserRepository,
    PostRepository,
    MessageRepository,
    SendTelegramMessageRepositoryDecorator
}
