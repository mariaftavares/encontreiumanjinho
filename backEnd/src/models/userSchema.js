const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        trype:String 
    },
    createdate:{
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('user',userSchema)