require('dotenv').config();
const { MongoClient } = require('mongodb');

let _db;

const initDB = (callback) => {
    if (_db) {
        console.log('DB already installed');
        return callback( null, _db);
    }
    MongoClient.connect(process.env.URI)
        .then( (client) => {
            // db = client;
            _db = client.db(process.env.DB_NAME || 'cse341-server2');
            callback( null, _db);
        }). catch ( (err) => { callback(err) });
};

const getDB = () => {
    if (!_db) {
        throw Error('Database not initialized!');        
    }
    return _db;
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