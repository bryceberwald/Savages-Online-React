const socketIo = require("socket.io");
const { v4: uuidv4 } = require('uuid'); // Import the UUID function

const players = {};

function initializeSocket(server, corsOptions) {
  const io = socketIo(server, {
    cors: corsOptions, // Use the provided CORS options
  });

  io.on("connect", socket => {
    console.log("A user connected");

    // Generate a unique player ID for the connected player
    const playerId = uuidv4();

    // Store the player ID in the `players` object
    players[playerId] = { x: 0, y: 0 };
    console.log(players);

    // Send the player ID to the connected client
    socket.emit("playerId", playerId);

    socket.on("playerPosition", (x, y) => {
      console.log(players[playerId]);
      players[playerId].x = x;
      players[playerId].y = y;
      console.log(`x: ${x} & y: ${y}`);

      // Broadcast the updated player positions to all connected clients
      socket.emit("updatePlayerPositions", players);

    });

    socket.on("disconnect", () => {
      console.log(`Player ${playerId} disconnected`);
      
      delete players[playerId];

      // Broadcast the updated player positions to all connected clients
      socket.emit("updatePlayerPositions", players);
    });
    
  });

};

module.exports = initializeSocket;