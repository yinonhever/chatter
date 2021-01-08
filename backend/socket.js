let io;

module.exports = {
    init: httpServer => {
        io = require("socket.io")(httpServer, {
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