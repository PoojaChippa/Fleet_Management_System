const express = require("express");

const logger = require("./middlewares/logger.middleware");
const app = express();
app.use(express.json);
app.use(logger);
module.exports = app;
