const express = require('express');
const router = express.Router();
const { validationResult } = require("express-validator");
const processorCtrler = require('../controllers/processorCtrl');
const  { validateProcessor, validateUpdProcessor } = require('../middleware/validator');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', processorCtrler.getAll);
// router.get('/', ensureAuthenticated, processorCtrler.getAll);

router.get('/:id', ensureAuthenticated, processorCtrler.getSingle);

router.post('/', ensureAuthenticated, validateProcessor, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    return processorCtrler.createProcessor(req, res);
});

router.put('/:id', ensureAuthenticated, validateUpdProcessor, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty() ) {
        return res.status(422).json({ errors: errors.array() });
    }
    return processorCtrler.updateProcessor(req, res);
});

router.delete('/:id', ensureAuthenticated, processorCtrler.deleteProcessor);

module.exports =  router ;