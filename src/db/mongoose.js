const mongoose = require('mongoose')
const validator = require('validator').default

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
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


