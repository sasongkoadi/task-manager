const express = require('express')
const userController = require('../controller/userController')
const router = new express.Router()

//user
router.post('/users/signuptest', userController.createUser)
//router.get('/users', userController.getUsersData)

module.exports = router