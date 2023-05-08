import { getUTCDate } from '../utils'

class UserEntity {
    username: string
    key: string
    startPeriodDate: Date
    endPeriodDate: Date
    isKeyActive: boolean
    hasTrial: boolean
    impersonates: string | undefined
    uuid: string | undefined

    constructor (
        username: string,
        key: string,
        isKeyActive: boolean,
        hasTrial: boolean, 
        impersonates: string | undefined = undefined,
        uuid: string | undefined = undefined,
        startPeriodDate: Date | undefined = undefined,
        endPeriodDate: Date | undefined = undefined,
    ) {
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
    title: string
    description: string
    image: string

    constructor (
        title: string,
        description: string,
        image: string,
    ) {
        this.title = title
        this.description = description
        this.image = image
    }

    static fromObject(postObject: any): PostEntity {
        return new PostEntity(
            postObject.title,
            postObject.description,
            postObject.image
        )
    }
}

class MessageEntity {
    subject: string
    gmail: string
    message: string
    date: Date

    constructor (
        subject: string,
        gmail: string,
        message: string,
        date: Date
    ) {
        this.subject = subject
        this.gmail = gmail
        this.message = message
        this.date = date
    }

    static fromObject(messageObject: any): MessageEntity {
        return new MessageEntity(
            messageObject.subject,
            messageObject.gmail,
            messageObject.message,
            messageObject.date
        )
    }
}

export { UserEntity, PostEntity, MessageEntity }
