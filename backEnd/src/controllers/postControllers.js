const postSchema = require('../models/postSchema')


const createPost = async (req, res) => {
   
    try {
        if(req.body.uf === undefined || req.body.uf === null ||req.body.uf.trim() == ""){
            throw {
                statusCode: 400,
                message: "Não foi informado o estado (UF).",
                details: "Informação insuficientes para a criação da publicação "
            }
        }
        if(req.body.city === undefined || req.body.city === null ||req.body.city.trim() == ""){
            throw {
                statusCode: 400,
                message: "Não foi informado o cidade (city).",
                details: "Informação insuficientes para a criação da publicação "
            }
        }
        if(req.body.finaldate === undefined || req.body.finaldate === null ||req.body.finaldate.trim() == ""){
            throw {
                statusCode: 400,
                message: "Não foi informado até que data pode ficar com animalzinho (finaldate).",
                details: "Informação insuficientes para a criação da publicação "
            }
        }
        if(req.body.description === undefined || req.body.description === null ||req.body.description.trim() == ""){
            throw {
                statusCode: 400,
                message: "Não foi informado nenhuma descrição para a publicação (description).",
                details: "Informação insuficientes para a criação da publicação "
            }
        }
        const newPost = new postSchema({
            id_user: res.locals.id,
            finaldate: req.body.finaldate,
            description: req.body.description,
            genre: req.body.genre || "não informado",
            species: req.body.species || "não informado",
            imagem: req.body.imagem,
            uf: req.body.uf,
            city: req.body.city,
            adopted:false
        })

        const savedPost = await newPost.save()
        res.status(201).send({
            message: "Publicação criada com sucesso",
            savedPost
        })

    } catch (error) {
        if(error.statusCode){
            res.status(error.statusCode).json(error)
        }

        else{
            res.status(500).send(error.message)
        }
    }
}


const getPostUser = async (req, res) => {
    try {
        const findPostUser = await postSchema.find({
            id_user: res.locals.id
        })
        if (findPostUser.length == 0) {
            return res.status(200).send("Nenhuma publicação foi criada pelo seu usuário")
        }
        res.status(200).send(findPostUser)
    } catch (error) {
         res.status(500).send(error.message)
    }
}



const getAllPost = async (req, res) => {
    try {
        const findPost = await postSchema.find({adopted:true}).populate({path:'id_user',select:'name'}).sort({finaldate:'asc'})
        if (findPost.length == 0) {
            return res.status(200).send("Nenhuma publicação foi publicada!")
        }
        res.status(200).send(findPost)

    } catch (error) {
        res.status(500).send(error.message)
    }
}


const updatePost = async(req,res)=>{ 
    try {
        const findPost = await postSchema.findOne({_id:req.params.id})
        if(findPost.id_user != res.locals.id){
            throw {
                statusCode: 400,
                message: "O id desta publicação não pertence ao seu usuário",
                details: "Informação incorreta "
            }
        }
        if(findPost.length == 0){
            throw {
                statusCode: 400,
                message: "Não existe nenhuma publicação com esse id",
                details: "Informação incorreta "
            }
        }
        findPost.description =req.body.description || findPost.description
        findPost.finaldate =req.body.finaldate || findPost.finaldate,
        findPost.genre =req.body.genre || findPost.genre,
        findPost.species =req.body.species || findPost.species,
        findPost.imagem=req.body.imagem ||findPost.imagem,
        findPost.uf=req.body.uf || findPost.uf,
        findPost.city=req.body.city || findPost.city,
        findPost.adopted=req.body.adopted || findPost.adopted
        const savedUpdate = await findPost.save()
        res.status(200).send({message:"Publicação alterada:",savedUpdate})
        
    } catch (error) {
        if(error.statusCode){
            res.status(error.statusCode).json(error)
        }

        else{
            res.status(500).send(error.message)
        }
    }
}

const deletePost = async(req,res)=>{
    try {
       const findPost = await postSchema.findOne({_id:req.params.id})
       if(findPost.id_user != res.locals.id){
           throw {
               statusCode: 400,
               message: "O id desta publicação não pertence ao seu usuário",
               details: "Informação incorreta "
           }
       }
       if(findPost.length == 0){
           throw {
               statusCode: 400,
               message: "Não existe nenhuma publicação com esse id",
               details: "Informação incorreta "
           }
       }
       const postdelete = await findPost.delete()
       res.status(200).send({message:"Publicação excluida com sucesso:",postdelete})

    } catch (error) {
        if(error.statusCode){
            res.status(error.statusCode).json(error)
        }

        else{
            res.status(500).send(error.message)
        }
    }
}



module.exports={ 
    createPost,
    getPostUser,
    getAllPost,
    updatePost,
    deletePost
}