const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication, isAdmin } = require("../middlewares/authentication");

router.post("/", UserController.insert);
router.get("/", authentication, UserController.getAll);
router.delete("/id/:id", authentication, isAdmin, UserController.delete);

router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
