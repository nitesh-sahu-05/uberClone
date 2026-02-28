const blacklistTokenModel = require("../model/blacklistToken.model");
const userModel = require("../model/user.model");
const { createUser } = require("../services/user.service");
const {validationResult} = require("express-validator");


//register user controller
registerUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    console.log(req.body);
    
    const {fullname,email,password} = req.body;

    const hashedPassword = await userModel.hashPassword(password);
    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({
        message: 'user registered successfully',
        data: {
            user,
            token
        }
    });
}


// login user controller
loginUser = async(req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()});
    }

    const {email , password } = req.body
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message: 'invalid email or password'})
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message : "invalid email or password"})
    }

    const token = user.generateAuthToken();
    res.cookie('token', token)
    
    res.status(200).json({token,user});
}


//user profile controller
getUserProfile = async(req,res,next)=>{
    res.status(200).json({user: req.user});
}


// user logout controller
logoutUser = async(req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies?.token || req.headers.authorization.split(" ")[1];
    if(token){
        await blacklistTokenModel.create({token});
    }
    res.status(200).json({message: 'user logged out successfully'})
}


// exports all controller
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
}