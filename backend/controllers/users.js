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
            user: { _id, email, name, avatar }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occured. Please try again in a moment." });
    }
}

exports.getUsers = async (req, res) => {
    try {
        let users = await User.find().select("-password -chats");
        users = users.filter(user => user._id.toString() !== req.userId);
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