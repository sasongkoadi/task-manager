const WorkRequest = require('../models/workrequest')

const addWorkRequest = async (req, res) => {
    const wr = new WorkRequest({
        ...req.body
    })
    try {
       await wr.save() 
       res.status(201).send(wr)
    } catch (error) {
       res.status(400).send(error._message)
    }
}

const showWR = async (req, res) => {
    try {
       const wr = await WorkRequest.find({})
       .populate({path: 'executor', select: 'name'})
       .populate({path: 'reporter', select: 'name'})
       .populate({path: 'statusRequest', select: 'status'}) 
       res.status(201).send(wr)
    } catch (error) {
       res.status(400).send(error._message) 
    }
}

const showWRStatus = async (req, res) => {
    const _id = req.params.id
    try {
       const wr = await WorkRequest.find({statusRequest: _id})
       .populate({path: 'executor', select: 'name'})
       .populate({path: 'reporter', select: 'name'})
       .populate({path: 'statusRequest', select: 'status'}) 
       console.log(wr);
       res.status(201).send(wr)
    } catch (error) {
       res.status(400).send(error._message) 
    }
}

const showWRId = async (req, res) => {
    const _id = req.params.id
    try {
       const wr = await WorkRequest.findOne({_id}) 
       .populate({path: 'executor', select: 'name'})
       .populate({path: 'reporter', select: 'name'})
       .populate({path: 'statusRequest', select: 'status'})
       !wr? res.status(404).send({ message: 'Work Request Not Found'}) : res.status(201).send(wr)
    } catch (error) {
       res.status(500).send(error._message) 
    }
}

const deleteWR = async (req, res) => {
    const _id = req.params.id
    try {
       await WorkRequest.findOneAndDelete({ _id}) 
       res.status(200).send({
           message: 'Work Request Has Been Deleted'
       })
    } catch (error) {
       res.status(500).send(error._message) 
    }
}

const updateWR = async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowUpdate = ['wrNumber', 'item', 'dateCreate', 'description', 'executor', 'reporter', 'workingStatus', 'statusRequest']
    const isUpdated = updates.every((update) => allowUpdate.includes(update))
    if(!isUpdated) {
        return res.status(400).send({
            message: 'Invalid Update'
        })
    }
    try {
       const wr = await WorkRequest.findOne({ _id }) 
       updates.forEach((update) => {
           wr[update] = req.body[update]
       })
       wr.save()
       !wr? res.status(404).send({ message: 'Work Request Not Found'}) : res.status(200).send(wr)
    } catch (error) {
       res.status(500).send(error._message) 
    }
}


module.exports = {
    addWorkRequest,
    showWR,
    showWRStatus,
    showWRId,
    updateWR,
    deleteWR
}