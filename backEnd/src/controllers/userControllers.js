const userSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET= process.env.SECRET


const createUser = async (req,res)=>{ 
    try {
        console.log(req.body)
        if(req.body.email === undefined || req.body.email === null ||req.body.email.trim() == ""){
            throw {
                statusCode: 400,
                message: "Não foi informado email.",
                details: "Informações insuficientes para a criação de um usuário "
            }
        }
        if(req.body.name === undefined || req.body.name === null ||req.body.name.trim() == ""){
            throw {
                statusCode: 400,
                message: "Não foi informado o nome.",
                details: "Informações insuficientes para a criação de um usuário  "
            }
        }
        if(req.body.password === undefined || req.body.password === null ||req.body.password.trim() == ""){
            throw {
                statusCode: 400,
                message: "Não foi informado a senha",
                details: "Informações insuficientes para a criação de um usuário  "
            }
        }
        if(req.body.phone === undefined || req.body.phone === null ||req.body.phone.trim() == ""){
            throw {
                statusCode: 400,
                message: "Não foi informado o telefone.",
                details: "Informações insuficientes para a criação de um usuário  "
            }
        }
        if(!validatePhone(req.body.phone)){
            throw {
                statusCode: 400,
                message: "Numero de telefone informado inválido",
                details: "Informações insuficientes para a criação de um usuário  "
            }

        }
        if(!validateEmail(req.body.email)){
            throw {
                statusCode: 400,
                message: "Email informado inválido",
                details: "Informações insuficientes para a criação de um usuário  "
            }

        }
        const emailExist = await  userSchema.exists({email:req.body.email})
        if(emailExist){
            throw {
                statusCode: 409,
                message: "Email já cadastrado no sistema",
                details: "Usuário já cadastrado"
            }
        }
        const hashedpassaword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedpassaword
        const newUser = new userSchema(req.body)
        const savedUser = await newUser.save()
        res.status(201).send({
            message:"Usuario criado com sucesso!",
            savedUser
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

const login = async (req,res)=>{
    try {
        if(req.body.email === undefined || req.body.email === null ||req.body.email.trim() == ""){
            throw {
                statusCode: 400,
                message: "Não foi informado email.",
                details: "Informações insuficientes para realizar o login "
            }
        }
        if(req.body.password === undefined || req.body.password === null ||req.body.password.trim() == ""){
            throw {
                statusCode: 400,
                message: "Não foi informado a senha.",
                details: "Informações insuficientes para realizar o login "
            }
        }
       userSchema.findOne({email:req.body.email},(erro,user)=>{
            if(!user){
                throw {
                    statusCode: 400,
                    message: "Email/senha incorretos"
                }
            }
            const validpassaword = bcrypt.compareSync(req.body.password,user.password)
            if(!validpassaword){
                throw {
                    statusCode: 400,
                    message: "Email/senha incorretos"
                }
            }
            const token = jwt.sign({id:user._id},SECRET)  
            res.status(200).send({
                message:"Login Autorizado, token gerado:",
                token
            })
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

 const validatePhone = (phone) => {
    const regex = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$'); 
    return regex.test(phone);
}

const validateEmail = (email) => {
    const regex = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/); 
    return regex.test(email);
}





module.exports = {
    createUser,
    login
}