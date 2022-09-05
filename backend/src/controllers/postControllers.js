const postSchema = require('../models/postSchema')

const createPost = async (req, res) => {
    try {
        let {description,uf,city,imagem,genre,species,finaldate} = req.body
        const fields = [description,uf,city,finaldate]
        if(validateField(fields)){
            throw {
                statusCode: 400,
                message: "Por favor informar todos campos obrigatórios: description,uf,city,finaldate",
                details: "Informação insuficientes para a criação da publicação "
            }
        }
        if(species){
           species = typeValue(species)
        }
        if(genre){
            genre = typeValue(genre)
        }
        const newPost = new postSchema({
            id_user: res.locals.id,
            finaldate: finaldate,
            description: description,
            genre: genre|| "não informado",
            species:species|| "não informado",
            imagem: imagem,
            uf: uf.toLowerCase(),
            city:city.toLowerCase(),
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
        },{ id_user: 0 })
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
        if(!req.query.uf && !req.query.city){
            const findPost = await postSchema.find({adopted:false},{ _id: 0 }).populate({path:'id_user',select:'name phone -_id'}).sort({finaldate:'asc'})
            if (findPost.length == 0) {
                return res.status(200).send("Nenhuma publicação foi encontrada!")
            }
            res.status(200).send(findPost)
        }

        if(req.query.uf && !req.query.city){
            const findPost = await postSchema.find({uf:req.query.uf},{ _id: 0 }).and({adopted:false}).populate({path:'id_user',select:'name phone -_id'}).sort({finaldate:'asc'})
            if (findPost.length == 0) {
                return res.status(200).send(`Nenhuma publicação foi encontrada!`)
            }
            res.status(200).send(findPost)
        }
        if(req.query.uf && req.query.city){
            const findPost = await postSchema.find({uf:req.query.uf},{ _id: 0 }).and({city:req.query.city},{adopted:false}).populate({path:'id_user',select:'name phone -_id'}).sort({finaldate:'asc'})
            if (findPost.length == 0) {
                return res.status(200).send(`Nenhuma publicação foi encontrada!`)
            }
            res.status(200).send(findPost)
        }
        if(!req.query.uf && req.query.city){
            throw {
                statusCode: 400,
                message: `Não foi informado estado (UF) da cidade ${req.query.city}`,
                details: "Informações insuficientes para a busca "
            }
        }


    } catch (error) {
        if(error.statusCode){
            res.status(error.statusCode).json(error)
        }

        else{
            res.status(500).send(error.message)
        }
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

const validateField = (fields)=>{
    const validation = fields.some(field => !field || field.trim() == "")
    return validation;
}

const typeValue = (value) =>{
    const values = {
        c:"cachorro",
        g:"gato",
        o:"outro",
        f:"fêmea",
        m:"macho"
    }
    value = values[value.toLowerCase()]
    return value 
}



module.exports={ 
    createPost,
    getPostUser,
    getAllPost,
    updatePost,
    deletePost
}