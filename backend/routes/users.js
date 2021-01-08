const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const {
    signup,
    login,
    getUsers,
    getUserDetails,
    updateUserDetails
} = require("../controllers/users");

router.get("/", auth, getUsers);
router.post("/", signup);
router.post("/login", login);
router.get("/:userId", getUserDetails);
router.put("/:userId", auth, updateUserDetails);

module.exports = router;