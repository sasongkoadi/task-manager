const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
            trim: true,
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
    ) 

const Project = mongoose.model('Project', projectSchema)

module.exports = Project 