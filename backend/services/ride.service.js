const crypto = require("crypto");
const rideModel = require("../model/ride.model");
const { getAddressCoordinate, getDistanceTime, getCaptainInTheRadius } = require("./maps.service");

const fareRates = {
    auto: { baseFare: 30, perKm: 12 },
    car: { baseFare: 50, perKm: 15 },
    motorcycle: { baseFare: 20, perKm: 8 },
};

module.exports.getFare = async function getFare(pickup, destination, vehicleType = "auto") {
    if (!pickup || !destination) {
        throw new Error("pickup and destination are required");
    }

    const normalizedVehicleType = String(vehicleType || "auto").toLowerCase();
    const rate = fareRates[normalizedVehicleType];

    if (!rate) {
        throw new Error("vehicle type must be auto, car or motorcycle");
    }

    const distanceTime = await getDistanceTime(pickup, destination);
    const distanceInKm = (() => {
        if (typeof distanceTime?.distanceValue === "number") {
            return distanceTime.distanceValue / 1000;
        }

        const match = String(distanceTime?.distance || "").match(/(\d+(?:\.\d+)?)/);
        return match ? parseFloat(match[1]) : 0;
    })();

    const fare = rate.baseFare + Math.round(distanceInKm * rate.perKm);

    return {
        vehicleType: normalizedVehicleType,
        fare,
        distance: distanceTime?.distance || null,
        duration: distanceTime?.duration || null,
        distanceInKm: Number(distanceInKm.toFixed(2)),
    };
};

module.exports.genOTP = async (num) => {
    const digits = Number(num);

    if (!Number.isInteger(digits) || digits <= 0) {
        throw new Error("num must be a positive integer");
    }

    const min = 10 ** (digits - 1);
    const max = 10 ** digits;
    const otp = crypto.randomInt(min, max);

    return String(otp);
}

module.exports.createRide = async function createRide({ user, pickup, destination, vehicleType }) {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const normalizedVehicleType = String(vehicleType || 'auto').toLowerCase();
    const fareDetails = await module.exports.getFare(pickup, destination, normalizedVehicleType);
    const otp = await module.exports.genOTP(6);

    const pickupCoordinates = await getAddressCoordinate(pickup);
    const nearestCaptain = await getCaptainInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lang, 10);
    const matchingCaptain = nearestCaptain && nearestCaptain.vehicle?.vehicleType === normalizedVehicleType
        ? nearestCaptain
        : null;

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp,
        fare: fareDetails.fare,
        captain: matchingCaptain?._id || undefined,
    });

    return {
        ...ride.toObject(),
        otp,
        nearestCaptain: matchingCaptain
            ? {
                _id: matchingCaptain._id,
                fullname: matchingCaptain.fullname,
                vehicle: matchingCaptain.vehicle,
                location: matchingCaptain.location,
                distanceKm: Number(matchingCaptain.distanceKm?.toFixed(2)),
            }
            : null,
    };
};

