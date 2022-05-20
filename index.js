const TelegramApi = require('node-telegram-bot-api')
const command = require('nodemon/lib/config/command')
const token = '5382418564:AAFTOBZyq4UFUCpwBRPVGxrxdkOFeOvEcKE'

const bot = new TelegramApi(token, {polling: true})

const start = () =>{

    bot.setMyCommands([
        {command: '/start', description: 'Команда старта'},
        {command: '/info', description: 'Узнать что можно'},
        {command: '/links', description: 'Полезные ссылки'}
    ])
    
    bot.on('message', async msg=>{
        const text = msg.text;
        const chatId = msg.chat.id;
        
        if(text === '/start'){
           await bot.sendMessage(chatId, 'Добро пожаловать! Это менеджерский бот, с помощью которо ты сможешь делать много клевых и продуктивных вещей!');
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
            return bot.sendMessage(chatId, 'Пока ничего нельзя')
        } else

        if(text === '/links'){
            return bot.sendMessage(chatId, 'Вот ссылка на дашборд рентабельности: ' + 'https://docs.google.com/spreadsheets/d/1zacVstpRrZw4A-gIHL1V5uoax27O9-wZDfMnHuThUKs/edit#gid=51478953 ' + '\n' + 
            'Вот еще ссылка: ')
        }else{
            bot.sendMessage(chatId, 'Я не понимаю что значит ' + ' "' + text + '", ' + 'давай ещё раз!');
        }
    })

} 
start ()