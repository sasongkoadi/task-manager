const User = require('../src/models/user')
const Task = require('../src/models/task')
require('../src/db/mongoose')

User.findByIdAndUpdate('5faf918df87c1e33a189286b', {age: 1})
    .then((result) => {
        console.log(result);
        User.countDocuments({age: 1})
    .then((result) =>{
        console.log(result);
    })
}).catch((err) => {
    console.log(err);
})

Task.findByIdAndUpdate('5fab707f595839d2747b1814', {complete: true})
    .then((result) => {
        console.log(result);
        Task.countDocuments({complete: true})
    .then((result) => {
        console.log(result);
    })
    })
    .catch((err) => {
        console.log(err);
    })
