import Phaser from 'phaser';
import Player from '../classes/Player.js';
import Map from '../classes/Map.js';
import Socket from '../classes/Socket.js';

/**************************************************
 * GameScene class
 *************************************************/
export default class GameScene extends Phaser.Scene {
    /****************************
    * constructor() fn
    ****************************/
    constructor() {
      super("Game");
      this.currentMap = "map01";
      this.currentPlayerSpriteSheet = "human01";
      this.playerId = "";
      this.players = {};
    };

    /****************************
    * init() fn
    ****************************/
    init() {
      console.log("GameScene init() function is called.");
      this.socket = new Socket(this);
      this.socket.initializeSocketIO();
      this.map = new Map(this, this.currentMap);
      this.scene.launch('Ui');
      this.uiscene = this.scene.get('Ui');
    };

    /****************************
    * preload() fn
    ****************************/
    preload() {
      console.log("GameScene preload() function is called.");
    };

    /****************************
    * create() fn
    ****************************/
    create() {
      console.log("GameScene create() function is called.");
    };

    /****************************
    * update() fn
    ****************************/
    update() {
      // Check if the user has control of a player
      if (this.playerId && !this.player) {
        this.player = new Player(this, 0, 0, this.currentPlayerSpriteSheet, this.socket);
        this.player.setUiScene(this.uiscene);
        this.player.setEventListeners();
        this.players[this.playerId] = this.player;

        // Update camera to follow the current player
        this.cameras.main.startFollow(this.player);
      };
      
      if(this.player){
        this.player.update();
      } else {
        console.log("Initializing player still...");
      };
    };

    /****************************
    * getPlayerId() fn - gets
    * called in Socket.js file.
    ****************************/
    getPlayerId(id) {
      this.playerId = id;
    };

    /****************************
     * displayChatMessages() fn - 
     * gets called in Socket.js 
     * file.
     ****************************/
    displaySentChatMessage(message, playerId) {

      console.log(message);
      console.log(playerId);

      this.players[playerId].displayChatMessage(message);

      console.log(this.players);

    };

    /****************************
    * updatePlayerLocations(p)
    * fn - gets called in 
    * Socket.js file.
    ****************************/
    updatePlayerLocations(players) {
      //console.log(players)
      // Loop through all the players sent back from server.
      for (const p in players) {
        // Make sure the player isn't the player playing before creating a new Player object.
        if (p !== this.playerId) {
          // Check to make sure the other player(s) have not been created yet.
          if (!this.players[p]) {
            this.players[p] = new Player(this, 0, 0, this.currentPlayerSpriteSheet, this.socket);
            this.players[p].setUiScene(this.uiscene);
            this.players[p].setEventListeners();
          };
          // Update all the other players (x, y) coordinates
          this.players[p].x = players[p].x;
          this.players[p].y = players[p].y;
          this.players[p].setTexture(this.currentPlayerSpriteSheet, players[p].frame);
        };
      };

      // Remove disconnected players
      for (const p in this.players) {
        if (!players[p]) {
          this.players[p].destroy();
          delete this.players[p];
        };
      };
    };
    
};