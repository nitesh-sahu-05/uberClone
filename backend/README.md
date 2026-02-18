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