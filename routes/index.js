const express = require('express');
const router = express.Router();

const { validationResult } = require('express-validator');
const  { validateProcessor, validateUpdProcessor } = require('../middleware/validator');

router.get('/', (req, res) => {
  res.send(`
    <h1>HARWARE API SERVICE</h1>
    <p>Endpoint availables:</p>
    <ul>
      <li><a href="/processor">Processors</a></li>
      <li><a href="/memory">Memories</a></li>
      <li><a href="/api-docs">API Documentation</a></li>
    </ul>
  `);
});

router.use('/auth', require('./auth'));
router.use('/processor', require('./processor'));
router.use('/memory', require('./memory'));

module.exports = router;
