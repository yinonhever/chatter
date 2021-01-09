const express = require("express");

const router = express.Router();

const {
    signup,
    login,
    getUsers,
    getUserDetails,
    updateUserDetails
} = require("../controllers/users");
const auth = require("../middleware/auth");
const validation = require("../middleware/validation");

router.get("/", auth, getUsers);
router.post("/", validation({ password: true }), signup);
router.post("/login", login);
router.get("/:userId", getUserDetails);
router.put("/:userId", auth, validation(), updateUserDetails);

module.exports = router;