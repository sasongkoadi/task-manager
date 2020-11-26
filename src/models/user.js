const mongoose = require('mongoose')
const validator = require('validator').default

const User = mongoose.model('User', {
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


const createUser = (userData) => {
    const user = new User(userData)
    return user.save()
}

const getUsersData = () => {
    return User.find({})
}

const getUserById = (id) => {
    return User.findById(id)
}

const updateUserById = (id, userData) => {
    return User.findByIdAndUpdate({_id: id}, userData, {new: true, runValidators: true})
}

const deleteUserById = (id) => {
    return User.findByIdAndRemove({_id: id})
}


module.exports = {
    createUser,
    getUsersData,
    getUserById,
    updateUserById,
    deleteUserById
} 