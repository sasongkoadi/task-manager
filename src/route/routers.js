const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

//user
router.post('/users', userController.createUser)
router.get('/users', userController.getUsersData)

module.exports = router