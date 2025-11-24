const express = require('express');
const router = express.Router();

const { validationResult } = require('express-validator');
const  { validateProcessor, validateUpdProcessor } = require('../middleware/validator');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', ensureAuthenticated, (req, res) => {
  res.send(`
    <h1>HARWARE API SERVICE</h1>
    <p>welcome ${req.user.displayName}, Endpoint availables:</p>
    <ul>
      <li><a href="/processor">Processors</a></li>
      <li><a href="/memory">Memories</a></li>
      <li><a href="/api-docs">API Documentation</a></li>
    </ul>
  `);
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.send(`
        <h1>Bienvenido al Dashboard</h1>
        <p>¡Sesión iniciada con éxito, ${req.user.displayName}!</p>
        <p><a href="/auth/logout">Cerrar Sesión</a></p>
    `);
});

router.use('/auth', require('./auth'));
router.use('/processor', require('./processor'));
router.use('/memory', require('./memory'));

module.exports = router;
