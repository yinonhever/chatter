const User = require("../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ message: errors.array()[0].msg });
        }
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "A user with that email already exists" });
        }

        const avatar = gravatar.url(email, { s: "500", r: "pg", d: "mm" });
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({ name, email, avatar, password: hashedPassword });
        const createdUser = await user.save();

        const token = jwt.sign(
            { email, userId: createdUser._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(201).json({
            token,
            expiresIn: 86400000,
            user: { _id: createdUser._id, name, email, avatar }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occured. Please try again in a moment." });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Email or password are incorrect" });
        }
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
            return res.status(401).json({ message: "Email or password are incorrect" });
        }

        const token = jwt.sign(
            { email, userId: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        const { _id, name, avatar } = user;

        res.status(200).json({
            token,
            expiresIn: 86400000,
            user: { _id, email, name, avatar }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occured. Please try again in a moment." });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password -chats");
        users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occured. Please try again in a moment." });
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select("-password -chats");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occured. Please try again in a moment." });
    }
}

exports.updateUserDetails = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ message: errors.array()[0].msg });
        }
        const { userId } = req.params;
        if (userId !== req.userId) {
            return res.status(403).json({ message: "Not authorized to edit this user's details" });
        }
        const user = await User.findById(userId).select("-password -chats");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        for (let key in req.body) {
            user[key] = req.body[key];
        }
        await user.save();
        res.status(200).json({ message: "Successfully updated profile", user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occured. Please try again in a moment." });
    }
}

exports.insertUsers = async (req, res) => {
    try {
        const createdUsers = [];
        req.body.forEach(async item => {
            const user = new User({ ...item });
            user.password = await bcrypt.hash(item.password, 12);
            const createdUser = await user.save();
            createdUsers.push(createdUser);
        })
        res.status(201).json(createdUsers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occured. Please try again in a moment." });
    }
}