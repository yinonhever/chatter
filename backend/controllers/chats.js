const Chat = require("../models/chat");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const io = require("../socket");

exports.getUserChats = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate({
            path: "chats",
            model: "Chat",
            populate: {
                path: "users",
                model: "User",
                select: "name email avatar"
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const data = [];
        user.chats.forEach(chat => {
            if (chat.messages.length > 0) {
                data.push({
                    _id: chat._id,
                    correspondent: chat.users.find(usr => usr._id.toString() !== req.userId),
                    lastMessage: chat.messages[0],
                    updatedAt: chat.updatedAt
                });
            }
        });
        data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occured. Please try again in a moment." });
    }
}

exports.createOrOpenChat = async (req, res) => {
    try {
        const { addressUserId } = req.params;
        if (addressUserId === req.userId) {
            return res.status(400).json({ message: "Can't open a chat with yourself" });
        }
        const currentUser = await User.findById(req.userId).populate("chats");
        const existingChat = currentUser.chats.find(chat =>
            !!chat.users.find(userId => userId.toString() === addressUserId)
        );
        if (existingChat) {
            await existingChat.populate([
                {
                    path: "users",
                    model: "User",
                    select: "name email avatar"
                },
                {
                    path: "messages",
                    populate: {
                        path: "sender",
                        model: "User",
                        select: "name email avatar"
                    }
                }
            ]).execPopulate();
            return res.status(200).json({ message: "Fetched existing chat", chat: existingChat });
        }

        const addressUser = await User.findById(addressUserId);
        if (!addressUser) {
            return res.status(404).json({ message: "Address user not found" });
        }
        const chat = new Chat({
            users: [currentUser._id, addressUserId],
            messages: []
        });
        const createdChat = await chat.save();
        await createdChat.populate({
            path: "users",
            model: "User",
            select: "name email avatar"
        }).execPopulate();

        currentUser.chats.push(createdChat);
        await currentUser.save();
        addressUser.chats.push(createdChat);
        await addressUser.save();

        res.status(201).json({ message: "New chat created", chat: createdChat });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occured. Please try again in a moment." });
    }
}

exports.sendMessage = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ message: errors.array()[0].msg });
        }

        const { chatId } = req.params;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        if (!chat.users.find(userId => userId.toString() === req.userId)) {
            return res.status(403).json({ message: "Not authorized to send message in this chat" });
        }

        const { message } = req.body;
        const newMessage = {
            content: message,
            sender: { _id: req.userId },
            sentAt: new Date()
        };
        chat.messages.unshift(newMessage);
        newMessage._id = chat.messages[0]._id;
        await chat.save();
        io.get().emit("addMessage", { message: newMessage });

        res.status(201).json({ message: "Message sent", messageData: newMessage });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Couldn't send message. Please try again in a moment." });
    }
}

exports.unsendMessage = async (req, res) => {
    try {
        const { chatId, messageId } = req.params;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ messgae: "Chat not found" });
        }
        const message = chat.messages.find(msg => msg._id.toString() === messageId);
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        if (message.sender.toString() !== req.userId) {
            return res.status(403).json({ message: "Not authorized to delete this message" });
        }

        chat.messages = chat.messages.filter(msg => msg._id.toString() !== messageId);
        await chat.save();
        io.get().emit("deleteMessage", { messageId });

        res.status(200).json({ message: "Message deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Couldn't delete message. Please try again in a moment." });
    }
}

exports.markAsRead = async (req, res) => {
    try {
        const { chatId } = req.params;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        if (!chat.users.find(userId => userId.toString() === req.userId)) {
            return res.status(403).json({ message: "Not authorized to modify this chat" });
        }
        chat.messages.forEach((message, index) => {
            if (message.sender._id.toString() !== req.userId) {
                chat.messages[index].read = true;
            }
        });
        await chat.save();
        return res.status(200).json({ message: "Marked messages as read", chat });
    } catch (error) {
        res.status(500).json({ message: "Couldn't delete message. Please try again in a moment." });
    }
}