const express = require('express')
const auth = require('../middleware/auth')
const Project = require('../models/project')
const router = new express.Router()

router.post('/project/add', auth, async (req, res) => {
    const project = new Project({
        ...req.body,
        author: req.user._id,
    })
    console.log(project)
    try {
        await project.save()
        res.status(201).send(project)
    } catch (error) {
        res.status(400).send(error._message)
    }
})

router.get('/project/show', auth, async (req, res) => {
    try {
        const projects = await Project.find({author: req.user._id})
        res.status(201).send(projects)
    } catch (error) {
        res.status(500).send(error._message)
    }
})

router.get('/project/show/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
       const project = await Project.findOne({_id, author: req.user._id}) 
       !project? res.status(404).send({ message: 'Project Not Found'}) : res.status(200).send(project)
    } catch (error) {
       res.status(500).send(error._message) 
    }
})

router.patch('/project/edit/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowUpdate = ['title']
    const isUpdated = updates.every((update) => allowUpdate.includes(update))
    if(!isUpdated){
        return res.status(400).send({
            message: 'Invalid Update'
        })
    }
    try {
       const project = await Project.findOne({_id, author: req.user._id}) 
       updates.forEach((update) => {
           project[update] = req.body[update]
       })
       project.save()
       !project? res.status(400).send({ message: 'Project Not Found'}) : res.status(200).send(project)
    } catch (error) {
       res.status(500).send(error._message) 
    }
})

router.delete('/project/delete/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
       await Project.findOneAndDelete({_id, author: req.user._id}) 
       res.status(200).send({
           message: 'Project Has Been Deleted'
       })
    } catch (error) {
       res.status(500).send(error._message) 
    }
})

module.exports = router