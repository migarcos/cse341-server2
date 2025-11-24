const express = require('express');
const mongodb = require('./config/db');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./config/passport');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to seesion
app.use(session({
  secret: 'CSE341SVR2', // complex key
  resave: false,
  saveUninitialized: false,
  // session store could be added (as connect-mongo)
}));
// start passport
app.use(passport.initialize());
app.use(passport.session());



const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use( express.json() );
app.use( (req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type. Accept, Z-Key'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS'
    );
    next();
} );
app.use('/', require('./routes'));
// app.use('/', require('./routes/processor'));
// app.use('/', require('./routes/memory'));

mongodb.initDB( (err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen( port, () => { console.log(`DB is listening and Node running in port: ${port}`)})
    }
}); 