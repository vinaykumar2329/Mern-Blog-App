const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");


exports.registerController = async(req,res) =>{
    try{
        const {username,email,password} = req.body;
        // validation
        if(!username || !email || !password){
            return res.status(400).send({
                success:false,
                message:"plz fill all the fields"
            })
        }
        
        // existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(401).send({
                success:false,
                message:"user already exist"
            })
        }

        // hash password
        const hashedpassword = await bcrypt.hash(password,10);
        // creating user
        const user = new userModel({username,email,password:hashedpassword})
        await user.save();
        return res.status(201).send({
            success:true,
            message:"new user created",
            user,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error in registering user",
            error
        })
    }
},


exports.getAllUser = async(req,res) =>{
    const user = await userModel.find()
    return res.status(201).send({
        users: user.length,
        success:true,
        message:"all users",
        user
    })
},

exports.loginController = async(req,res) =>{
    try{
        const{email,password} = req.body
        // validation
        if(!email || !password){
            return res.status(400).send({
                success:false,
                message:"plz fill all the fields"
            })
        }
        
        // existing user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                success:false,
                message:"user not registered"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:"invalid credentials"
            })
        }
        return res.status(200).send({
            success:true,
            message:"login successfully",
            user
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }

}
