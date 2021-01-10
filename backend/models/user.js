const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    profession: {
        type: String
    },
    birthday: {
        type: Date
    },
    location: {
        type: String
    },
    bio: {
        type: String,
    },
    chats: [
        {
            type: Schema.Types.ObjectId,
            ref: "Chat"
        }
    ]
}, { timestamps: true });

module.exports = model("User", userSchema);