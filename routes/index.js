const express = require('express');
const router = express.Router();

router.use('/processor', require('./processor'));
// router.use('/memory', require('./memory'));

module.exports = router;