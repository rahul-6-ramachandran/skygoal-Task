const express = require('express')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const path = require('path')
// imports
const Auth = require('./Api/index')




// Database
const connectDB = require('./Database/connection')



const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

const PORT = process.env.PORT

// Application middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())




app.use('/auth',Auth)



app.get('/',(req,res)=>{
    res.json({message:"Server Connection Successfull"})
})



app.listen(PORT,connectDB()
.then(()=> console.log("server running succesfully"))
.catch(()=>console.log("Connection error")))