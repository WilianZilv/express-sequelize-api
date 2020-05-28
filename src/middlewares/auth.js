const assert = require("assert");
const { verify } = require("../factories/userToken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        assert(authHeader, "No Token Provided");
        const [scheme, token] = authHeader.split(" ");
        assert(scheme === "Bearer", "Token Malformed");

        data = verify(token);
        assert(data, "Invalid Token");
        req.user = data;

        next();
    } catch (error) {
        res.json({ error: error.message });
    }
};
