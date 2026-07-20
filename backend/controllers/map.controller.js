const { validationResult } = require("express-validator");
const mapsService = require( "../services/maps.service");

module.exports.getCoordinates = async (req,res) => {

    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({errors:error.array()})
    }


    const {address} = req.query;
    try {
        const coordinate = await mapsService.getAddressCoordinate(address)
        res.status(200).json(coordinate)
    } catch (err) {
        res.status(404).json({message:"coordinate not found",err})
    }
}


module.exports.getDistanceTime = async (req,res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const {origin , destination} = req.query
        const distanceTime = await mapsService.getDistanceTime(origin,destination)
        res.status(200).json(distanceTime)
    } catch (err) {
        res.status(500).json({message:'internal server error'})
    }
}

module.exports.getAutoSuggestions = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;
        const suggestions = await mapsService.getAutoSuggestion(input);
        res.status(200).json(suggestions);
    } catch (err) {
        res.status(500).json({ message: "Unable to fetch location suggestions" });
    }
};

module.exports.getAutoCompletionSuggetion = async (req,res) => {
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }
        const {input} = req.query
        const suggetions = await mapsService.getAutoSuggestion(input)
        res.status(200).json(suggetions)
    } catch (err) {
        res.status(500).json({message:'internal server error'})
    }
}