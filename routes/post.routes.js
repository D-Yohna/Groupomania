const router = require('express').Router();
const postController = require('../controllers/post.controller.js')
const multer  = require('multer')
const upload = multer({ dest: '../client/public/uploads/posts' })

//CRUD POST
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPost);
router.get('/all/:id', postController.getUserPosts);
router.post('/', upload.single('file'), postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch("/like-post/:id", postController.like);
router.patch("/unlike-post/:id", postController.unlike);

//CRUD COMMENTS
router.patch("/comment/:id", postController.comment);
router.patch("/editcomment/:id", postController.updateComment);
router.patch("/deletecomment/:id", postController.deleteComment);
router.patch("/likecomment/:id", postController.likeComment);
router.patch("/unlikecomment/:id", postController.unlikeComment);

module.exports = router;