const express = require('express')
const auth = require('../middleware/auth')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks/add', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id,
    }) 
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error._message) 
    }
})

router.get('/tasks/show', auth, async (req, res) => {
    const projectID = req.body.project
    console.log(projectID)
    try {
        const tasks = await Task.find({owner: req.user._id, project: projectID})
        //await req.user.populate('mytasks').execPopulate()
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send(error._message)
    }
})

router.get('/tasks/show/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        !task? res.status(404).send({message: "Task Not Found"}) : res.send(task)
    } catch (error) {
        res.status(500).send(error._message)
    }
})

/*
Documentation
updates = contain data from request body
update = contain parameter update data from updates using forEach function
req.body[update] = contain value from update parameter
*/
router.patch('/tasks/edit/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowUpdate = ['description', 'complete']
    const isUpdated = updates.every((update) => allowUpdate.includes(update))
    if (!isUpdated) {
        return res.status(400).send({
            message: 'Invalid Update'
        })
    }
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        updates.forEach((update) => task[update] = req.body[update])
        task.save()
        !task? res.status(404).send({message: "Task Not Found"}) : res.send(task)
    } catch (error) {
        res.status(500).send(error._message) 
    }
})

router.delete('/tasks/delete/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        await Task.findOneAndDelete({_id, owner: req.user._id})
        res.status(200).send(
            {
                message: "Task Has been deleted"
            })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router