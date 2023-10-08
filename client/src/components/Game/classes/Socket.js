import io from "socket.io-client";

/**************************************************
 * Socket class
 *************************************************/
export default class Socket {

    /******************************
    * Constructor is called at the
    * initiation of Socket class.
    ******************************/
    constructor(){
        this.socket = "";
    };

    /******************************
    * This function will initialize
    * socketIO & connect/disconnect
    * to/from the server.
    ******************************/
    initializeSocketIO(){
        this.socket = io.connect("http://localhost:3001");

        this.socket.on("connect", () => {
            console.log("Connected to server");
        });
    
        this.socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });
    };

    /******************************
    * This function will handle all
    * the socket.on listeners for
    * the 'Player' class.
    ******************************/
    handleSocketOnPlayerListeners(){
        this.socket.on("receivedPosition", (str) => {
            console.log(str);
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