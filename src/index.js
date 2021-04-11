const express = require('express')
require('./db/mongoose')
const usersRouter = require('./routers/users')
const tasksRouter = require('./routers/task')
const app = express()
const bcrypt = require('bcrypt')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(usersRouter, tasksRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
