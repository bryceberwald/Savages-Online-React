import io from "socket.io-client";

/**************************************************
 * Socket class
 *************************************************/
export default class Socket {

    /******************************
    * Constructor is called at the
    * initiation of Socket class.
    ******************************/
    constructor(scene){
        this.socket = null;
        this.scene = scene;
        this.playerId = "";
    };

    /******************************
    * This function will initialize
    * socketIO & connect/disconnect
    * to/from the server.
    ******************************/
    initializeSocketIO(){
        this.socket = io.connect("http://localhost:3001",   { 
            withCredentials: true,
        });

        this.socket.on("connect", () => {
            console.log("Connected to server");
            localStorage.setItem('startGame', false);
            const storedUser = localStorage.getItem('user');
            const loginData = storedUser ? JSON.parse(storedUser) : null;
            console.log(loginData.username);
            this.socket.emit("getUsername", loginData.username);
        });

        this.socket.on("playerId", (id) => {
            this.playerId = id;
            this.scene.getPlayerId(id);
        });

        this.socket.on("displayChatMessage", (message, playerId) => {
            this.scene.displaySentChatMessage(message, playerId);
        });

        this.socket.on("updatePlayerPositions", (players) => {
            this.scene.updatePlayerLocations(players);
        });
    
        this.socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });
    };

    /******************************
    * This function will handle the
    * socket.emit for the players
    * position within the 'Player'
    * class.
    ******************************/
    handleSocketEmitPlayerPosition(x, y, frame, username){
        this.socket.emit("playerPosition", x, y, frame.name, username);
    };

    /******************************
    * This function will handle the
    * socket.emit for the players
    * chat msg within the 'Player'
    * class.
    ******************************/
    handleSocketEmitChatMessage(msg){
        this.socket.emit("chatMessage", msg);
    };

};