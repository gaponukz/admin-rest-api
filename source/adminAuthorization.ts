import { Request } from 'express'
import { container } from './dependencies'
import { ISettings } from "./settings"

const settings = container.get<ISettings>("ISettings")

interface IHandler {
    handleRequest(request: Request): Boolean
}

abstract class IRequestHandler implements IHandler {
    constructor(protected successor: IHandler | undefined = undefined) {
        this.successor = successor
    }
    abstract handleRequest(request: Request): Boolean
}

class BearerAuthenticationHandler extends IRequestHandler {
    handleRequest(request: Request): Boolean {
        if (request.headers.authorization.startsWith('Bearer ')) 
            return request.headers.authorization.includes(settings.adminApiKey)
        
        if (this.successor) 
            return this.successor.handleRequest(request)
        
        return false
    }
}

class QueryAuthenticationHandler extends IRequestHandler {
    handleRequest(request: Request): Boolean {
        if (request.query.adminApiKey ) 
            return request.query.adminApiKey == settings.adminApiKey
        
        if (this.successor)
            return this.successor.handleRequest(request)
        
        return false
    }
}

export default function checkAdminAuthentication(request: Request): Boolean {
    const checker: IHandler = new BearerAuthenticationHandler(new QueryAuthenticationHandler())
    return checker.handleRequest(request)
}
