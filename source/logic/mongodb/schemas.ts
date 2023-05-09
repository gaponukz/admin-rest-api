import { Schema } from 'mongoose'
import { UserDocument, PostDocument, MessageDocument } from './documents'
import { getUTCDate } from '../../utils'

const UserSchema = new Schema({
    username: {type: String, required: true},
    key: {type: String, required: true},
    hasTrial: {type: Boolean, default: true},
    start_period_date: {type: Date, required: true},
    end_period_date: {type: Date, required: true},
    isKeyActive: {type: Boolean, default: false},
    impersonates: {type: String, default: undefined},
    uuid: {type: String, default: undefined}
})

const PostSchema = new Schema<PostDocument>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true}
})

const MessageSchema = new Schema<MessageDocument>({
    subject: {type: String, required: true},
    gmail: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: Date, default: getUTCDate()}
})

export {UserSchema, PostSchema, MessageSchema }
