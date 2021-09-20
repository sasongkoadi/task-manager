const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    data: Number,
})

const Role = mongoose.model('Role', roleSchema)

module.exports = Role 