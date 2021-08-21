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

module.exports = router