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


async function myFunction() {
    const myPassword = 'Zarakai2724'
    const salt = 10
    const hashPassword = await bcrypt.hash(myPassword, 10)
    console.log(myPassword);
    console.log(hashPassword);

    const isMatch = await bcrypt.compare(myPassword, hashPassword)
    console.log(isMatch);
}

myFunction()