const User = require('../models/user')

const createUser = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.genAuthToken()
        res.status(201).send( { user, token, message: 'Register Successful' })
    } catch (error) {
        res.status(400).send(error) 
    }
}

/*
Documentation
Login using method findByCredentials from user static method
user = contain user data 
*/
const loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password) 
        const token = await user.genAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send({message: 'Unable to login'}) 
    }
}


/*
Documentation

req.user.tokens.filter()
this method give a result req.user.tokens = contain value token without token.token === req.token
and than req.user.save() will save new user data 

*/
const logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send() 
    }
}


/*
Documentation 

req.user.tokens = [] will give empty array on tokens data
adn than it will save using method req.user.save() as new user data
 */
const logoutUserAll = async (req, res)=> {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send({ message: "You're already logout"})
    } catch (error) {
        res.status(500).send() 
    }
}

const profile = async (req, res) => {
    try {
       res.status(200).send(req.user) 
    } catch (error) {
       res.status(500).send(error) 
    }
}



/*
Documentation
updates = contain data from request body
update = contain parameter update data from updates using forEach function
req.body[update] = contain value from update parameter
*/
const editProfile = async (req, res) => {
    const updates = Object.keys(req.body)
    const updateProfileData = ['name', 'age', 'email']
    const isUpdated = updates.every((update) => updateProfileData.includes(update))
    if (!isUpdated) {
        return res.status(400).send({
            message: "Invalid Update"
        })
    }
    try {
        const user = req.user 
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error._message) 
    }
}

const editPassword = async (req, res) => {
    try {
        const user = req.user
        const passwordInput = req.body.password 
        const check = await user.passwordCheck(passwordInput)
        if (!check) {
            user.password = passwordInput
            user.tokens = []
            await user.save()
            res.status(200).send(
                {
                    message: "Password has been changed"
                })
        } else {
            res.status(400).send({
                message: "Your are using a same password"
            })
        }
    } catch (error) {
        res.status(400).send(error) 
    }
}

const deleteUser = async (req, res) => {
    try {
        await req.user.remove()
        res.status(200).send(
            {
                message: "User Has been deleted"
            })
    } catch (error) {
        res.status(500).send(error._message)
    }
}

//Admin Jobs

const showAllUsers = async (req, res) => {
    console.log('AllUsers Data ====');
    try {
        const allUsers = await User.find({})
        res.status(200).send(allUsers)
    } catch (error) {
        res.status(500).send(error._message)
    }
}

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    logoutUserAll,
    profile,
    editProfile,
    editPassword,
    deleteUser,
    showAllUsers
}
