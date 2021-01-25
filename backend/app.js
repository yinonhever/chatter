const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const socket = require("./socket");

const userRoutes = require("./routes/users");
const chatRoutes = require("./routes/chats");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);

const connectServer = async () => {
    const PORT = process.env.PORT || 5000;
    await mongoose.connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    const io = socket.init(server);
    io.on("connect", client => {
        client.on("joinRooms", (...rooms) =>
            rooms.forEach(roomId => client.join(roomId))
        );
    });
}

connectServer();