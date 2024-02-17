const express = require('express') 
const User = require('../models/Users')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken')


const JWT_SECRET = "thisiscool";
router.post('/createUser',[body('name').isLength({min:3}), body('email').isEmail(), body('password').isLength({min:3})] ,
    async    (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try{
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error: "User with this email already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass =await bcrypt.hash(req.body.password, salt);

    user = await User.create(
        {
            name: req.body.name,
            password: secPass,
            email: req.body.email
        }
    )
    const data ={
        user:{
            id:user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    

    res.json(authToken)
    }catch(error){
        console.error(message.error)
    }
     
    
})

module.exports=router