const express = require("express");
const router = express.Router();
const { body,query } = require("express-validator");
const { createRide, getFare } = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/create",
  authMiddleware.authUser,
  body("pickup").isString().isLength({ min: 3 }).withMessage("invailid pickup location"),
  body("destination").isString().isLength({ min: 3 }).withMessage("invailid destination address"),
  body("vehicleType").isString().isIn(["auto", "car", "motorcycle"]).withMessage("vehicle type is required"),
  createRide
);

router.get('/get-fare',
  authMiddleware.authUser,
  query('pickup').isString().isLength({min:3}).withMessage("invalid pickup location"),
  query('destination').isString().isLength({min:3}).withMessage("invalid destination"),
  query('vehicleType').optional().isIn(['auto', 'car', 'motorcycle']).withMessage("vehicle type must be auto, car or motorcycle"),
  getFare
)

module.exports = router;