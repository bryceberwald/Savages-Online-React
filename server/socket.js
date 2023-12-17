const socketIo = require("socket.io");
const User = require('./models/User');
const { v4: uuidv4 } = require('uuid');

const players = {};
const sockets = {}

function initializeSocket(server, corsOptions) {
  const io = socketIo(server, {
    cors: corsOptions, // Use the provided CORS options from server.js
  });

  io.on("connect", socket => {

    // Generate a unique player ID for the connected player
    const playerId = uuidv4();

    // Display a message to ensure connection
    console.log(`Player ${playerId} connected`);

    // Store the player ID in the `players` object
    players[playerId] = { x: 0, y: 0, frame: 0 };
    sockets[playerId] = socket

    // Send the player ID to the connected client
    socket.emit("playerId", playerId);

    // Listen for a new chat message to be emitted from the player.
    socket.on("chatMessage", (msg) => {
      Object.values(sockets).forEach(sock => sock.emit("displayChatMessage", msg, playerId))
    });

    // Listen for a change in the players position
    socket.on("playerPosition", async (x, y, frame, username) => {
      try {
          // Update players coordinates in the players objects {x, y}
          players[playerId].x = x;
          players[playerId].y = y;
          players[playerId].frame = frame;
  
          const user = await User.findOne({username});
  
          if (user) {
              user.character.x = x;
              user.character.y = y;
              user.character.frame = frame;
              await user.save();
          };
  
          // Broadcast the updated player positions to all connected clients
          socket.emit("updatePlayerPositions", players);
      } catch (error) {
          console.error("Error updating player position:", error);
      }
  });
  

    socket.on("disconnect", () => {
      // Display a message to ensure disconnection
      console.log(`Player ${playerId} disconnected`);
      
      // Remove the disconnected player from the players object {}
      delete players[playerId];

      // Broadcast the updated player positions to all connected clients
      socket.emit("updatePlayerPositions", players);
    });
    
  });

};

module.exports = initializeSocket;