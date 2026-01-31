const express = require("express");
const { createTrip, endTrip } = require("../controllers/trip.controller");

const router = express.Router();
router.post("/create", createTrip);
router.patch("/end:tripId", endTrip);

module.exports = router;
