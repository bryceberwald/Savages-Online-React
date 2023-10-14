import Phaser from 'phaser';
import Player from '../classes/Player.js';
import Map from '../classes/Map.js';
import { config } from '../config/configuration.js';
import Socket from '../classes/Socket.js';

/**************************************************
 * GameScene class
 *************************************************/
export default class GameScene extends Phaser.Scene {
    constructor() {
      super("Game");
      this.currentPlayer = null;
      this.players = {};
      this.playerId = "";

      this.currentMap = "map01";
      this.currentPlayerSpriteSheet = "human01";
    };

    init() {
      console.log("GameScene init() function is called.");
      
      this.socket = new Socket(this);
      this.socket.initializeSocketIO();
      
      this.map = new Map(this, this.currentMap);
      
      this.scene.launch('Ui');
      this.uiscene = this.scene.get('Ui');
    };

    preload() {
      console.log("GameScene preload() function is called.");
    };

    create() {
      console.log("GameScene create() function is called.");
    };

    update() {
      //console.log("GameScene update() function is called.");
      
      if(this.player){
        this.player.update();
      } else {
        console.log("Initializing player still...");
      };

      // Assign new coordinates to all players excluding itself
      // for (const playerId in this.players) {
      //   if (playerId !== this.playerId) {
      //     const otherPlayer = this.players[playerId];
      //     this.player.x = otherPlayer.x;
      //     this.player.y = otherPlayer.y;
      //     console.log(`x: ${otherPlayer.x} | y: ${otherPlayer.y}`);
      //   };
      // };
      
      for (const playerId in this.players) {
        if (playerId !== this.playerId) {
          const otherPlayer = this.players[playerId];
          const currentPlayer = this.player;
    
          // Update the other player's position
          currentPlayer.x = otherPlayer.x;
          currentPlayer.y = otherPlayer.y;
          console.log(`x: ${otherPlayer.x} | y: ${otherPlayer.y}`);
        };
      };

    };

    createNewPlayer(){
      this.player = new Player(this, config.width / 2, config.height / 2, this.currentPlayerSpriteSheet, this.socket);
      this.player.setUiScene(this.uiscene);
      this.player.setEventListeners();
    };

    getCurrentPlayer(player) {
      console.log(this.player)
      this.currentPlayer = player;
    };

    getAllPlayers(players){
      this.players = players;
    };

    getCurrentPlayerId(id){
      this.playerId = id;
    };

};