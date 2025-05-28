const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

router.post("/", CategoryController.insert);
router.get("/", CategoryController.getAll);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);
router.get("/products", CategoryController.getCategoryProducts);
router.get("/:id", CategoryController.getById);
router.get("/name/:name", CategoryController.getByName);

module.exports = router;
