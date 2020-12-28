const express = require('express')
require('./db/mongoose')
const usersRouter = require('./routers/users')
const tasksRouter = require('./routers/task')
const app = express()
const bcrypt = require('bcrypt')
const port = process.env.PORT || 3000

app.use((req, res, next) => {
    res.status(503).send({message: 'Under Maintenance'})
})

app.use(express.json())
app.use(usersRouter, tasksRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const jwt = require('jsonwebtoken')

async function myFunction() {
    const token = jwt.sign({_id: 'abc123'}, 'Zarakai2724', { expiresIn: '30d' })
    console.log(token);

    const data =jwt.verify(token, 'Zarakai2724')
    console.log(data);
}

myFunction()