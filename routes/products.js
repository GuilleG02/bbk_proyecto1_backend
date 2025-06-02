const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authentication, isAdmin } = require("../middlewares/authentication");


router.post('/', authentication, isAdmin, ProductController.create);
router.put('/:id', authentication, isAdmin, ProductController.update);
router.delete('/:id', authentication, isAdmin, ProductController.delete);
router.get('/', ProductController.getAll);
router.get('/id/:id', ProductController.getById);
router.get('/name/:name', ProductController.getByName);
router.get('/price/exact/:price', ProductController.getByPrice);
router.get('/price/desc', ProductController.getByPriceDesc);



module.exports = router;