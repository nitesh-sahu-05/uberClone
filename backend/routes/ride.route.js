const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { createRide } = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/create",
  authMiddleware.authUser,
  body("pickup").isString().isLength({ min: 3 }).withMessage("invailid pickup location"),
  body("destination").isString().isLength({ min: 3 }).withMessage("invailid destination address"),
  body("vehicleType").isString().isIn(["auto", "car", "motorcycle"]).withMessage("vehicle type is required"),
  createRide
);

module.exports = router;