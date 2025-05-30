const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');


router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);
router.get('/', ProductController.getAll);
router.get('/id/:id', ProductController.getById);


module.exports = router;