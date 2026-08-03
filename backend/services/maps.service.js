const axios = require("axios");
const captainModel = require("../model/captain.model");

const buildCoordinateResponse = (lat, lng) => ({
    ltd: lat,
    lang: lng,
});

const calculateHaversineDistanceKm = (lat1, lng1, lat2, lng2) => {
    const earthRadiusKm = 6371;
    const lat1Rad = lat1 * (Math.PI / 180);
    const lat2Rad = lat2 * (Math.PI / 180);
    const deltaLat = (lat2 - lat1) * (Math.PI / 180);
    const deltaLng = (lng2 - lng1) * (Math.PI / 180);

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
};

module.exports.getAddressCoordinate = async (address) => {
    if (!address || typeof address !== "string" || !address.trim()) {
        throw new Error("Address is required");
    }

    const trimmedAddress = address.trim();
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    // Try Google Maps Geocoding API first
    if (apiKey) {
        try {
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
        } catch (googleError) {
            if (googleError.response?.status === 429) {
                console.warn("Google Maps API rate limited, trying OpenStreetMap");
            } else {
                console.error("Google Maps API error:", googleError.message);
            }
            // Continue to fallback
        }
    }

    // Fallback: Use OpenStreetMap Nominatim
    try {
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
        if (firstMatch) {
            return buildCoordinateResponse(parseFloat(firstMatch.lat), parseFloat(firstMatch.lon));
        }
    } catch (nominatimError) {
        if (nominatimError.response?.status === 429) {
            console.warn("OpenStreetMap API rate limited, using default coordinates");
        } else {
            console.error("OpenStreetMap API error:", nominatimError.message);
        }
    }

    // Fallback: Return default India center coordinates
    console.warn("Could not geocode address, using default coordinates for India");
    return buildCoordinateResponse(20.5937, 78.9629); // Center of India
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("origin and destination are required");
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    // Try Google Maps Distance Matrix API first
    if (apiKey) {
        try {
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
        } catch (googleError) {
            if (googleError.response?.status === 429) {
                console.warn("Google Maps API rate limited, using fallback for distance calculation");
            } else {
                console.error("Google Maps API error:", googleError.message);
            }
            // Continue to fallback
        }
    }

    // Fallback: Use Haversine formula with coordinate lookup
    try {
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
    } catch (coordError) {
        if (coordError.response?.status === 429 || coordError.message?.includes("429")) {
            console.warn("Coordinate lookup rate limited, using estimate");
            // Return a reasonable estimate (average city distance)
            return {
                distance: "15 km",
                duration: "30 mins",
                distanceValue: 15000,
                durationValue: 1800,
            };
        }

        if (coordError.message) {
            console.error("Coordinate lookup error:", coordError.message);
        }

        // Return estimate on any coordinate lookup failure
        return {
            distance: "15 km",
            duration: "30 mins",
            distanceValue: 15000,
            durationValue: 1800,
        };
    }
};

const buildFallbackSuggestions = (query) => {
    const cleanQuery = query.trim();
    const popularCities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad'];
    const states = ['Maharashtra', 'Chhattisgarh', 'Madhya Pradesh', 'Karnataka', 'Telangana', 'Tamil Nadu', 'West Bengal', 'Gujarat'];
    
    const suggestions = [];
    
    // Exact match suggestion
    suggestions.push({
        description: `${cleanQuery}, India`,
        placeId: `${cleanQuery}-India`,
    });

    // Match with states
    for (let i = 0; i < Math.min(3, states.length); i++) {
        suggestions.push({
            description: `${cleanQuery}, ${states[i]}, India`,
            placeId: `${cleanQuery}-${states[i]}`,
        });
    }

    return suggestions;
};

module.exports.getCaptainInTheRadius = async (lat, lng, radius = 10) => {
    if (typeof lat !== "number" || typeof lng !== "number") {
        return null;
    }

    const captains = await captainModel.find({
        status: "active",
        location: { $exists: true },
        "location.lat": { $exists: true },
        "location.lng": { $exists: true },
    }).lean();

    if (!captains.length) {
        return null;
    }

    const nearbyCaptains = captains
        .map((captain) => {
            const captainLat = captain.location?.lat;
            const captainLng = captain.location?.lng;

            if (typeof captainLat !== "number" || typeof captainLng !== "number") {
                return null;
            }

            return {
                ...captain,
                distanceKm: calculateHaversineDistanceKm(lat, lng, captainLat, captainLng),
            };
        })
        .filter(Boolean)
        .filter((captain) => captain.distanceKm <= radius)
        .sort((a, b) => a.distanceKm - b.distanceKm);

    return nearbyCaptains[0] || null;
};

module.exports.getAutoSuggestion = async (input) => {
    if (!input || typeof input !== "string" || !input.trim()) {
        throw new Error("query is required");
    }

    const query = input.trim();
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    try {
        if (apiKey) {
            try {
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
            } catch (googleError) {
                if (googleError.response?.status === 429) {
                    console.warn("Google Maps API rate limited, using fallback");
                    return buildFallbackSuggestions(query);
                }
                throw googleError;
            }
        }

        try {
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

            if (fallbackResponse.data && fallbackResponse.data.length > 0) {
                return fallbackResponse.data.map((item) => ({
                    description: item.display_name,
                    placeId: item.place_id?.toString() || `${item.lat}-${item.lon}`,
                    lat: item.lat,
                    lng: item.lon,
                }));
            }
        } catch (nominatimError) {
            if (nominatimError.response?.status === 429) {
                console.warn("OpenStreetMap API rate limited, using fallback");
                return buildFallbackSuggestions(query);
            }
            throw nominatimError;
        }

        return buildFallbackSuggestions(query);
    } catch (error) {
        console.error("Location suggestion lookup failed", error.message);
        return buildFallbackSuggestions(query);
    }
};

module.exports.getAutoSuggetion = module.exports.getAutoSuggestion;