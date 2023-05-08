import { Document } from 'mongoose'

interface UserDocument extends Document {
    username: string
    key: string
    startPeriodDate: Date
    endPeriodDate: Date
    isKeyActive: boolean
    hasTrial: boolean
    impersonates: string | undefined
    uuid: string | undefined
}

interface PostDocument extends Document {
    title: string
    description: string
    image: string
}

interface MessageDocument extends Document {
    subject: string
    gmail: string
    message: string
    date: Date
}


export { UserDocument, PostDocument, MessageDocument }
