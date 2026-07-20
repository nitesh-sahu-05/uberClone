const axios = require("axios");

const buildCoordinateResponse = (lat, lng) => ({
    ltd: lat,
    lang: lng,
});

module.exports.getAddressCoordinate = async (address) => {
    if (!address || typeof address !== "string" || !address.trim()) {
        throw new Error("Address is required");
    }

    const trimmedAddress = address.trim();
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    try {
        if (apiKey) {
            const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
                params: {
                    address: trimmedAddress,
                    key: apiKey,
                },
                timeout: 10000,
            });

            if (response.data.status === "OK" && response.data.results?.length) {
                const { lat, lng } = response.data.results[0].geometry.location;
                return buildCoordinateResponse(lat, lng);
            }
        }

        const fallbackResponse = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                format: "jsonv2",
                q: trimmedAddress,
                limit: 1,
            },
            headers: {
                "User-Agent": "uberClone/1.0",
            },
            timeout: 10000,
        });

        const firstMatch = fallbackResponse.data?.[0];
        if (!firstMatch) {
            throw new Error("No coordinates found for the provided location");
        }

        return buildCoordinateResponse(parseFloat(firstMatch.lat), parseFloat(firstMatch.lon));
    } catch (error) {
        if (error.response?.data?.error_message) {
            throw new Error(error.response.data.error_message);
        }

        if (error.message) {
            throw error;
        }

        throw new Error("Unable to fetch coordinates for the provided location");
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("origin and destination are required");
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    try {
        if (apiKey) {
            const response = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
                params: {
                    origins: origin,
                    destinations: destination,
                    key: apiKey,
                },
                timeout: 10000,
            });

            if (response.data.status === "OK") {
                const element = response.data.rows?.[0]?.elements?.[0];
                if (element?.status === "OK") {
                    return {
                        distance: element.distance?.text || null,
                        duration: element.duration?.text || null,
                        distanceValue: element.distance?.value || null,
                        durationValue: element.duration?.value || null,
                    };
                }
            }
        }

        const [originCoords, destinationCoords] = await Promise.all([
            module.exports.getAddressCoordinate(origin),
            module.exports.getAddressCoordinate(destination),
        ]);

        const earthRadiusKm = 6371;
        const lat1 = originCoords.ltd * (Math.PI / 180);
        const lat2 = destinationCoords.ltd * (Math.PI / 180);
        const deltaLat = (destinationCoords.ltd - originCoords.ltd) * (Math.PI / 180);
        const deltaLng = (destinationCoords.lang - originCoords.lang) * (Math.PI / 180);

        const a =
            Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceKm = earthRadiusKm * c;
        const durationMinutes = Math.max(10, Math.round(distanceKm * 2));

        return {
            distance: `${distanceKm.toFixed(1)} km`,
            duration: `${durationMinutes} mins`,
            distanceValue: Math.round(distanceKm * 1000),
            durationValue: durationMinutes * 60,
        };
    } catch (error) {
        if (error.response?.data?.error_message) {
            throw new Error(error.response.data.error_message);
        }

        if (error.message) {
            throw error;
        }

        throw new Error("Unable to fetch distance and time");
    }
};

module.exports.getAutoSuggestion = async (input) => {
    if (!input || typeof input !== "string" || !input.trim()) {
        throw new Error("query is required");
    }

    const query = input.trim();
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    try {
        if (apiKey) {
            const response = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
                params: {
                    input: query,
                    key: apiKey,
                    types: "geocode",
                },
                timeout: 10000,
            });

            if (response.data.status === "OK") {
                return response.data.predictions.map((prediction) => ({
                    description: prediction.description,
                    placeId: prediction.place_id,
                }));
            }
        }

        const fallbackResponse = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                format: "jsonv2",
                q: query,
                limit: 5,
                addressdetails: 1,
            },
            headers: {
                "User-Agent": "uberClone/1.0",
            },
            timeout: 10000,
        });

        return fallbackResponse.data.map((item) => ({
            description: item.display_name,
            placeId: item.place_id?.toString() || `${item.lat}-${item.lon}`,
            lat: item.lat,
            lng: item.lon,
        }));
    } catch (error) {
        if (error.response?.data?.error_message) {
            throw new Error(error.response.data.error_message);
        }

        if (error.message) {
            throw error;
        }

        throw new Error("Unable to fetch location suggestions");
    }
};

module.exports.getAutoSuggetion = module.exports.getAutoSuggestion;