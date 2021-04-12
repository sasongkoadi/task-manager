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

/*
Documentation
Hash plain text password to hash and save to database
using method isModified with password parameter
it will gives true if user create a new password
and it will gives true if user edit a password
*/
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
       user.password = await bcrypt.hash(user.password, 10) 
    }
    next()
})

/* 
Documentation
static methods are define on the model
exp -> static method findOne from model User

Make a static method findByCredentials
using parameter email for search user
and password for login

user = contain user data from method findOne using email 
isMatch = contain true of false value of password
return user data
Login using email and password
*/
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



/*
Documentation
methods are define for documents
usually using this for get document (data)
*/
userSchema.methods.genAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id : user._id.toString() }, 'testing')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.methods.passwordCheck = async function (password) {
    const user = this
    const isMatch = await bcrypt.compareSync(password, user.password) 
    if (isMatch) {
        return true
    } 
    return false
}

/**
 * Documentation
 * toJSON method is method to hiding a object data 
 * @returns 
 */
userSchema.methods.toJSON = function () {
    const user = this 
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}



const User = mongoose.model('User', userSchema)

module.exports = User