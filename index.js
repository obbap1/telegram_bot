require('dotenv').config();

const telegramBot = require('node-telegram-bot-api');
const firebase = require('firebase');
const token = process.env.BOT_TOKEN;

//Initialize bot
const bot = new telegramBot (token, {polling:true});

let reminder;

//Event listener
bot.on('message',(msg)=>{
    bot.sendMessage(msg.chat.id,`Hello! ${msg.chat.first_name}, What do you want to be reminded of?`);

    bot.on('polling_error', (error) => {
        console.log('EFATAL',error);  // => 'EFATAL'
      });

    bot.onText(/\/save (.+)/, (message, match)=>{

        console.log(message,match);
        reminder = match[1];

        console.log('reminder',reminder);

        if(reminder){
            bot.sendMessage(msg.chat.id,`Got it! What time? [example: /time (0-24)(AM/PM) ]`);

            bot.onText(/([0-1][0-9]|2[0-4])(AM|PM)/,(message,match)=>{
                console.log('time',match);
                time = match;
            })
        }
        else bot.sendMessage(msg.chat.id,`Hello! ${msg.chat.first_name}, What do you want to be reminded of? `);

        
    })
});

//Handle errors
bot.on('error',(error)=>{
    throw new Error(error);
})