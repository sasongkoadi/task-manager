const jwt = require('jsonwebtoken')
const User = require('../models/user')

/*
Roles Rules
9 = Admin
8 = Moderator
7 = AVP, JVP, SPV, FRM
6 = SO, OP PNL1, OP PNL2
5 = User, OP LAP
4 = Guest
*/

const authentication = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, 'testing')
        const user = await User.findOne({_id: decode._id, 'tokens.token': token}).populate('role').exec()
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.userData = user
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please Authenticate'})
    }
}

const isAdmin = async (req, res,next) => {
    try {
        const user = req.userData
        const role = user.role
        if(role.data === 9){
            req.user = user
            next()
        } else {
            res.status(500).send({ message: "Require Admin Account"}) 
        }
    } catch (error) {
        res.status(500).send(error)
    }
    
}

const isUser = async (req, res,next) => {
    try {
        const user = req.userData
        const role = user.role
        console.log(user);
        if(role.data >= 5 && role.data <=9 ){
            req.user = user
            next()
        }   
    } catch (error) {
        res.status(500).send(error)
    }
    
}

const isGuest = async (req, res, next) => {
    try {
        const user = req.userData
        const role = user.role 
        if (role.data >= 4 && role.data <= 9){
            req.user = user
            next()
        } else {
            res.status(500).send({ message: "Your are Guest Account"})
        }
    } catch (error) {
        
    }
}

const isModerator = async (req, res,next) => {
    try {
        const user = req.userData
        const role = user.role 
        if(role.data === 8){
            req.user = user
            next()
        } else {
            res.status(500).send({ message: "Require Moderator Account"}) 
        }   
    } catch (error) {
        res.status(500).send(error)
    }
    
}
module.exports = {
    authentication,
    isAdmin,
    isModerator,
    isUser,
    isGuest,
} 