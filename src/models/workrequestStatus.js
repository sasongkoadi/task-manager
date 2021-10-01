const mongoose = require('mongoose')

const workrequestStatusSchema = new mongoose.Schema({
    status: {
        type: String
    }
})

workrequestStatusSchema.virtual('wrstatus', {
    ref: 'WorkRequest',
    localField: '_id',
    foreignField: 'workrequestStatus'
})


const workrequestStatus = mongoose.model('workrequestStatus', workrequestStatusSchema)


module.exports = workrequestStatus 