require('dotenv').config();

const telegramBot = require('node-telegram-bot-api');
const firebase = require('firebase');
const token = process.env.BOT_TOKEN;

//Initialize bot
const bot = new telegramBot (token, {polling:true});

//Event listener
bot.on('message',(msg)=>{
    console.log('message object',msg);
    bot.sendMessage(msg.chat.id,`Hello! ${msg.chat.first_name}, What do you want to be reminded of?`);
});

bot.on('error',(error)=>{
    throw new Error(error);
})