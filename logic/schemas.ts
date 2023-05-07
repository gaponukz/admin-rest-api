import { Schema } from 'mongoose'
import { getUTCDate } from '../utils'

const UserSchema: Schema = new Schema({
    id: {type: Number, default: 0},
    username: {type: String, required: true},
    key: {type: String, required: true},
    hasTrial: {type: Boolean, default: true},
    startPeriodDate: {type: Date, default: getUTCDate()},
    endPeriodDate: {type: Date, required: true},
    isKeyActive: {type: Boolean, default: false},
    impersonates: {type: String, default: undefined},
    uuid: {type: String, default: undefined}
})

const PostSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true}
})

const MessageSchema = new Schema({
    subject: {type: String, required: true},
    gmail: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: Date, default: getUTCDate()}
})

export {UserSchema, PostSchema, MessageSchema }