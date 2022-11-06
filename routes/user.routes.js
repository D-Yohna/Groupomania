const router = require('express').Router();
const authController = require('../controllers/auth.controller.js');
const userController = require('../controllers/user.controller.js');

router.post("/register", authController.signUp);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserInfo);
router.put("/:id", userController.updateBio);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

module.exports = router;