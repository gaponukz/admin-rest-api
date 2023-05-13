import {
    IRequestHandler,
    BearerAuthenticationHandler,
    QueryAuthenticationHandler
} from '../source/adminAuthorization'

const password = "rightPassword"

const rightPasswordRequest = {
    query: {
        adminApiKey: "rightPassword",
    },
    headers: {
        authorization: "Bearer rightPassword"
    }
}

const wrongPasswordRequest = {
    query: {
        adminApiKey: "wrongPassword",
    },
    headers: {
        authorization: "Bearer wrongPassword"
    }
}

function check (checker: IRequestHandler, request: any, toBeChecked: boolean) {
    expect(checker.handleRequest(request, password)).toBe(toBeChecked)
}

describe('Bearer Authentication', () => {
    test('Must detect Bearer Authentication and check it', () => {
        const checker = new BearerAuthenticationHandler()
        
        check(checker, rightPasswordRequest, true)
        check(checker, wrongPasswordRequest, false)
    })
})

describe('Query Authentication', () => {
    test('Query Authentication and check it', () => {
        const checker = new QueryAuthenticationHandler()

        check(checker, rightPasswordRequest, true)
        check(checker, wrongPasswordRequest, false)
    })
})

describe('Chain of responsibility Authentication', () => {
    test('Work with different instances cominations', () => {
        let checker = new QueryAuthenticationHandler()
        checker = new BearerAuthenticationHandler(checker)

        check(checker, rightPasswordRequest, true)
        check(checker, wrongPasswordRequest, false)

        checker = new BearerAuthenticationHandler()
        checker = new QueryAuthenticationHandler(checker)

        check(checker, rightPasswordRequest, true)
        check(checker, wrongPasswordRequest, false)

    })

    test('Work with different params cominations', () => {
        const wrongQueryRequest = {
            query: {
                adminApiKey: "wrongPassword",
            },
            headers: {
                authorization: "Bearer rightPassword",
            }
        }

        const wrongBearerRequest = {
            headers: {
                authorization: "wrongPassword"
            },
            query: {
                adminApiKey: "Bearer rightPassword",
            },
        }

        let checker = new QueryAuthenticationHandler()
        checker = new BearerAuthenticationHandler(checker)

        check(checker, wrongQueryRequest, true)
        check(checker, wrongBearerRequest, false)
    })
})