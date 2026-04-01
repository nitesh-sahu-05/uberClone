const blacklistTokenModel = require("../model/blacklistToken.model");
const captainModel = require("../model/captain.model");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

//user authentication middleware
authUser = async(req,res,next)=>{
    // pull token either from cookie or authorization header (Bearer)
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: 'unauthorized'})
    }

    const isBlacklisted = await blacklistTokenModel.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message: 'token is blacklisted'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if(!user){
            return res.status(401).json({message: 'Unauthorized'})
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized',error})
    }
}


// captain authentication middleware
authCaptain = async(req,res,next)=>{
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: 'unauthorized'})
    }
    
    const isBlacklisted = await blacklistTokenModel.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message: 'token is blacklisted'})
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if(!captain){
            return res.status(401).json({message: 'Unauthorized'})
        }
        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized',error})
    }
}


//exports all middleware
module.exports = {
    authUser,
    authCaptain
}