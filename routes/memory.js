const express = require('express');
const router = express.Router();
// const { validationResult } = require("express-validator"); 
const memCtrler = require('../controllers/memoryCtrl');
const { validMemoryCreate, validMemoryUpd } = require('../middleware/validator');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', memCtrler.getAll);
router.get('/:id', memCtrler.getSingle);

router.post('/', ensureAuthenticated, validMemoryCreate, memCtrler.memoryCreate);

router.delete('/:id', ensureAuthenticated, memCtrler.deleteMemory);

router.put('/:id', ensureAuthenticated, validMemoryUpd, memCtrler.updateMemory); 

module.exports = router;