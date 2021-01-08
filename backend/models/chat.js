const { Schema, model } = require("mongoose");

const userLimit = val => val.length === 2;

const chatSchema = new Schema({
    users: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        validate: [userLimit, "A chat should have 2 users"]
    },
    messages: [
        {
            sender: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            content: {
                type: String,
                required: true
            },
            sentAt: {
                type: Date,
                required: true
            }
        }
    ]
}, { timestamps: true });

module.exports = model("Chat", chatSchema);