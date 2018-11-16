const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccount');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const database = admin.firestore();
const settings = {
    timestampsInSnapshots: true
};
database.settings(settings);

module.exports = {
    database
}


  