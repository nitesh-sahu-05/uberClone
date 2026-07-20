const express = require("express");
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware");
const { getCoordinates, getDistanceTime, getAutoSuggestions } = require("../controllers/map.controller");
const { query } = require('express-validator')

router.get('/get-coordinate', query('address').isString().isLength({ min: 3 }), authMiddleware.authUser, getCoordinates)
router.get('/get-distance-time', query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser, getDistanceTime)

router.get('/auto-suggestion', query('input').isString().isLength({ min: 3 }), authMiddleware.authUser, getAutoSuggestions)

module.exports = router