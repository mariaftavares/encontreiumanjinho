const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    id_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    description:{
        type:String
    },
    createdate:{
        type: Date,
        default: new Date()
    },
    finaldate:{
        type: Date
    },
    genre:{
        type:String
    },
    species :{
        type:String
    },
    imagem:[{
        type: String
    }],
    uf:{
        type:String
    },
    city:{
        type:String
    },
    adopted :{
        type: Boolean
    }
    
})

module.exports = mongoose.model('post',postSchema)