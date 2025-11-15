const express = require('express');
const mongodb = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

app.use( express.json() );

mongodb.initDB( (err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen( port, () => { console.log(`DB is listening and Node eunning in port: ${port}`)})
    }
}); 