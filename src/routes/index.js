const express = require("express");
const route = express.Router();

require("./user")(route);

module.exports = (app) => app.use("/", route);
