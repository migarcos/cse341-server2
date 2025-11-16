require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

const initDB = (callback) => {
    if (db) {
        console.log('DB already installed');
        return callback( null, db);
    }
    MongoClient.connect(process.env.URI)
        .then( (client) => {
            db = client;
            callback( null, db);
        }). catch ( (err) => { callback(err) });
};

const getDB = () => {
    if (!db) {
        throw Error('Database not initialized!');        
    }
    return db;
};

module.exports = { initDB, getDB };

// async function initDB() {
//     if (db) {
//         console.log('DB already installed');
//         return db;
//     }
//     try {
//         client = new MongoClient(process.env.URI);

//         await client.connect();
//         db = client.db('hardware');
//         console.log("Connectiion to HW DB succesful")
//         return db;
//     } catch (err) {
//         console.error(`Fail to connect to the DB ${err}`);
//     }
// };