import "reflect-metadata"
import { injectable } from "inversify"
import * as dotenv from "dotenv"

interface ISettings {
    readonly port: number
    readonly databaseUri: string
    readonly adminApiKey: string
    readonly ownerTelegramId: number
    readonly telegramBotToken: string
}

@injectable()
class DotEnvSettings implements ISettings {
    readonly port: number
    readonly databaseUri: string
    readonly adminApiKey: string
    readonly ownerTelegramId: number
    readonly telegramBotToken: string

    constructor () {
        dotenv.config()

        this.port = 8000
        this.databaseUri = process.env.databaseUri
        this.adminApiKey = process.env.adminApiKey
        this.ownerTelegramId = parseInt(process.env.ownerTelegramId)
        this.telegramBotToken = process.env.telegramBotToken
    }
}

export { ISettings, DotEnvSettings }
