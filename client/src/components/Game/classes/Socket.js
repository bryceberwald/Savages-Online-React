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
        this.player = {};
        this.players = {};
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
            this.scene.createNewPlayer();
        });

        this.socket.on("playerId", (id) => {
            this.playerId = id;
            this.scene.getCurrentPlayerId(id);
        });

        this.socket.on("updatePlayerPositions", (players) => {
            this.players = players;
            this.player = this.players[this.playerId];

            this.scene.showPlayers(this.players); // New code

            this.scene.getCurrentPlayer(this.players[this.playerId]);
            this.scene.getAllPlayers(this.players);
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
    handleSocketEmitPlayerPosition(x, y){
        this.socket.emit("playerPosition", x, y);
    };

};