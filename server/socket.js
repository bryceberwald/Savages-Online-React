const socketIo = require("socket.io");

function initializeSocket(server, corsOptions) {
  const io = socketIo(server, {
    cors: corsOptions, // Use the provided CORS options
  });

  io.on("connect", (socket) => {
    console.log("A user connected");

    socket.on("playerPosition", (x, y) => {
      console.log(`x: ${x} & y: ${y}`);
      io.emit("Received Position", "Received player's new position.");
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

};

module.exports = initializeSocket;