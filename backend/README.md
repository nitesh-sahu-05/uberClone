# Users — Register endpoint

POST /users/register

## 🔧 Description
Registers a new user and returns an auth token. Request body must include a `fullname` object (with `firstname`), an `email`, and a `password`.

## 📌 Endpoint
- Method: `POST`
- URL: `/users/register`
- Headers: `Content-Type: application/json`

## 📥 Request body (JSON)
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"        
  },
  "email": "john@example.com",
  "password": "secret123"
}
```

### Field rules
- `fullname.firstname` (string) — **required**, minimum 3 characters
- `fullname.lastname` (string) — optional, minimum 3 characters if provided
- `email` (string) — **required**, must be a valid email
- `password` (string) — **required**, minimum 6 characters (stored hashed)

> Validation is enforced in `routes/user.routes.js` and password hashing is handled by `model/user.model.js`.

## ✅ Success response
- Status: `201 Created`
- Body (example):
```json
{
  "message": "user registered successfully",
  "data": {
    "user": {
      "_id": "<userId>",
      "fullname": { "firstname": "John", "lastname": "Doe" },
      "email": "john@example.com",
      "socketId": null
    },
    "token": "<jwt-token>"
  }
}
```
- Note: the JWT `token` is created with a 1 day expiry (see `user.model.js`). Passwords are hashed before storage.

---

# Maps Endpoints

## 1️⃣ Get Coordinates — Convert address to latitude/longitude

GET /maps/get-coordinate

### 🔧 Description
Converts a given address string into geographic coordinates (latitude and longitude). Supports Google Maps API as primary provider with OpenStreetMap (Nominatim) as fallback.

### 📌 Endpoint
- Method: `GET`
- URL: `/maps/get-coordinate?address=<address>`
- Headers: `Content-Type: application/json`
- Authentication: **Required** (user token)

### 📥 Query Parameters
- `address` (string) — **required**, minimum 3 characters

### ✅ Success response
- Status: `200 OK`
- Body (example):
```json
{
  "ltd": 28.6139,
  "lang": 77.2090
}
```

### ❌ Error response
- Status: `400 Bad Request` (invalid input)
- Status: `404 Not Found` (coordinates not found)
- Body (example):
```json
{
  "message": "coordinate not found",
  "err": {}
}
```

---

## 2️⃣ Get Distance and Time — Calculate route details between two locations

GET /maps/get-distance-time

### 🔧 Description
Calculates the distance and estimated travel time between an origin and destination. Uses Google Maps Distance Matrix API with fallback to Haversine formula for offline calculation.

### 📌 Endpoint
- Method: `GET`
- URL: `/maps/get-distance-time?origin=<origin>&destination=<destination>`
- Headers: `Content-Type: application/json`
- Authentication: **Required** (user token)

### 📥 Query Parameters
- `origin` (string) — **required**, minimum 3 characters
- `destination` (string) — **required**, minimum 3 characters

### ✅ Success response
- Status: `200 OK`
- Body (example):
```json
{
  "distance": "15.3 km",
  "duration": "22 mins",
  "distanceValue": 15300,
  "durationValue": 1320
}
```

### ❌ Error response
- Status: `400 Bad Request` (invalid input)
- Status: `500 Internal Server Error` (calculation failed)
- Body (example):
```json
{
  "message": "Unable to fetch distance and time"
}
```

---

## 3️⃣ Auto Suggestions — Get location suggestions based on input

GET /maps/auto-suggestion

### 🔧 Description
Returns a list of location suggestions as the user types. Uses Google Maps Places Autocomplete API with OpenStreetMap (Nominatim) as fallback. Gracefully degrades to basic suggestions if external services fail.

### 📌 Endpoint
- Method: `GET`
- URL: `/maps/auto-suggestion?input=<input>`
- Headers: `Content-Type: application/json`
- Authentication: **Not Required**

### 📥 Query Parameters
- `input` (string) — **required**, minimum 3 characters

### ✅ Success response
- Status: `200 OK`
- Body (example):
```json
[
  {
    "description": "New Delhi, India",
    "placeId": "ChIJLc6uI0R02jkR3-n2OMI-ZzA",
    "lat": "28.6139",
    "lng": "77.2090"
  },
  {
    "description": "Dwarka, Delhi, India",
    "placeId": "ChIJ0W6cN3p02jkRyeXIiQdNYXQ",
    "lat": "28.5926",
    "lng": "77.0449"
  }
]
```

### ❌ Error response
- Status: `400 Bad Request` (invalid input, less than 3 characters)
- Status: `500 Internal Server Error` (server error, returns fallback suggestions)
- Body (example):
```json
{
  "message": "Unable to fetch location suggestions"
}
```

---

# Rides Endpoints

## 1️⃣ Create Ride — Request a new ride

POST /rides/create

### 🔧 Description
Creates a new ride request with pickup location, destination, and vehicle type. Returns ride details including estimated fare.

### 📌 Endpoint
- Method: `POST`
- URL: `/rides/create`
- Headers: `Content-Type: application/json`
- Authentication: **Required** (user token)

### 📥 Request Body (JSON)
```json
{
  "pickup": "New Delhi, India",
  "destination": "Mumbai, India",
  "vehicleType": "car"
}
```

### Field rules
- `pickup` (string) — **required**, minimum 3 characters
- `destination` (string) — **required**, minimum 3 characters
- `vehicleType` (string) — **required**, must be one of: `"auto"`, `"car"`, `"motorcycle"`

### ✅ Success response
- Status: `201 Created`
- Body (example):
```json
{
  "ride": {
    "_id": "<rideId>",
    "user": "<userId>",
    "pickup": "New Delhi, India",
    "destination": "Mumbai, India",
    "vehicleType": "car",
    "fare": 1500,
    "status": "requested",
    "createdAt": "2026-07-20T10:30:00.000Z"
  }
}
```

### ❌ Error response
- Status: `400 Bad Request` (validation error)
- Status: `500 Internal Server Error` (server error)
- Body (example):
```json
{
  "errors": [
    {
      "msg": "invailid pickup location",
      "param": "pickup"
    }
  ]
}
```

---

## 2️⃣ Get Fare — Calculate ride fare between two locations

GET /rides/get-fare

### 🔧 Description
Calculates the estimated fare for a ride between pickup and destination based on distance and vehicle type.

### 📌 Endpoint
- Method: `GET`
- URL: `/rides/get-fare?pickup=<pickup>&destination=<destination>&vehicleType=<vehicleType>`
- Headers: `Content-Type: application/json`
- Authentication: **Required** (user token)

### 📥 Query Parameters
- `pickup` (string) — **required**, minimum 3 characters
- `destination` (string) — **required**, minimum 3 characters
- `vehicleType` (string) — optional, one of: `"auto"`, `"car"`, `"motorcycle"`

### ✅ Success response
- Status: `200 OK`
- Body (example):
```json
{
  "fare": 450
}
```

### ❌ Error response
- Status: `400 Bad Request` (invalid input)
- Status: `500 Internal Server Error` (fare calculation failed)
- Body (example):
```json
{
  "message": "Unable to calculate fare"
}
```

---

## 📝 Environment Variables
Ensure these are set in your `.env` file:
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Secret key for JWT tokens
- `GOOGLE_MAPS_API_KEY` — (Optional) Google Maps API key for primary geocoding and distance services
- `PORT` — Server port (default: 3000)

---

## 🔐 Authentication
- User endpoints require a valid JWT token in cookies or `Authorization` header (`Bearer <token>`)
- Maps `/auto-suggestion` endpoint is **public** (no authentication required)
- Other maps and rides endpoints require **user authentication**



## ❗ Error responses
- `400 Bad Request` — validation failed. Response shape from `express-validator`:
```json
{ "errors": [ { "msg": "invalid email", "param": "email", "location": "body" } ] }
```
- `500 Internal Server Error` — database or unexpected errors (e.g. duplicate email constraint).

## Example (curl)
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {"firstname":"John","lastname":"Doe"},
    "email":"john@example.com",
    "password":"secret123"
  }'
```

---

### 💡 Tip
Ensure `process.env.JWT_SECRET` is set before calling this endpoint (used to sign the returned token).

## Example response
```json
{
    "message": "user registered successfully",
    "data": {
        "user": {
            "_id": "507f1f77bcf86cd799439011",
            "fullname": { "firstname": "John", "lastname": "Doe" },
            "email": "john@example.com",
            "socketId": null
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

---

# Users — Login endpoint

POST /users/login

## 🔧 Description
Authenticates an existing user and returns a JWT token. The request body must include an `email` and `password`.

## 📌 Endpoint
- Method: `POST`
- URL: `/users/login`
- Headers: `Content-Type: application/json`

## 📥 Request body (JSON)
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

### Field rules
- `email` (string) — **required**, must be a valid email
- `password` (string) — **required**, minimum 6 characters

> Validation is enforced in `routes/user.routes.js` and password comparison occurs in `model/user.model.js`.

## ✅ Success response
- Status: `200 OK`
- Body (example):
```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<userId>",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "socketId": null
  }
}
```
- Token is signed using the same secret and expires in 1 day.

## ❗ Error responses
- `400 Bad Request` — validation failed. Shape from `express-validator`.
- `401 Unauthorized` — invalid email or password.
- `500 Internal Server Error` — database or unexpected errors.

## Example (curl)
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "password":"secret123"
  }'
```

> **Note:** The same JWT secret (`process.env.JWT_SECRET`) is required to sign the token.

---

# Users — Profile endpoint

GET /users/profile

## 🔧 Description
Returns the authenticated user's profile data. Requires a valid JWT token provided either as a `token` cookie or in the `Authorization` header.

## 📌 Endpoint
- Method: `GET`
- URL: `/users/profile`
- Headers: `Authorization: Bearer <token>` (or send the token as an HTTP-only cookie named `token`)

## ✅ Success response
- Status: `200 OK`
- Body (example):
```json
{
  "user": {
    "_id": "<userId>",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "socketId": null
  }
}
```

## ❗ Error responses
- `401 Unauthorized` — missing or invalid token.
- `500 Internal Server Error` — unexpected errors.

## Example (curl)
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <token>"
```

---
# Users — Logout endpoint

GET /users/logout

## 🔧 Description
Logs the current user out by clearing the auth cookie and blacklisting the token (stored for 24h). Requires authentication.

## 📌 Endpoint
- Method: `GET`
- URL: `/users/logout`
- Headers: `Authorization: Bearer <token>` (or cookie)

## ✅ Success response
- Status: `200 OK`
- Body:
```json
{ "message": "user logged out successfully" }
```

## ❗ Error responses
- `401 Unauthorized` — missing or invalid token.
- `500 Internal Server Error` — unexpected errors.

## Example (curl)
```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer <token>"
```

---

# Captains — Register endpoint

POST /captains/register

## 🔧 Description

Allows a new captain to create an account. Request body must include a `fullname` object, an `email`, `password` and `vehicle` details.

## 📌 Endpoint

- Method: `POST`
- URL: `/captains/register`
- Headers: `Content-Type: application/json`

## 📥 Request body (JSON)

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"        
  },
  "email": "jane@example.com",
  "password": "secret123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Field rules

- `fullname.firstname` (string) — **required**, minimum 3 characters
- `fullname.lastname` (string) — **required**, minimum 3 characters
- `email` (string) — **required**, must be a valid email
- `password` (string) — **required**, minimum 6 characters (stored hashed)
- `vehicle.color` (string) — **required**, minimum 3 characters
- `vehicle.plate` (string) — **required**, minimum 6 characters
- `vehicle.capacity` (number) — **required**, must be a number ≥1
- `vehicle.vehicleType` (string) — **required**, one of `car`, `motorcycle`, `auto`

> Validation is enforced in `routes/captain.routes.js` and password hashing is handled by `model/captain.model.js`.

## ✅ Success response

- Status: `201 Created`
- Body (example):
```json
{
  "captain": {
    "_id": "<captainId>",
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane@example.com",
    "socketId": null,
    "status": "inactive",
    "vehicle": {"color":"red","plate":"ABC123","capacity":4,"vehicleType":"car"},
    "location": {"lat":null,"lng":null}
  },
  "token": "<jwt-token>"
}
```

- A JWT token valid for 24 hours is returned; the captain model defines `generateAuthToken()`.

## ❗ Error responses

- `400 Bad Request` — validation failed (see `express-validator` format).
- `400 Bad Request` — captain already exists (duplicate email).
- `500 Internal Server Error` — database or unexpected errors.

## Example (curl)
```bash
curl -X POST http://localhost:3000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname":{"firstname":"Jane","lastname":"Smith"},
    "email":"jane@example.com",
    "password":"secret123",
    "vehicle":{"color":"red","plate":"ABC123","capacity":4,"vehicleType":"car"}
  }'
```

> **Note:** `process.env.JWT_SECRET` must be set before calling this endpoint, as the token is signed using it.

---
# Captains — Login endpoint

POST /captains/login

## 🔧 Description
Authenticates an existing captain and returns a JWT token. The request body must include an `email` and `password`.

## 📌 Endpoint
- Method: `POST`
- URL: `/captains/login`
- Headers: `Content-Type: application/json`

## 📥 Request body (JSON)
```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

### Field rules
- `email` (string) — **required**, must be a valid email
- `password` (string) — **required**, minimum 6 characters

> Validation is enforced in `routes/captain.routes.js` and password comparison occurs in `model/captain.model.js`.

## ✅ Success response
- Status: `200 OK`
- Body (example):
```json
{
  "token": "<jwt-token>",
  "captain": {
    "_id": "<captainId>",
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane@example.com",
    "socketId": null,
    "status": "inactive",
    "vehicle": {"color":"red","plate":"ABC123","capacity":4,"vehicleType":"car"},
    "location": {"lat":null,"lng":null}
  }
}
```

## ❗ Error responses
- `400 Bad Request` — validation failed.
- `401 Unauthorized` — invalid email or password.
- `500 Internal Server Error` — database or unexpected errors.

## Example (curl)
```bash
curl -X POST http://localhost:3000/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"jane@example.com",
    "password":"secret123"
  }'
```

---

# Captains — Profile endpoint

GET /captains/profile

## 🔧 Description
Returns the authenticated captain's profile data. Requires a valid JWT token provided either as a `token` cookie or in the `Authorization` header.

## 📌 Endpoint
- Method: `GET`
- URL: `/captains/profile`
- Headers: `Authorization: Bearer <token>` (or send the token as an HTTP-only cookie named `token`)

## ✅ Success response
- Status: `200 OK`
- Body (example):
```json
{
  "captain": {
    "_id": "<captainId>",
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane@example.com",
    "socketId": null,
    "status": "inactive",
    "vehicle": {"color":"red","plate":"ABC123","capacity":4,"vehicleType":"car"},
    "location": {"lat":null,"lng":null}
  }
}
```

## ❗ Error responses
- `401 Unauthorized` — missing or invalid token.
- `500 Internal Server Error` — unexpected errors.

## Example (curl)
```bash
curl -X GET http://localhost:3000/captains/profile \
  -H "Authorization: Bearer <token>"
```

---

# Captains — Logout endpoint

GET /captains/logout

## 🔧 Description
Logs the current captain out by clearing the auth cookie and blacklisting the token (stored for 24h). Requires authentication.

## 📌 Endpoint
- Method: `GET`
- URL: `/captains/logout`
- Headers: `Authorization: Bearer <token>` (or cookie)

## ✅ Success response
- Status: `200 OK`
- Body:
```json
{ "message": "captain logged out successfully" }
```

## ❗ Error responses
- `401 Unauthorized` — missing or invalid token.
- `500 Internal Server Error` — unexpected errors.

## Example (curl)
```bash
curl -X GET http://localhost:3000/captains/logout \
  -H "Authorization: Bearer <token>"
```

---