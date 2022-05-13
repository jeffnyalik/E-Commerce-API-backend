const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    const authHeader = req.headers.token;
    if(authHeader){
        jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
            if(err){
                res.status(403).send({message: 'Wrong access token'})
            }

            req.user = user;
            next()
        })
    }else{
        res.status(401).send({message: 'You are not authenticated'})
    }
}

module.exports = {
    verifyToken
}