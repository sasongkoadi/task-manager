const User = require('../models/user')

async function createUser(req, res) {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.genAuthToken()
        res.status(201).send( { user, token, message: 'Register Successful' })
    } catch (error) {
        res.status(400).send(error) 
    }
}

/*const getUsersData = async (req, res) => {
    try {
        const user = await userModel.getUsersData 
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error) 
    }
} */

module.exports = {
    createUser,
   // getUsersData
}
