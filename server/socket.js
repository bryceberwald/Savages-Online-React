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

    // Display a message to ensure connection
    console.log(`Player ${playerId} connected`);

    // Store the player ID in the `players` object
    players[playerId] = { x: 0, y: 0, frame: 0 };
    sockets[playerId] = socket;

    // Send the player ID to the connected client
    socket.emit("playerId", playerId);

    socket.on("getUsername", user => {
      usernames[playerId] = user;
      console.log(usernames)
    });

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
  
          // Broadcast the updated player positions to all connected clients
          socket.emit("updatePlayerPositions", players);
      } catch (error) {
          console.error("Error updating player position:", error);
      }
    });

    socket.on("savePlayerData", username => {
      console.log("attempting to save player data...")
      // const user = await User.findOne({username});

      // if (user) {
      //     user.character.x = x;
      //     user.character.y = y;
      //     user.character.frame = frame;
      //     await user.save();
      //     console.log("save completed.")
      // };
      for(const u in usernames){
        if(usernames[u] === playerId){

        }
      }
    });


    socket.on("disconnect", async () => {
      // Display a message to ensure disconnection
      console.log(`Player ${playerId} disconnected`);

      for(const u in usernames){
        if(u === playerId){
          // console log the username of the player disconnecting.
          console.log(usernames[u]);

          const username = usernames[u];

          // save data to mongo database schema.
          const user = await User.findOne({username});

          if (user) {
              user.character.x = players[playerId].x;
              user.character.y = players[playerId].y;
              user.character.frame = players[playerId].frame;
              await user.save();
              console.log("save completed.")
          };
        }
      }
      
      // Remove the disconnected player from the players object {}
      delete players[playerId];

      // Broadcast the updated player positions to all connected clients
      socket.emit("updatePlayerPositions", players);
    });
      
  });

};

module.exports = initializeSocket;