const TelegramApi = require('node-telegram-bot-api')
const { options } = require('nodemon/lib/config')
const command = require('nodemon/lib/config/command')
const token = '5382418564:AAFTOBZyq4UFUCpwBRPVGxrxdkOFeOvEcKE'

const bot = new TelegramApi(token, {polling: true})

/*
const linksButtons = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Рентабельность', callback_data: profitLink}, {text: 'Notion', callback_data: '2 '}],
            [{text: 'Рентабельность', callback_data: '1 '}, {text: 'Notion', callback_data: '2 '}]
        ]
    })
}
*/

const start = () =>{

    bot.setMyCommands([
        {command: '/start', description: 'Команда старта'},
        {command: '/info', description: 'Узнать что можно'},
        {command: '/links', description: 'Полезные ссылки'},
        {command: '/vacation', description: 'Отпуски месяца'}
    ])
    
    bot.on('message', async msg=>{
        const text = msg.text;
        const chatId = msg.chat.id;
        
        if(text === '/start'){
           await bot.sendMessage(chatId, 'Добро пожаловать! Это менеджерский бот, с помощью которого ты сможешь делать много клевых и продуктивных вещей!');
           await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/5a7/cb3/5a7cb3d0-bca6-3459-a3f0-5745d95d54b7/1.webp');
           return bot.sendMessage(chatId, 'А теперь напиши: /info и узнай какие команды можно выполнять 😀');
        } else  
    
        if(text === '/name'){
            await bot.sendMessage(chatId, 'Тебя зовут: ' + msg.from.first_name +  ' ' + msg.from.last_name);
            if (msg.from.last_name === undefined){
                bot.sendMessage(chatId, 'А где фамилия?')
            }
        } else

        if(text === '/info'){
            await bot.sendMessage(chatId, 'Всё можно, нихуя нельзя!' + '\n' + '© Лёха Панасюк')
            //return bot.sendMessage(chatId, '[inline URL](http://www.example.com/)', {parse_mode: 'Markdown'})
            await bot.sendMessage(chatId, '/links – полезные ссылки' + '\n' + 
            '/vacation - отпуски месяца')
        } else

        if(text === '/links'){
            await bot.sendMessage(chatId,  'Полезные ссылки: ' + '\n' + '[📌 Дашборд рентабельности](https://docs.google.com/spreadsheets/d/1zacVstpRrZw4A-gIHL1V5uoax27O9-wZDfMnHuThUKs/edit?usp=sharing)' + 
            '\n' + '[📌 Менеджерский Notion](http://www.example.com/)' + '\n' + 
            '[📌 Доска Project Managment](http://www.example.com/)', {parse_mode: 'Markdown'})
        
        } else
        if(text === '/vacation'){
            bot.sendMessage(chatId, 'Тут я напишу тебе отпуски')
        } else
        if(text === '/id'){
            bot.sendMessage(chatId, chatId)
        }
        else{
            return bot.sendMessage(chatId, 'Я не понимаю что значит ' + ' "' + text + '", ' + 'давай ещё раз!');
        }
    })

} 
start ()