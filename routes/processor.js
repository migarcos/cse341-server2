const express = require('express');
const router = express.Router();
// const { validationResult } = require("express-validator");
const processorCtrler = require('../controllers/processorCtrl');
const  { validateProcessor, validateUpdProcessor } = require('../middleware/validator');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', ensureAuthenticated, processorCtrler.getAll);
// router.get('/', ensureAuthenticated, processorCtrler.getAll);

router.get('/:id',  processorCtrler.getSingle);

router.post('/', ensureAuthenticated, validateProcessor, processorCtrler.createProcessor);

router.put('/:id', ensureAuthenticated, validateUpdProcessor, processorCtrler.updateProcessor);

router.delete('/:id', ensureAuthenticated, processorCtrler.deleteProcessor);

module.exports =  router ;