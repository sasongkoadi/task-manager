const userModel = require('../models/user')

const createUser = async (req, res) => {
    try {
        const user = await userModel.createUser
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error) 
    }
}

const getUsersData = async (req, res) => {
    try {
        const user = await userModel.getUsersData 
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error) 
    }
}

module.exports = {
    createUser,
    getUsersData
}
