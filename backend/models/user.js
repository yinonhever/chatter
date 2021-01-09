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
        type: String
    },
    profession: {
        type: String
    },
    status: {
        type: String,
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
});

module.exports = model("User", userSchema);