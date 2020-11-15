const User = require('../src/models/user')
const Task = require('../src/models/task')
require('../src/db/mongoose')

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    console.log(user);
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('5faf918df87c1e33a189286b', 22)
    .then((result) => {
        console.log(result);
    })
    .catch((err)=> {
        console.log(err);
    })


const deleteTaskAndCount = async (id, complete) => {
    const task = await Task.findByIdAndRemove(id)
    console.log(task);
    const count = await Task.countDocuments({complete})
    return count
}

deleteTaskAndCount('5fab707f595839d2747b1814', false)
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })