const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const controller = require('../controllers/product.controller');

router.post('/', auth, controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);
router.get('/:id', auth, controller.getById);
router.get('/', controller.search);

module.exports = router;
