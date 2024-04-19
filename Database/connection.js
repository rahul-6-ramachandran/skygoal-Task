const mongoose = require("mongoose");

const  connectDB = async ()=>{ 
    mongoose.Promise = global.Promise
    mongoose.connect(process.env.DB_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    
   
} 

module.exports = connectDB