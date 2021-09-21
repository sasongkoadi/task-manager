const mongoose = require('mongoose')

const executorSchema = new mongoose.Schema({
    name: {
        type: String
    }
})

const Executor = mongoose.model('Executor', executorSchema)

module.exports = Executor