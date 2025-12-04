const express = require('express');
const router = express.Router();
// const { validationResult } = require("express-validator"); 
const memCtrler = require('../controllers/memoryCtrl');
const { validMemoryCreate, validMemoryUpd } = require('../middleware/validator');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', ensureAuthenticated, memCtrler.getAll);
/* #swagger.tags = ['Memories']
#swagger.summary = 'Get a list to all memory modules (require authentication).'
#swagger.security = [{"cookieAuth": []}] // apply session security
#swagger.responses[200] = {
    description: 'bring listed memories ',
    schema: [{$ref: "#/definitions/Memory"}] // ensure memory schema
}
#swagger.responses[401] = { description: 'No authenticated.' }
*/
router.get('/:id', ensureAuthenticated, memCtrler.getSingle);

router.post('/', ensureAuthenticated, validMemoryCreate, memCtrler.memoryCreate);

router.delete('/:id', ensureAuthenticated, memCtrler.deleteMemory);

router.put('/:id', ensureAuthenticated, validMemoryUpd, memCtrler.updateMemory); 

module.exports = router;