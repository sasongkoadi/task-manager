const express = require('express')
const router = express.Router()
const userController = require('../routers/users')

//user
router.post('/users/signup1/', userController.createUser())
//router.get('/users', userController.getUsersData)

module.exports = router