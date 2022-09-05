const welcomeMessage = async (req,res)=>{
    try {
        res.status(200).json({title: "Encontrei um Anjinho API",message:"Seja Bem-Vindo a API do Encontrei um Anjinho!"})
    } catch (error) {
        res.status(500).send(message.error)
    }
} 



module.exports = {
    welcomeMessage
}