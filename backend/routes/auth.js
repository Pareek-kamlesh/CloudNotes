const express = require('express') 
const User = require('../models/Users')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
var fetchUser = require("../middleware/fetchUser")
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
        res.status(500).send("Internal server error");
    }
     
    
})

router.post('/login',[
    body('email').isEmail(), 
    body('password').exists()],
    async    (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please enter correct credentials"})
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please enter correct credentials"})
        }

        const data ={
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        
    
        res.json(authToken)
    } catch (error) {
        console.error(message.error)
        res.status(500).send("Internal server error");
    }
})

router.post('/getUser', fetchUser,
    async    (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        userId=req.user.id
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(message.error)
        res.status(500).send("Internal server error");
    }
})
module.exports=router