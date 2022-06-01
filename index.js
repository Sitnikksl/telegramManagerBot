const TelegramApi = require('node-telegram-bot-api')
const { options } = require('nodemon/lib/config')
const command = require('nodemon/lib/config/command')
const token = '5382418564:AAFTOBZyq4UFUCpwBRPVGxrxdkOFeOvEcKE'
const bot = new TelegramApi(token, {polling: true})

let time = null;
let vacationList = 'Список отпусков еще не сформирован 😢'



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
        
        setInterval(() => {
            time = new Date().toLocaleTimeString()
            console.log(time);
            if(time === '9:00:00 AM'){
                bot.sendMessage(chatId, vacationList);
            }
            }, 10000);

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
        }else if(text === '/url'){
              
        }
        else{
            return bot.sendMessage(chatId, 'Я не понимаю что значит ' + ' "' + text + '", ' + 'давай ещё раз!');
        }
    })

} 
start ()
const req = () =>{
    const url = 'https://script.google.com/macros/s/AKfycbxtFdnTS8HilWKE9BEd6KTsxw5YTlU34T15JUpAWIEnpGjmSRkwxoWhLtCWVkAWJ7rgSw/exec';
    const temp = fetch(url).then(response =>response.json()).then(arr =>console.log(arr.users));
      
}
req();
         