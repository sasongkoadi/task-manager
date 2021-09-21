const Role = require('../models/roles')
const rolesData = [4,5,6,7,8,9]
const StatusReq = require('../models/statusRequest')

const AutoInputData = async () => {
    console.log('TESTING');
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

    await StatusReq.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            const status = new StatusReq({ name: 'Daily'})
            status.save()
        } else {
            console.log('StatusRequest Collection is Ready');
        }
    }) 
}


module.exports = AutoInputData 