import { getUTCDate } from '../utils'

class UserEntity {
    _id: number | undefined
    username: string
    key: string
    startPeriodDate: Date
    endPeriodDate: Date
    isKeyActive: boolean
    hasTrial: boolean
    impersonates: string | undefined
    uuid: string | undefined

    constructor (
        _id: number | undefined = undefined,
        username: string,
        key: string,
        isKeyActive: boolean,
        hasTrial: boolean,
        impersonates: string | undefined = undefined,
        uuid: string | undefined = undefined,
        startPeriodDate: Date | undefined = undefined,
        endPeriodDate: Date | undefined = undefined,
    ) {
        this._id = _id
        this.username = username
        this.key = key
        this.isKeyActive = isKeyActive
        this.hasTrial = hasTrial
        this.impersonates = impersonates
        this.uuid = uuid

        this.startPeriodDate = startPeriodDate || getUTCDate()
        this.endPeriodDate = endPeriodDate || getUTCDate()
    }

    static fromObject(userObject: any): UserEntity {
        return new UserEntity(
            userObject._id,
            userObject.username,
            userObject.key,
            userObject.isKeyActive,
            userObject.hasTrial,
            userObject.impersonates,
            userObject.uuid,
            userObject.startPeriodDate,
            userObject.endPeriodDate
        )
    }
}

class PostEntity {
    _id: number | undefined
    title: string
    description: string
    image: string

    constructor (
        _id: number | undefined = undefined,
        title: string,
        description: string,
        image: string,
    ) {
        this._id = _id
        this.title = title
        this.description = description
        this.image = image
    }

    static fromObject(postObject: any): PostEntity {
        return new PostEntity(
            postObject._id,
            postObject.title,
            postObject.description,
            postObject.image
        )
    }
}

class MessageEntity {
    _id: number | undefined
    subject: string
    gmail: string
    message: string
    date: Date

    constructor (
        _id: number | undefined = undefined,
        subject: string,
        gmail: string,
        message: string,
        date: Date
    ) {
        this._id = _id
        this.subject = subject
        this.gmail = gmail
        this.message = message
        this.date = date
    }

    static fromObject(messageObject: any): MessageEntity {
        return new MessageEntity(
            messageObject._id,
            messageObject.subject,
            messageObject.gmail,
            messageObject.message,
            messageObject.date
        )
    }
}

export { UserEntity, PostEntity, MessageEntity }
