const captainModel = require("../model/captain.model");
const captainService = require("../services/captain.service");
const {validationResult} = require("express-validator");

// register captain controller
registerCaptain = async(req,res,next)=>{
    const {fullname,email,password,vehicle} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const isCaptainExist = await captainModel.findOne({email});
    if(isCaptainExist){
        return res.status(400).json({message: 'captain already exists'});
    }

    const hashedPassword = await captainModel.hashPassword(password);

    try {
        const captain = await captainService.createCaptain({
            fullname :{
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            email,
            password: hashedPassword,
            vehicle: { 
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType
            }
        });

        const token = captain.generateAuthToken();
        res.cookie|('token', token);

        res.status(201).json({ captain, token });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    registerCaptain
};