const captainModel = require("../model/captain.model");


module.exports.createCaptain = async({fullname, email, password, vehicle}) => {
    // require nested properties
    if (
        !fullname ||
        !fullname.firstname ||
        !fullname.lastname ||
        !email ||
        !password ||
        !vehicle ||
        !vehicle.color ||
        !vehicle.plate ||
        !vehicle.capacity ||
        !vehicle.vehicleType
    ) {
        throw new Error('all fields are required');
    }

    const captain = captainModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
        },
        email: email,
        password: password,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        },
    });
    return captain;
};