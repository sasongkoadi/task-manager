const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('./db/mongoose')
const Router = require('./router/routers')
const app = express()
const HOST = '127.0.0.1'
const PORT = process.env.PORT || 44010

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(Router)
app.listen(PORT,HOST, () => console.log(`Example app listening on http://${HOST}:${PORT}`))
