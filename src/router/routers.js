const express = require('express')
const userController = require('../controller/userController')
const taskController = require('../controller/taskController')
const projectController = require('../controller/projectController')
const executorController = require('../controller/executorController')
const workrequestStatusController = require('../controller/workrequestStatusController')
const workrequestController = require('../controller/workRequestController')
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
router.post('/project/add', auth.authentication, auth.isUser, projectController.addProject) 
router.get('/project/show', auth.authentication, auth.isUser, projectController.showProjects)
router.get('/project/show/:id', auth.authentication, auth.isUser, projectController.showProjectId)
router.patch('/project/edit/:id', auth.authentication, auth.isUser, projectController.editProject)
router.delete('/project/delete/:id', auth.authentication, auth.isUser, projectController.deleteProject)

//Executors
router.get('/executors/show', auth.authentication, auth.isUser, executorController.showAllExecutors)

//StatusReq
router.get('/statusrequest/show',auth.authentication, auth.isUser, workrequestStatusController.showAllStatus)

//Work Request
router.post('/workrequest/add', auth.authentication, auth.isUser, workrequestController.addWorkRequest)
router.get('/workrequest/all', auth.authentication, auth.isGuest, workrequestController.showAllWRDaily)
router.get('/workrequest/status/:id', auth.authentication, auth.isGuest, workrequestController.showAllWRConditional)
router.get('/workrequest/show/:id', auth.authentication, auth.isGuest, workrequestController.showWRId)
router.patch('/workrequest/edit/:id', auth.authentication, auth.isUser, workrequestController.updateWR)
router.delete('/workrequest/delete/:id', auth.authentication, auth.isUser, workrequestController.deleteWR)

//ADMIN CONTROL

//users
router.get('/users/all', auth.authentication, auth.isAdmin, userController.showAllUsers)

//Executors
router.post('/executor/add', auth.authentication, auth.isAdmin, executorController.addExecutor)

//StatusReq
router.post('/statusrequest/add', auth.authentication, auth.isAdmin, workrequestStatusController.addStatus)

module.exports = router