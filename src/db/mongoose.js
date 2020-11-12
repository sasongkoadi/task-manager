const mongoose = require('mongoose')
const validator = require('validator').default

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

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
        minLength: 6,
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

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    }
})

/*
const user = new User({
    name: 'Zahra ',
    age: 3,
    email: ' ZAHRA27@qmail.id',
    password: 'passWord' 
})

user.save().then((result) => {
    console.log(result); 
}).catch((err) => {
    console.log(err.message); 
});

*/

const task = new Task({
    description: ' Learn Javascript'
})

task.save().then((task) => {
    console.log(task);
}).catch((error) => {
    console.log(error.message);
})


