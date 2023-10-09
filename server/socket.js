const socketIo = require("socket.io");

function initializeSocket(server, corsOptions) {
  const io = socketIo(server, {
    cors: corsOptions, // Use the provided CORS options
  });

  io.on("connect", (socket) => {
    console.log("A user connected");

    socket.on("playerPosition", (x, y) => {
      console.log(`x: ${x} & y: ${y}`);
      const data = {x, y};
      io.emit("Received Position ", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

};

module.exports = initializeSocket;