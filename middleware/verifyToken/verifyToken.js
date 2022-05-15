  const jwt = require("jsonwebtoken");
const User = require("../../models/users/User");

  const verifyToken = (req, res, next) => {
    // const token = authHeader.split(" ")[1];
    const token = req.headers["x-access-token"];
    if(!token){
      return res.status(401).send({message: 'No token provided'});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
      if(err){
        return res.status(401).send({ message: "Unauthorized!" });
      }

      req._id = decoded._id;
      next();
    })
  };
  

  const verifyTokenAdmin = ((req, res, next) =>{
    verifyToken(req, res, () =>{

      if(req.user.isAdmin){
        next()
      }else{
        return res.status(403).json("You are not alowed to do that!");

      }
    })
    // const username = req.body.username
    // console.log(username)
    // User.findOne({username: username},(err,user) => { 
    //     if(err) {
    //         next(err)
    //     }
    //     else if(!user) {
    //         next(new Error("user not found"))
    //     }
    //     else {
    //         if(!user.isAdmin) {
    //             next(new Error("you are not an admin"))
    //         }
    //         else {
    //             next()
    //         }
    //     }                         
    // });
  })
 
  
  module.exports = {
    verifyToken,
    verifyTokenAdmin
  };