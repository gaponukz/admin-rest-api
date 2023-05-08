import * as dotenv from "dotenv"

interface ISettings {
    port: number
    databaseUri: string
    adminApiKey: string
    ownerTelegramId: number
    telegramBotToken: string
}

export default class DotEnvSettings implements ISettings {
    port: number
    databaseUri: string
    adminApiKey: string
    ownerTelegramId: number
    telegramBotToken: string

    constructor () {
        dotenv.config()

        this.port = 8000
        this.databaseUri = process.env.databaseUri
        this.adminApiKey = process.env.adminApiKey
        this.ownerTelegramId = parseInt(process.env.ownerTelegramId)
        this.telegramBotToken = process.env.telegramBotToken
    }
}
