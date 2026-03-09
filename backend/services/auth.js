require('dotenv').config()
const jwt = require('jsonwebtoken')

//sign JWT Token
const setJWT=(user)=>{
    return jwt.sign(
            { 
                userId: user._id,
                role: user.role
             },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' }
        );
}

//verify JWT Token
const checkJWT=(token)=>{
    try {
        return jwt.verify(token,process.env.JWT_SECRET_KEY)
    } catch (error){
        return null
    }
}

module.exports={setJWT,checkJWT}