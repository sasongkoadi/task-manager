const Project = require('../models/project')

const addProject = async (req, res) => {
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
}

const showProjects = async (req, res) => {
    try {
        const projects = await Project.find({author: req.user._id})
        res.status(201).send(projects)
    } catch (error) {
        res.status(500).send(error._message)
    }
}

const showProjectId = async (req, res) => {
    const _id = req.params.id
    try {
       const project = await Project.findOne({_id, author: req.user._id}) 
       !project? res.status(404).send({ message: 'Project Not Found'}) : res.status(200).send(project)
    } catch (error) {
       res.status(500).send(error._message) 
    }
}

const editProject = async (req, res) => {
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
}

const deleteProject = async (req, res) => {
    const _id = req.params.id
    try {
       await Project.findOneAndDelete({_id, author: req.user._id}) 
       res.status(200).send({
           message: 'Project Has Been Deleted'
       })
    } catch (error) {
       res.status(500).send(error._message) 
    }
}

module.exports = {
    addProject,
    showProjectId,
    showProjects,
    editProject,
    deleteProject
} 