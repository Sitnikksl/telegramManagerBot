const TelegramApi = require('node-telegram-bot-api')
const token = '5382418564:AAFTOBZyq4UFUCpwBRPVGxrxdkOFeOvEcKE'

const bot = new TelegramApi(token, {polling: true})
 bot.on('message', msg=>{
     console.log(msg)
 })