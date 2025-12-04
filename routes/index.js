const express = require('express');
const router = express.Router();

const { validationResult } = require('express-validator');
const  { validateProcessor, validateUpdProcessor } = require('../middleware/validator');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', (req, res) => {

  if (req.isAuthenticated()) {
    res.send(`
      <h1>HARWARE API SERVICE</h1>
      <p>welcome ${req.user.displayName}, Endpoint availables:</p>
      <ul>
        <li><a href="/processor">Processors</a></li>
        <li><a href="/memory">Memories</a></li>
        <li><a href="/api-docs">API Documentation</a></li>
      </ul>
    `);
  } else {
    res.send(`
      <h1>Welcome to HARWARE API SERVICE</h1>
      <p>To access, please, begin with:</p>
      <p><a href="/auth/google">Google Account</a></p>
      <p>Endpoint availables (Requiere Login):</p>
      <ul>
        <li>/processor</li>
        <li>/memory</li>
      </ul>
    `);
  }  
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.send(`
      <h1>welcome to the Dashboard</h1>
      <p> Session started with success, ${req.user.displayName}!</p>
      <h2>Secured links:</h2>
      <ul>
          <li><a href="/processor">Look for Proccessor</a></li>
          <li><a href="/memory">Look for Memories</a></li>
          <li><a href="/api-docs">API Documentation</a></li>
      </ul>
      <hr>
      <p><a href="/auth/logout">Logout</a></p>
    `);
});

router.use('/auth', require('./auth'));
router.use('/processor', require('./processor'));
router.use('/memory', require('./memory'));

router.use("/", require("./swagger"));

module.exports = router;
