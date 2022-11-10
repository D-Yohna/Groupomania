const router = require('express').Router();
const authController = require('../controllers/auth.controller.js');
const userController = require('../controllers/user.controller.js');
const uploadController = require('../controllers/upload.controller.js');
const multer  = require('multer')
const uploadprofile = multer({ dest: '../client/public/uploads/profile' })

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout)

//CRUD user
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserInfo);
router.put("/:id", userController.updateBio);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

//Upload
router.post("/upload", uploadprofile.single('file'), uploadController.uploadProfile)

module.exports = router;