const mongoose = require('mongoose')

const workReqSchema = new mongoose.Schema({
    wrNumber: {
        type: Number,
    },
    item: {
        type: String,
        require: true,
        trim: true
    },
    dateCreate: {
        type: Date,
        require: true,
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    executor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Executor',
        require: true,
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    workingStatus: {
        type: String,
        require: true 
    },
    statusRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StatusReq',
        require: true,
    }
},
{
    timestamps: true
})

const WorkRequest = mongoose.model('WorkRequest', workReqSchema)

module.exports = WorkRequest 