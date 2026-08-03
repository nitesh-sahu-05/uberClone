const { validationResult } = require("express-validator");
const { createRide, getFare } = require("../services/ride.service");

module.exports.createRide = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {userId , pickup , destination , vehicleType} = req.body
    try {
        const ride = await createRide({user:req.user._id,pickup,destination,vehicleType})
        
        return res.status(201).json(ride)
    } catch (err) {
        console.error('Ride creation error:', err.message);
        return res.status(500).json({message:err.message});
    }
}


module.exports.getFare = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {pickup, destination, vehicleType} = req.query

    try {
        const fare = await getFare(pickup, destination, vehicleType)
        res.status(200).json(fare)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}