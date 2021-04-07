const express = require('express')
const router = new express.Router()
const User = require('../models/user')


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.genAuthToken()
        res.status(201).send( { user, token })
    } catch (error) {
        res.status(400).send(error) 
    }
})

/*
Documentation
Login using method findByCredentials from user static method
user = contain user data 
*/
router.post('/users/login', async (req, res) => {
    try {
       const user = await User.findByCredentials(req.body.email, req.body.password) 
       const token = await user.genAuthToken()
       res.send({ user, token })
    } catch (error) {
       res.status(400).send({message: 'Unable to login'}) 
    }
})

router.get('/users', async (req, res) => {
    try {
        const user = await User.find({}) 
        res.send(user)
    } catch (error) {
        res.status(500).send(error._message)
        
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id) 
        !user? res.status(404).send({message: "User Not Found"}) : res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error._message)    
    }
})

/*
Documentation
updates = contain data from request body
update = contain parameter update data from updates using forEach function
req.body[update] = contain value from update parameter
*/
router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowUpdate = ['name', 'age', 'email', 'password']
    const isUpdated = updates.every((update) => allowUpdate.includes(update))
    if (!isUpdated) {
        return res.status(400).send({
            message: "Invalid Update"
        })
    }
    try {
        const user = await User.findById(_id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        !user? res.status(404).send({message: "User Not Found"}) : res.send(user)
    } catch (error) {
        res.status(500).send(error._message) 
    }
})

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id) 
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error._message)
    }
})

module.exports = router