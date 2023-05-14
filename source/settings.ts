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
        this.databaseUri = process.env.databaseUri as string
        this.adminApiKey = process.env.adminApiKey as string
        this.ownerTelegramId = parseInt(process.env.ownerTelegramId as any)
        this.telegramBotToken = process.env.telegramBotToken as string
    }
}

export { ISettings, DotEnvSettings }
