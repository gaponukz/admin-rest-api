import { Request } from 'express'
import { IRepository } from './logic/repositories'
import { UserEntity } from './logic/enteties'

export interface ParserResult {
    user: UserEntity
    uuid: string
}

export abstract class IRequestUserParser {
    constructor(protected previousParser: IRequestUserParser | undefined = undefined) {
        this.previousParser = previousParser
    }
    
    abstract getUserAndUuidFromRequest(request: Request, userDB: IRepository<UserEntity>): Promise<ParserResult | undefined>
}

abstract class RequestUserParserTemplate extends IRequestUserParser {
    abstract getUserKeyFromRequest(request: Request): string
    abstract getUserUuidFromRequest(request: Request): string

    async getUserAndUuidFromRequest(request: Request, userDB: IRepository<UserEntity>): Promise<ParserResult | undefined> {
        const parsedKeyFromRequest = this.getUserKeyFromRequest(request)
        const parsedUuidFromRequest = this.getUserUuidFromRequest(request)

        if (parsedKeyFromRequest) {
            const user = await userDB.getBy({ key: parsedKeyFromRequest })

            if (user && user.username) {
                return { user: user, uuid: parsedUuidFromRequest as string }
            }
        }

        if (this.previousParser)
            return await this.previousParser.getUserAndUuidFromRequest(request, userDB)
        
        return undefined
    }
}

export class QueryUserParser extends RequestUserParserTemplate {
    getUserKeyFromRequest(request: Request): string {
        return request.query.key as string
    }

    getUserUuidFromRequest(request: Request): string {
        return request.query.uuid as string
    }
}

export class PostBodyUserParser extends RequestUserParserTemplate {
    getUserKeyFromRequest(request: Request): string {
        return request.body.key
    }

    getUserUuidFromRequest(request: Request): string {
        return request.body.uuid
    }
}
