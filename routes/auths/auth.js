const express = require("express");
const User = require('../../models/users/User')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//REGISTER USER
router.post('/register', async (req, res) =>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 6)
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).send(savedUser)
        console.log(savedUser);
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
});

//LOGIN
router.post('/login', (req, res) =>{
    User.findOne({email: req.body.email}).then((user) =>{
        if(!user){
            res.status(400).send({message: 'user does not exist'});
        }
        let passwordValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordValid){
            return res.status(400).send({message: 'invalid password'})
        }

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },
        process.env.JWT_SECRET,
        {expiresIn: 86400}
        )

        res.status(200).send({
            'username': user.username,
            'email': user.email,
            'accessToken': accessToken
        });
    })
});




module.exports = router;