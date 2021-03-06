const mongoose = require('mongoose')
const validator = require('validator').default
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
})

userSchema.methods.genAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id : user._id.toString() }, 'testing')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

// Login using email and password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

// Hash plain text password to hash before save
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
       user.password = await bcrypt.hash(user.password, 10) 
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User