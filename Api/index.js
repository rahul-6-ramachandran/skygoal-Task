const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// Middlewares
const verifyUserToken = require('../Middleware/index');

// Database imports
const userModel = require('../Database/Models')

// Validation imports
const validateUser = require('../Validation/index')


const Router = express.Router()


// Route  : '/signup'
// Method : POST
// Params : None
// Description : For User Signup

Router.post('/signup', async (req, res) => {
    try {

        // User Credentials Validation
        
        await validateUser(req.body.credentials)

        // Checking if the user already exists
      
        const user = await userModel.findOne({ Email: req.body.credentials.Email })
        if (!user){
            // Creating new User

            const newUser = await userModel.create(req.body.credentials)
            const token = jwt.sign({id:newUser._id.toString()},process.env.JWT_SECRET)
            res.status(200).json({ token,newUser })
        
        } else {
            res.status(500).json("User already exists")
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})


// Route  : '/signin'
// Method : POST
// Params : None
// Description : For User Signin

Router.post('/signin', async (req, res) => {
    try {
        // User credentials Validation
        console.log(req.body.credentials)
        await validateUser(req.body.credentials)

        // Retrieving user with Email
        const user = await userModel.findOne({ Email: req.body.credentials.Email })
      
        if (user) {
            // Password Verification
            const doesPasswordMatch = bcrypt.compare(req.body.credentials.Password, user.Password)
            if (!doesPasswordMatch) {
                console.log("Invalid password")
                return  res.status(500).json({ error: error.message })
            }

            // token generation
            const token = jwt.sign({id:user._id.toString()},process.env.JWT_SECRET)
            return res.status(200).json({ token,user })
        }else {
            return  res.status(500).json("User Not Found")
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
)


// Route  : '/'
// Access : Private
// Method : Get
// Params : user_id
// Description : The "Hi Buddy" text will only displays if the token is valid.

Router.get('/:user_id',verifyUserToken, async (req, res) => {
    try {


        const {user_id} = req.params
        const objID = new mongoose.Types.ObjectId(user_id)

        // Checking if the user already exists
       
        const user = await userModel.findById(objID)
        if (user){
            

            res.status(200).json({status:"Success",message:"Hi Buddy"})
        
        } else {
            res.status(500).json("User not Found")
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})


module.exports = Router