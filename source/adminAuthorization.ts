import { Request } from 'express'

export abstract class IRequestHandler {
    constructor(protected successor: IRequestHandler | undefined = undefined) {
        this.successor = successor
    }
    abstract handleRequest(request: Request, password: string): Boolean
}

abstract class RequestHandlerTemplate extends IRequestHandler {
    abstract getPasswordFromRequest(request: Request): string | undefined

    handleRequest(request: Request, password: string): Boolean {
        const passwordFromRequest = this.getPasswordFromRequest(request)

        if (passwordFromRequest == password) 
            return true
        
        if (this.successor) 
            return this.successor.handleRequest(request, password)
        
        return false
    }
}

export class BearerAuthenticationHandler extends RequestHandlerTemplate {
    getPasswordFromRequest(request: Request): string | undefined {
        if (request.headers.authorization?.startsWith('Bearer ')) {
            return request.headers.authorization.replace('Bearer ', '')
        }
    }
}

export class QueryAuthenticationHandler extends RequestHandlerTemplate {
    getPasswordFromRequest(request: Request): string | undefined {
        return request.query.adminApiKey as string | undefined
    }
}

export function checkAdminAuthentication(request: Request, password: string): Boolean {
    let checker = new QueryAuthenticationHandler()
    checker = new BearerAuthenticationHandler(checker)

    return checker.handleRequest(request, password)
}
