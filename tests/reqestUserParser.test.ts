import { IRepository } from '../source/logic/repositories'
import { UserEntity } from '../source/logic/enteties'

import {
    ParserResult,
    IRequestUserParser,
    QueryUserParser,
    PostBodyUserParser
} from '../source/requestUserParsers'

class TestUserRepository implements IRepository<UserEntity> {
    async getAll(): Promise<UserEntity[]> { return [] }
    async create(user: UserEntity): Promise<UserEntity> { return user }
    async update(user: UserEntity, fields: any): Promise<UserEntity> { return user }
    async delete(user: UserEntity): Promise<void> { }

    async getBy(fields: any): Promise<UserEntity> {
        const userTestKey = "password"

        if (fields.key == userTestKey) {
            return UserEntity.fromObject({
                username: "testusername",
                key: userTestKey,
                startPeriodDate: new Date(0),
                endPeriodDate: new Date(0),
                isKeyActive: true,
                hasTrial: true
            })
        }

        return undefined as any
    }
}

const testUserDB = new TestUserRepository()
const wrongUserRequestCase1 = {}
const wrongUserRequestCase2 = { query: { key: "wrongpassword", uuid: "123456789" } }
const wrongUserRequestCase3 = { body: { query: "wrongpassword", uuid: "123456789" } }
const rightUserRequestCase1 = { query: { key: "password", uuid: "123456789" }, body: { query: "wrongpassword", uuid: "123456789" } }
const rightUserRequestCase2 = { body: { key: "password", uuid: "123456789" }, query: { query: "wrongpassword", uuid: "123456789" } }

function check(parser: IRequestUserParser, request: any, expectValue: ParserResult | undefined) {
    parser.getUserAndUuidFromRequest(request, testUserDB).then(result => {
        expect(result?.user?.key).toBe(expectValue?.user?.key)
        expect(result?.uuid).toBe(expectValue?.uuid)
    })
}

describe('Main test: both parsers', () => {
    test('Must parse user and uuid from request', () => {
        let parser = new PostBodyUserParser()
        parser = new QueryUserParser(parser)
        
        check(parser, wrongUserRequestCase1, undefined)
        check(parser, wrongUserRequestCase2, undefined)
        check(parser, wrongUserRequestCase3, undefined)
        
        testUserDB.getBy({ key: "password" }).then(user => {
            check(parser, rightUserRequestCase1, { user: user, uuid: "123456789" })
            check(parser, rightUserRequestCase2, { user: user, uuid: "123456789" })
        })
    })
})
