import fetch from "node-fetch";
import TelegramApi from "node-telegram-bot-api";
//const { options } = require('nodemon/lib/config')
//const command = require('nodemon/lib/config/command')
const token = '5533043131:AAGVDRGDqRXehNfULaMJyEnW_Aea8z8syGk'
const bot = new TelegramApi(token, {polling: true})


let time = null;
let vacationList = '';
let todayMounth;
let today = '';
let startDay = '';
let endDay = '';

const getMounth = () =>{
    todayMounth = new Date().toLocaleDateString();
    for(let char of todayMounth){
        if(char === '/'){
            break;
        }
        today += char;
    }
    return today;
}
getMounth();
const req = () =>{
    const url = 'https://script.google.com/macros/s/AKfycbzT0D0WAbDIR5WjDi-OrKSH72F05MfA6BH10p14SlUneCIiIc641WVX10BtMV-xfxQzWg/exec';
    const vacationTable = fetch(url).then(response =>response.json()).then(arr =>{
        // console.log(arr.users);
        let userNames = [];
        let userFirstDays = [];
        let userMounth = [];
        for(let i = 0; i<arr.users.length; i++){
            let addName = arr.users[i].Name;
            userNames.push(addName); 
        }
        for(let i = 1; i<arr.users.length; i++){
            let addFirstDay = arr.users[i].FirstDay;
            
            userFirstDays.push(addFirstDay); 
        }
        for(let i = 0; i<arr.users.length; i++){
            let addMounth = arr.users[i].Mounth;
            userMounth.push(addMounth)
        }
        // console.log('Количество строк в таблице: ' + arr.users.length);
        vacationList = '';
        for(let i = 0; i<arr.users.length; i++){
            if(arr.users[i].Mounth.toString().includes(today || today[1])){
                
                for(let char of arr.users[i].FirstDay){
                    if(char === 'T'){
                        break;
                    }
                    startDay+= char;
                }
                for(let char of arr.users[i].LastDay){
                    if(char === 'T'){
                        break;
                    }
                    endDay+= char;
                }
                vacationList += '📌' + arr.users[i].Name + '\n' 
                + 'Начало: ' + startDay + '\n' 
                + 'Окончание: ' + endDay + '\n' 
                + 'Комментарий: ' + arr.users[i].Comment + '\n' 
                + 'Всего дней: ' + arr.users[i].CountDay +'\n'+'\n';
                startDay = '';
                endDay = '';
            }
        }
    });
}

setInterval(() => {
    try {
        req();
    } catch (error) {
        console.log('Вот ошибка: ' + error);
    }
}, 1000);

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
            // console.log(time);
            if(time === '1:13:30 AM'){
                bot.sendMessage(chatId, vacationList);
            }
            }, 1000);

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
            //return bot.sendMessage(chatId, '[inline URL](http://www.example.com/)', {parse_mode: 'Markdown'})
            await bot.sendMessage(chatId, '/links – полезные ссылки' + '\n' + 
            '/vacation - отпуски месяца')
        } else

        if(text === '/links'){
            await bot.sendMessage(chatId,  'Полезные ссылки: ' + '\n' + '[📌 Дашборд рентабельности](https://docs.google.com/spreadsheets/d/1zacVstpRrZw4A-gIHL1V5uoax27O9-wZDfMnHuThUKs/edit?usp=sharing)' + 
            '\n' + '[📌 Менеджерский Notion](https://pmtsdgn.notion.site/PM-TDSGN-f8645b701f104ecd9cafd158f2019e7c)' + '\n' + 
            '[📌 Доска Project Managment](https://crmcraft.ru/?controller=BoardViewController&action=show&project_id=280)', {parse_mode: 'Markdown'})
        
        } else
        if(text === '/vacation'){            
            bot.sendMessage(chatId, '🪴 Отпуски в этом месяце: ' + '\n' + '\n' + vacationList + '⚠️ Учти это в своих проектах!')
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