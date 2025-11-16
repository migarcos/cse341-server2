const express = require('express');
const router = express.Router();
const { validationResult } = require("express-validator");
const processorCtrler = require('../controllers/processorCtrl');
const  { validateProcessor, validateUpdProcessor } = require('../middleware/validator');

router.get('/processor', processorCtrler.getAll);

router.get('/processor/:id', processorCtrler.getSingle);

router.post('/processor', validateProcessor, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    return processorCtrler.createProcessor(req, res);
});

router.put('/processor/:id', validateUpdProcessor, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty() ) {
        return res.status(422).json({ errors: errors.array() });
    }
    return processorCtrler.updateProcessor(req, res);
});

router.delete('/processor/:id', processorCtrler.deleteProcessor);

module.exports =  router ;