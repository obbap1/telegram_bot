require('dotenv').config()

const admin = require('firebase-admin');
const serviceAccount = require('./telegram-bot.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://telegram-bot-b6cf6.firebaseio.com"
});

const database = admin.firestore();
const settings = {
    timestampsInSnapshots: true
};
database.settings(settings);

module.exports = {
    database
}


  