const jwt = require("jsonwebtoken");
const { secret } = require("../config/env.json");

module.exports.sign = (user) =>
    jwt.sign(user, secret, {
        algorithm: "HS256",
    });

module.exports.verify = (token) =>
    jwt.verify(token, secret, { algorithms: "HS256", ignoreExpiration: true });
