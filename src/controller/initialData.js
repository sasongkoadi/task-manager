const Role = require('../models/roles')
const rolesData = [4,5,6,7,8,9]
const workrequestStatus = require('../models/workrequestStatus')

const AutoInputData = async () => {
    await Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            rolesData.forEach(role => {
                new Role({
                    data: role
                    }).save(err => {
                        if (err) {
                            console.log("error", err);
                        }
                        console.log( role, " added to roles collection");
                        });
            })
        } else {
            console.log('Roles Collection is Ready');
        }
    })    

    await workrequestStatus.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            const status = new workrequestStatus({ status: 'Daily'})
            status.save()
            console.log('Work Request Status added to collection');
        } else {
            console.log('Work Request Status Collection is Ready');
        }
    }) 
}


module.exports = AutoInputData 