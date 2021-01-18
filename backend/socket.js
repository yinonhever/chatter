const socket = require("socket.io");

let io;

module.exports = {
    init: server => {
        io = socket(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
            }
        });
        return io;
    },
    get: () => {
        if (!io) throw new Error("Socket.io not initialized");
        return io;
    }
};