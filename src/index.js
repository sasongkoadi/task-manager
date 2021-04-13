const express = require('express')
require('./db/mongoose')
const usersRouter = require('./routers/users')
const tasksRouter = require('./routers/task')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(usersRouter, tasksRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const Task = require('./models/task')

const main = async () => {
    const task = await Task.findById('60755e5ecd2b1224c94c0b50') 
    await task.populate('owner').execPopulate()
    console.log(task);
}

main()