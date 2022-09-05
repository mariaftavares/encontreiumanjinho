const userSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET= process.env.SECRET


const createUser = async (req,res)=>{ 
    const {email,name,password,phone} = req.body
    const fields = [email,name,password,phone]
    try {
         if(validateField(fields)){
            throw {
                statusCode: 400,
                message: "Por favor informar todos campos obrigatorios name,email,password,phone",
                details: "Informações insuficientes para a criação de um usuário  "
            }
        }
        if(!validatePhone(phone)){
            throw {
                statusCode: 400,
                message: "Numero de telefone informado inválido",
                details: "Informações insuficientes para a criação de um usuário  "
            }

        }
        if(!validateEmail(email)){
            throw {
                statusCode: 400,
                message: "Email informado inválido",
                details: "Informações insuficientes para a criação de um usuário  "
            }

        }
        const emailExist = await  userSchema.exists({email:email})
        if(emailExist){
            throw {
                statusCode: 409,
                message: "Email já cadastrado no sistema",
                details: "Usuário já cadastrado"
            }
        }
        const hashedpassaword = bcrypt.hashSync(password, 10);
        const newUser = new userSchema({
            name:name,
            email:email,
            password:hashedpassaword,
            phone:phone
        })
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
        const {email,password} = req.body
        const fields = [email,password]
        if(validateField(fields)){
            throw {
                statusCode: 400,
                message: "Por favor informar todos campos obrigatorios: email,password",
                details: "Informações insuficientes para realizar o login "
            }
        }
       userSchema.findOne({email:email},(erro,user)=>{
            if(!user){
                return res.status(400).send({
                    statusCode: 400,
                    message: "Email/senha incorretos"
                })
            }
            const validpassaword = bcrypt.compareSync(password,user.password)
            if(!validpassaword){
               return res.status(400).send({
                    statusCode: 400,
                    message: "Email/senha incorretos"
                })
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

const validateField = (fields)=>{
    const validation = fields.some(field => !field || field.trim() == "")
    return validation;
}





module.exports = {
    createUser,
    login
}