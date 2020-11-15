const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//Users

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((err) => {
        res.status(500).send(err.message)
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send({message: "User Not Found"})
        }
        res.status(200).send(user)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

//TASK 

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks)=> {
        res.status(200).send(tasks)
    }).catch((err) => {
        res.status(500).send(err.message)
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    Task.findById(_id).then((task) => {
        if(!task) {
            return res.status(404).send({message: "Task Not Found"})
        }
        res.send(task)
    }).catch((err) => {
        res.status(500).send(err.message)
    })
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
