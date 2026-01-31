const express = require("express");
const rateLimiter = require("../middlewares/rateLimiter.middleware");
const { addVehicle } = require("../controllers/vehicle.controller");

const router = express.Router();
router.post("/add", rateLimiter, addVehicle);

module.exports = router;
