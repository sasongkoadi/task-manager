const express = require('express')
<<<<<<< HEAD
const app = express()
require('./db/mongoose')
const bodyParser = require('body-parser')
const router = require('./route/routers')
const port = process.env.PORT || 3000

const Task = require('./models/task')

//middleware
const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(router)
app.use(express.json())

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

app.patch('/tasks/:id', async (req, res) => {
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
        const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})  
        !task? res.status(404).send({message: "Task Not Found"}) : res.send(task)
    } catch (error) {
        res.status(500).send(error._message) 
    }
})

app.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        res.status(200).send( )
    } catch (error) {
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
=======
const cors = require('cors')
const bodyParser = require('body-parser')
require('./db/mongoose')
const usersRouter = require('./routers/users')
const tasksRouter = require('./routers/tasks')
const projectsRouter = require('./routers/projects')
const app = express()
const HOST = '127.0.0.1'
const PORT = process.env.PORT || 44010

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(usersRouter, tasksRouter, projectsRouter)
app.listen(PORT,HOST, () => console.log(`Example app listening on http://${HOST}:${PORT}`))
>>>>>>> 7b06ba387639e7944ab61ecb63312d90b71c7cf7
