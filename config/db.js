require('dotenv').config();
const { MongoClient } = require('mongodb');

let client;
let db;

async function initDB() {
    if (db) {
        console.log('DB already installed');
        return db;
    }
    try {
        client = new MongoClient(process.env.URI);

        await client.connect();
        db = client.db('hardware');
        console.log("Connectiion succesful")
        return db;
    } catch (err) {
        console.error(`Fail to connect to the DB ${err}`);
    }
};

const getDB = () => {
    if (!db) {
        throw Error('Database not initialized!');        
    }
    return db;
};

module.exports = { initDB, getDB };

