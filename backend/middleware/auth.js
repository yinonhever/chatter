const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.get("Authorization");
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        const decodedToken = jwt.verify(token, "vengrillyinbbq");
        if (!decodedToken) {
            return res.status(401).json({ message: "Not authorized" });
        }
        req.user = { id: decodedToken.userId };
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occured. Please try again in a moment." });
    }
}