import { MessageEntity } from './logic/enteties'
import { createHash } from 'crypto'
import { ISettings } from "./settings"
import { container } from './dependencies'

const generateUserKey = (username: string): string => {
    return createHash('sha384')
        .update(username + new Date(), 'utf-8')
        .digest('hex')
}

const getUTCDate = (date: number | undefined = undefined): Date => {
    const currentDate = date ? new Date(date) : new Date() 
    return new Date(currentDate.toUTCString())
}

const afterHours = (hours: number): Date => {
    return getUTCDate(new Date().getTime() + hours * 3600000)
}

const sendTelegramMessage = async (message: MessageEntity, callback: (a: any) => Promise<void>): Promise<void> => {
    const telegramApiUrl = "https://api.telegram.org/bot"
    const apiAction = "sendMessage"
    const text = `${message.message} \n${message.subject} \n${message.gmail}`
    const settings = container.get<ISettings>("ISettings")
       
    await fetch(`${telegramApiUrl}${settings.telegramBotToken}/${apiAction}?chat_id=${settings.ownerTelegramId}}&text=${text}`)
    .then(async apiReponse => await apiReponse.json()).then(async apiReponse => {
        await callback(apiReponse)
    })
}

export { generateUserKey, getUTCDate, afterHours, sendTelegramMessage }
