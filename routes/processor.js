const express = require('express');
const router = express.Router();
// const { validationResult } = require("express-validator");
const processorCtrler = require('../controllers/processorCtrl');
// const  { validateProcessor } = require('../middleware/validator');

router.get('/processor', processorCtrler.getAll);

router.get('/processor/:id', processorCtrler.getSingle);

router.post('/processor', processorCtrler.createProcessor);

router.put('/processor/:id', processorCtrler.updateProcessor);

router.delete('/processor/:id', processorCtrler.deleteProcessor);

module.exports =  router ;