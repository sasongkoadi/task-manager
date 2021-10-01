const mongoose = require('mongoose')

const workReqSchema = new mongoose.Schema({
    workrequestNumber: {
        type: Number,
    },
    item: {
        type: String,
        require: true,
        trim: true
    },
    date: {
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
    status: {
        type: String,
        require: true 
    },
    workrequestStatus: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'workrequestStatus',
    }
},
{
    timestamps: true
})

const WorkRequest = mongoose.model('WorkRequest', workReqSchema)

module.exports = WorkRequest 