const jwt = require("jsonwebtoken");
const { DEFAULT_ERROR_MESSAGE } = require("../util");

module.exports = (req, res, next) => {
    try {
        const token = req.get("Authorization");
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json({ message: "Not authorized" });
        }
        req.userId = decodedToken.userId;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: DEFAULT_ERROR_MESSAGE });
    }
}