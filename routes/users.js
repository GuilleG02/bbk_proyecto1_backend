const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication, isAdmin } = require("../middlewares/authentication");

router.post("/", UserController.insert);
router.get("/", authentication, isAdmin, UserController.getAll);
router.put("/:id", authentication, isAdmin, UserController.changeRol);
router.delete("/id/:id", authentication, isAdmin, UserController.delete);

router.post("/login", UserController.login);
router.get("/confirm/:emailToken", UserController.confirm);
router.delete("/logout", authentication, UserController.logout);
router.get("/me", authentication, UserController.getMyOrders);

module.exports = router;
