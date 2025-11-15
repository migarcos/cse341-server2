require('dotenv').config();
const { MongoClient } = require('mongodb');

const config = {
    uri : process.env.URI,
    dbName : process.env.DBNAME || 'hardware'
};

async function testConnection() {
    const client = new MongoClient(config.uri);

    console.log('🔄 Testing MongoDB connection...\n');
    console.log(`🔗 Connecting to: ${config.uri.replace(/\/\/.*:.*@/, '//***:***@')}\n`); // Oculta credenciales

    try {
        await client.connect();
        console.log(" Connected SUCCESSFULLY!");

        const dbList = await client.db().admin().listDatabases();
        console.log(" DATABASES: ");
        dbList.databases.forEach( db => console.log(` - ${db.name}`));
    } catch (err) {
        console.error(" Connection FAILED ", err.message );
    } finally {
        await client.close();
        console.log("Connection CLOSED");
    }
}

testConnection();