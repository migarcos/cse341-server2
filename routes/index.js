const express = require('express');
const router = express.Router();

const { validationResult } = require('express-validator');
const  { validateProcessor, validateUpdProcessor } = require('../middleware/validator');

router.use('/processor', require('./processor'));
router.use('/memory', require('./memory'));

module.exports = router;