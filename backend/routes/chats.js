const express = require("express");

const router = express.Router();

const {
    getUserChats,
    createOrOpenChat,
    sendMessage,
    unsendMessage
} = require("../controllers/chats");
const auth = require("../middleware/auth");
const validation = require("../middleware/validation");

router.get("/", auth, getUserChats);
router.get("/:addressUserId", auth, createOrOpenChat);
router.post("/:chatId", auth, validation("message"), sendMessage);
router.delete("/:chatId/:messageId", auth, unsendMessage);

module.exports = router;