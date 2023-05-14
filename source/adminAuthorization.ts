import { Request } from 'express'

export abstract class IRequestHandler {
    constructor(protected successor: IRequestHandler | undefined = undefined) {
        this.successor = successor
    }
    abstract handleRequest(request: Request, password: string): Boolean
}

export class BearerAuthenticationHandler extends IRequestHandler {
    handleRequest(request: Request, password: string): Boolean {
        if (request.headers.authorization) {
            if (request.headers.authorization.startsWith('Bearer ')) 
                return request.headers.authorization.includes(password)
        }
        
        if (this.successor) 
            return this.successor.handleRequest(request, password)
        
        return false
    }
}

export class QueryAuthenticationHandler extends IRequestHandler {
    handleRequest(request: Request, password: string): Boolean {
        if (request.query.adminApiKey ) 
            return request.query.adminApiKey == password
        
        if (this.successor)
            return this.successor.handleRequest(request, password)
        
        return false
    }
}

export function checkAdminAuthentication(request: Request, password: string): Boolean {
    let checker = new QueryAuthenticationHandler()
    checker = new BearerAuthenticationHandler(checker)

    return checker.handleRequest(request, password)
}
