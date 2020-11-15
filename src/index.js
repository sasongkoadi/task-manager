const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//Users

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error._message) 
    }
})

app.get('/users', async (req, res) => {
    try {
        const user = await User.find({}) 
        res.send(user)
    } catch (error) {
        res.status(500).send(error._message)
        
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id) 
        !user? res.status(404).send({message: "User Not Found"}) : res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error._message)    
    }
})

//TASK 

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()    
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error._message) 
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send(error._message) 
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        !task? res.status(404).send({message: "Task Not Found"}) : res.send(task)
    } catch (error) {
        res.status(500).send(error._message)
    }
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
