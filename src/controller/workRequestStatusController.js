const  workrequestStatus = require('../models/workrequestStatus')

const addStatus = async (req, res) => {
    const status = new workrequestStatus({
        ...req.body
    })
    try {
       await status.save() 
       res.status(200).send(status)
    } catch (error) {
       res.status(400).send(error._message) 
    }
}

const showAllStatus = async (req, res) => {
    try {
        const allStatus = await workrequestStatus.find({})
        res.status(200).send(allStatus)
    } catch (error) {
        res.status(500).send(error._message)
    }
}

module.exports = {
    addStatus,
    showAllStatus
}