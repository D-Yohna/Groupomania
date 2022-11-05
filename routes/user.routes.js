const router = require('express').Router();
const authController = require('../controllers/auth.controller.js');
const userController = require('../controllers/user.controller.js');

router.post("/register", authController.signUp);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserInfo)
router.put("/:id", userController.updateBio)

module.exports = router;