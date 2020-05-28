const { sign } = require("../factories/userToken");

module.exports = (next, containsToken) => async (req, res) => {
    try {
        if (containsToken) {
            const { token, user } = await next(req, res);
            return res.json({ data: user, token });
        }
        const data = await next(req, res);
        const token = sign(req.user);

        res.json({ data, token });
    } catch (error) {
        res.json({ error: error.message });
    }
};
