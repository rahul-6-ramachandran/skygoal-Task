const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    Email : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required :true
    }
})


userSchema.pre("save",function(next){
    const user = this
    if(!user.isModified("Password")) return next()
    bcrypt.genSalt(8,(error,salt)=>{
        if(error) return next(error)
        bcrypt.hash(user.Password,salt,(error,hash)=>{
            if(error) return next(error)
            user.Password = hash
        return next()
    })
        })
})



module.exports = mongoose.model("Users",userSchema)