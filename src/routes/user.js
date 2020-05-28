const express = require("express");
const route = express.Router();
const userController = require("../controllers/user");
const handle = require("../middlewares/globalHandler");
const auth = require("../middlewares/auth");

route.post("/", handle(userController.sign_in, true));
route.put("/", handle(userController.sign_up, true));

module.exports = (app) => app.use("/user", route);
