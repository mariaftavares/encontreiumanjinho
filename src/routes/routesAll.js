const express = require('express')
const router =express.Router();
const controllerUser = require('../controllers/userControllers')
const auth = require('../middlewares/auth')
const controllerPost = require('../controllers/postControllers')


router.post('/logincreate',controllerUser.createUser)
router.post('/login',controllerUser.login)
router.post('/postcreate',auth.checkAuth,controllerPost.createPost)
router.get('/myposts',auth.checkAuth,controllerPost.getPostUser)
router.get('/feed',controllerPost.getAllPost)
router.put('/changepost/:id',auth.checkAuth,controllerPost.updatePost)
router.delete('/deletepost/:id',auth.checkAuth,controllerPost.deletePost)

module.exports = router