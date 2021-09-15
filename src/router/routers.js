const express = require('express')
const userController = require('../controller/userController')
const taskController = require('../controller/taskController')
const projectController = require('../controller/projectController')
const auth = require('../middleware/auth')
const router = express.Router()


//users
router.post('/users/signup', userController.createUser)
router.post('/users/login', userController.loginUser)
router.post('/users/logout', auth, userController.logoutUser)
router.post('/users/logoutAll', auth, userController.logoutUserAll)
router.get('/users/me', auth, userController.profile)
router.patch('/users/me', auth, userController.editProfile)
router.patch('/users/password', auth, userController.editPassword)
router.delete('/users/me', auth, userController.deleteUser)

//tasks
router.post('/tasks/add', auth, taskController.addTask) 
router.get('/tasks/show', auth, taskController.showTasks)
router.get('/tasks/show/:id', auth, taskController.showTaskId)
router.patch('/tasks/edit/:id', auth, taskController.editTask)
router.delete('/tasks/delete/:id', auth, taskController.deleteTask)

//projects
router.post('/project/add', auth, projectController.addProject) 
router.get('/project/show', auth, projectController.showProjects)
router.get('/project/show/:id', auth, projectController.showProjectId)
router.patch('/project/edit/:id', auth, projectController.editProject)
router.delete('/project/delete/:id', auth, projectController.deleteProject)

module.exports = router