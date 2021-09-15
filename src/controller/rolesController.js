const Role = require('../models/roles')
const rolesData = ['user', 'admin', 'moderator']

const createRole = async () => {
    console.log('TESTING');
    await Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            rolesData.forEach(role => {
                new Role({
                    name: role
                    }).save(err => {
                        if (err) {
                            console.log("error", err);
                        }
                        console.log( role, " added to roles collection");
                        });
            })
        } else {
            return console.log('Roles DB is Ready');
        }
    })    
}

module.exports = createRole