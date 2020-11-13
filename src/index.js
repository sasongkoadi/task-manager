const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    console.log(req.body);
    res.send('GET users request to the homepage')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
