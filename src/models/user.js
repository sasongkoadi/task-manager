const mongoose = require('mongoose')
const validator = require('validator').default
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw  new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim:true,
        minlength: 6,
        validate(value){
            if (value.toLowerCase().includes('password')) {
                throw new Error('Your Password cannot contain password')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error ('Age must be positive')
            }
       }
    },
})

userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
       user.password = await bcrypt.hash(user.password, 10) 
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User