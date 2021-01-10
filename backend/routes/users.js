const express = require("express");

const router = express.Router();

const {
    signup,
    login,
    getUsers,
    getUserDetails,
    updateUserDetails,
    insertUsers
} = require("../controllers/users");
const auth = require("../middleware/auth");
const validation = require("../middleware/validation");

router.get("/", getUsers);
router.post("/", validation("name email password"), signup);
router.post("/login", login);
router.get("/:userId", getUserDetails);
router.put("/:userId", auth, validation("name email birthday"), updateUserDetails);
router.post("/insert", insertUsers)

module.exports = router;