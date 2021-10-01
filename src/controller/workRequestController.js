const WorkRequest = require('../models/workrequest')
const workrequestStatus = require('../models/workrequestStatus')

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

const showAllWRDaily = async (req, res) => {
    try {
        const data = await workrequestStatus.findOne({status: 'Daily'})
        await data.populate({
            path: 'wrstatus',
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            },
            populate: [{ path: 'executor'}, {path: 'reporter', select: 'name'}, { path: 'workrequestStatus', select: 'status'}],
        }).execPopulate()
        res.status(201).send(data.wrstatus)
    } catch (error) {
        res.status(400).send(error._message) 
    }
}

const showAllWRConditional = async (req, res) => {
    const _id = req.params.id
    try {
        const data = await workrequestStatus.findOne({_id})
        await data.populate({
            path: 'wrstatus',
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            },
            populate: [{ path: 'executor'}, {path: 'reporter', select: 'name'}, { path: 'workrequestStatus', select: 'status'}],
        }).execPopulate()
        res.status(201).send(data.wrstatus)
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
        .populate({path: 'workrequestStatus', select: 'status'})
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
    const allowUpdate = ['wrNumber', 'item', 'dateCreate', 'description', 'executor', 'reporter', 'workingStatus', 'workrequestStatus']
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
    showAllWRDaily,
    showAllWRConditional,
    showWRId,
    updateWR,
    deleteWR
}