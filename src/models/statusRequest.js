const mongoose = require('mongoose')

const statusReq = new mongoose.Schema({
    status: {
        type: String
    }
})

const StatusReq = mongoose.model('StatusReq', statusReq)

module.exports =StatusReq 