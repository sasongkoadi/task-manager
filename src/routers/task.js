const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()    
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error._message) 
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send(error._message) 
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
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
router.patch('/tasks/:id', async (req, res) => {
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
        const task = await Task.findById(_id)
        updates.forEach((update) => task[update] = req.body[update])
        task.save()
        !task? res.status(404).send({message: "Task Not Found"}) : res.send(task)
    } catch (error) {
        res.status(500).send(error._message) 
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        res.status(200).send( )
    } catch (error) {
    }
})

module.exports = router