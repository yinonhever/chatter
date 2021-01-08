const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const {
    getUserChats,
    createOrOpenChat,
    sendMessage,
    unsendMessage
} = require("../controllers/chats");

router.get("/", auth, getUserChats);
router.get("/:addressUserId", auth, createOrOpenChat);
router.post("/:chatId", auth, sendMessage);
router.delete("/:chatId/:messageId", auth, unsendMessage);

module.exports = router;