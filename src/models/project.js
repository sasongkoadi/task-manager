const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
        title: {
            type: String,
            trim: true,
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    ) 

const Project = mongoose.model('Project', projectSchema)

module.exports = Project 