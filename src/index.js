const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('./db/mongoose')
const Router = require('./router/routers')
const RoleData = require('./controller/rolesController')
const app = express()
const HOST = '127.0.0.1'
const PORT = process.env.PORT || 44010


RoleData()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(Router)
app.listen(PORT,HOST, () => console.log(`Example app listening on http://${HOST}:${PORT}`))