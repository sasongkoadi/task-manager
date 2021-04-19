const express = require('express')
require('./db/mongoose')
const usersRouter = require('./routers/users')
const tasksRouter = require('./routers/task')
const app = express()
const HOST = '0.0.0.0'
const PORT = process.env.PORT || 8080 

app.use(express.json())
app.use(usersRouter, tasksRouter)
app.listen(PORT,HOST, () => console.log(`Example app listening on http://${HOST}:${PORT}`))

const Task = require('./models/task')

const main = async () => {
    const task = await Task.findById('60755e5ecd2b1224c94c0b50') 
    await task.populate('owner').execPopulate()
    console.log(task);
}

main()
