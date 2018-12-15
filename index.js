require('dotenv').config();

const telegramBot = require('node-telegram-bot-api');
const cron = require("node-cron");
const db = require('./database').database;
const generator = require('./helper');
const token = process.env.BOT_TOKEN;
const shell = require('shelljs');

//Initialize bot
const bot = new telegramBot (token, {polling:true});

let reminder;

//Event listener for start
bot.onText(/\/start/,(msg,match)=>{
    bot.sendMessage(msg.chat.id,`Hello! ${msg.chat.first_name}, What do you want to be reminded of? [Start next message with /save]`)
        .then(res => {
            //For save
            bot.onText(/\/save (.+)/, (message, match)=>{
                reminder = match[1];
                if(reminder){
                    bot.sendMessage(message.chat.id,`Got it! What time? [example: /time (HH:MM:SS:AM|PM)]`)
                        .then(() => {
                            bot.onText(/\/time ([01]\d|2[0-3]):([0-5]\d:[0-5]\d):(AM|PM)/,(message,match)=>{
                                console.log(match);
                                const time = match[0].split(' ')[1];
                            
                                let randomString = generator.randomStringGenerator(11);
                            
                                const docItem = String(message.chat.first_name + randomString);
                            
                                const newRef = db.collection('reminder').doc(docItem);
                                
                                let newData = newRef.set({
                                    remind: reminder,
                                    time: time,
                                    user: message.chat.id,
                                    first_name: msg.chat.first_name,
                                    last_name: msg.chat.last_name,
                                    hasUserBeenReminded: false
                                })
                                .then(res =>{
                                    console.log('success',res);
                                })
                                .catch(e =>{
                                    console.log('error',e);
                                });

                                let seperateTime = time.split(':');

                                let timeOfDay = seperateTime[seperateTime.length - 1];

                                seperateTime.splice(seperateTime.length - 1,1);

                                console.log(seperateTime);

                                let numberTime = seperateTime.map(Number);

                                console.log(timeOfDay.trim());

                                if(timeOfDay.trim() == 'PM' && numberTime[0] < 13) 
                                    numberTime[0] += 12;

                                cron.schedule(`${numberTime[1]} ${numberTime[0]} * * *`,()=>{
                                    bot.sendMessage(message.chat.id,`REMINDER!!!!!!!!! ${message.chat.first_name}, you're meant to do ${reminder} now!`);
                                    newRef.update({
                                        hasUserBeenReminded: true
                                    });
                                    shell.exec(`textToAudio.sh ${reminder}`)
                                    bot.sendAudio(message.chat.id,'./remindersss.ogg');
                                })

                                bot.sendMessage(message.chat.id,`Thank you ${message.chat.first_name}, your reminder for time ${time} has been saved.`);
                            })
                            
                        })
                        .catch(() =>{
                            bot.sendMessage(msg.chat.id,`Oops! An error has occured. Try again`);
                        })
                }
            });
        }) 
        .catch(e => {
            bot.sendMessage(msg.chat.id,`Oops! An error has occured. Try again`);
        }) 
});

bot.on('polling_error', (error) => {
    return error;  // => 'EFATAL'
  });

//Handle errors
bot.on('error',(error)=>{
   return error;
})