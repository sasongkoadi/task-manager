const Executor = require('../models/executors')

const addExecutor = async (req, res) => {
    const executor = new Executor({
        ...req.body
    })
    try {
       await executor.save() 
       res.status(201).send(executor)
    } catch (error) {
       res.status(400).send(error._message) 
    }
}

const showAllExecutors = async (req, res) => {
    try {
       const allExecutors = await Executor.find({}) 
       res.status(200).send(allExecutors)
    } catch (error) {
       res.status(400).send(error._message) 
    }
}

module.exports = {
    addExecutor,
    showAllExecutors 
}