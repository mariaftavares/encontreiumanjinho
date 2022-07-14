const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

const checkAuth = (req, res, next) => {
    const authHeader = req.get('authorization')
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).send("Erro no header")
    }

    try {
        jwt.verify(token, SECRET, (err,userid) => {
            if(err) {
                return res.status(401).send("Não autorizado")
            }
            
            res.locals.id = userid.id;
        });
        
        next();       
          
    } catch(err) {
        console.error(err);
    }
}

module.exports = { checkAuth }