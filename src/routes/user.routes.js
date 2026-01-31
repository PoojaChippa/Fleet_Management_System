const express = require("express");
const { createUser, getUserById } = require("../controllers/user.controller");

const router = express.Router();
router.post("/create", createUser);
router.get("/:id", getUserById);

module.exports = router;
