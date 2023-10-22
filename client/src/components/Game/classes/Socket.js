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
        });

        this.socket.on("playerId", (id) => {
            this.playerId = id;
            this.scene.getPlayerId(id);
        });

        this.socket.on("updatePlayerPositions", (players) => {
            this.scene.updatePlayerLocations(players);
        });

        this.socket.on("displayChatMessage", (messageQueue) => {
            this.scene.getChatMessageQueue(messageQueue);
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
    handleSocketEmitPlayerPosition(x, y, frame){
        this.socket.emit("playerPosition", x, y, frame.name);
    };

    // handleSocketEmitPlayerChatMessage(msg){
    //     this.socket.emit("chatMessage", msg);
    // };
    handleSocketEmitPlayerChatMessage(msg) {
        this.socket.emit("chatMessage", { id: this.playerId, msg });
    };

};