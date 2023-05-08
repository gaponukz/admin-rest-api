interface User {
    username: string
    key: string
    startPeriodDate: Date
    endPeriodDate: Date
    isKeyActive: boolean
    hasTrial: boolean
    impersonates: string | undefined
    uuid: string | undefined
}

interface Post {
    title: string
    description: string
    image: string
}

interface Message {
    subject: string
    gmail: string
    message: string
    date: Date
}


export {User, Post, Message}
