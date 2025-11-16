const express = require('express');
const router  = express.Router();
const memCtrler = require('../controllers/memoryCtrl');

router.get('/memory', memCtrler.getAll);

router.get('/memory/:id', memCtrler.getSingle);

router.post('/memory', memCtrler.memoryCreate);

router.delete('/memory/:id', memCtrler.deleteMemory);

router.put('/memory/:id', memCtrler.updateMemory);

module.exports = router;