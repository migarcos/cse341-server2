const express = require('express');
const router  = express.Router();
const { validationResult } = require("express-validator");
const memCtrler = require('../controllers/memoryCtrl');
const  { validMemoryCreate, validMemoryUpd } = require('../middleware/validator');

router.get('/', memCtrler.getAll);

router.get('/:id', memCtrler.getSingle);

router.post('/', validMemoryCreate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    return memCtrler.memoryCreate(req, res);
});

router.delete('/:id', memCtrler.deleteMemory);

router.put('/:id', validMemoryUpd, async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty() ) {
            return res.status(422).json({ errors: errors.array() });
        }
    return memCtrler.updateMemory(req, res);
});

module.exports = router;