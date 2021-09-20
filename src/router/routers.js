const express = require('express')
const userController = require('../controller/userController')
const taskController = require('../controller/taskController')
const projectController = require('../controller/projectController')
const auth = require('../middleware/auth')
const router = express.Router()


//users
router.post('/users/signup', userController.createUser)
router.post('/users/login', userController.loginUser)
router.post('/users/logout', auth.authentication, auth.isUser , userController.logoutUser)
router.post('/users/logoutAll', auth.authentication, auth.isUser, userController.logoutUserAll)
router.get('/users/me', auth.authentication, auth.isUser, userController.profile)
router.patch('/users/me', auth.authentication, auth.isUser, userController.editProfile)
router.patch('/users/password', auth.authentication, auth.isUser, userController.editPassword)
//router.delete('/users/me', auth.authentication, auth.isUser, userController.deleteUser)

//tasks
router.post('/tasks/add', auth.authentication, taskController.addTask) 
router.get('/tasks/show', auth.authentication, taskController.showTasks)
router.get('/tasks/show/:id', auth.authentication, taskController.showTaskId)
router.patch('/tasks/edit/:id', auth.authentication, taskController.editTask)
router.delete('/tasks/delete/:id', auth.authentication, taskController.deleteTask)

//projects
router.post('/project/add', auth.authentication, projectController.addProject) 
router.get('/project/show', auth.authentication, projectController.showProjects)
router.get('/project/show/:id', auth.authentication, projectController.showProjectId)
router.patch('/project/edit/:id', auth.authentication, projectController.editProject)
router.delete('/project/delete/:id', auth.authentication, projectController.deleteProject)

//Admin

//users
router.get('/users/all', auth.authentication, auth.isAdmin, userController.showAllUsers)

module.exports = router