const socketIo = require("socket.io");
const User = require('./models/User');
const { v4: uuidv4 } = require('uuid');

const players = {};
const sockets = {};
const usernames = {};

function initializeSocket(server, corsOptions) {
  const io = socketIo(server, {
    cors: corsOptions, // Use the provided CORS options from server.js
  });

  io.on("connect", socket => {

    // Generate a unique player ID for the connected player
    const playerId = uuidv4();

    // Display a message to console when a player has connected to the socket.
    console.log(`Player ${playerId} connected`);

    // Assign players {} object initial variable values.
    players[playerId] = { x: 0, y: 0, frame: 0 };
    sockets[playerId] = socket;

    // Send the playerId to the game client.
    socket.emit("playerId", playerId);

    // Listen to get the players username to store to the usernames {} object.
    socket.on("getUsername", user => {
      usernames[playerId] = user;
      console.log(usernames);
    });

    // Listen for a new chat message to be emitted from the player.
    socket.on("chatMessage", (msg) => {
      Object.values(sockets).forEach(sock => sock.emit("displayChatMessage", msg, playerId));
    });

    // Listen for a change in the players position
    socket.on("playerPosition", async (x, y, frame) => {
      try {
          // Update players location in the players objects {x, y, frame}
          players[playerId].x = x;
          players[playerId].y = y;
          players[playerId].frame = frame;
  
          // Broadcast the updated player positions to all connected clients
          socket.emit("updatePlayerPositions", players);
      } catch (error) {
          console.error("Error updating player position:", error);
      };
    });

    socket.on("disconnect", async () => {
      
      // Display a message to ensure disconnection
      console.log(`Player ${playerId} disconnected`);

      // Loop through all of the 
      for(const u in usernames){
        if(u === playerId){
          console.log(usernames[u]);
          const username = usernames[u];

          // Find the player in database searching by the username.
          const user = await User.findOne({username});

          // Check if username was found in database, saving information if so.
          if (user) {
              user.character.x = players[playerId].x;
              user.character.y = players[playerId].y;
              user.character.frame = players[playerId].frame;
              await user.save();
              console.log("save completed.");
          };

        };
      };

      // Remove the disconnected player from the usernames object {}
      delete usernames[playerId];

      // Remove the disconnected player from the sockets object {}
      delete sockets[playerId];
      
      // Remove the disconnected player from the players object {}
      delete players[playerId];

      // Broadcast the updated player positions to all connected clients
      socket.emit("updatePlayerPositions", players);

    });
      
  });

};

module.exports = initializeSocket;