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
      this.currentMap = "map01";
      this.currentPlayerSpriteSheet = "human01";

      this.playerId = "";
      this.players = {};
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

    };

    getPlayerId(id) {
      this.playerId = id;
    };

    createNewPlayer(players){

      // Show players on game including the users player
      for(const p in players){
        if(p === this.playerId){
          this.player = new Player(this, players[p].x, players[p].y, this.currentPlayerSpriteSheet, this.socket);
          this.player.setUiScene(this.uiscene);
          this.player.setEventListeners();
          this.players[p] = this.player;
        } else {
          this.players[p] = new Player(this, players[p].x, players[p].y, this.currentPlayerSpriteSheet, this.socket);
        }
      };
      //console.log(this.players);
    };

    updatePlayerLocations(players){
      //console.log(this.players)
      for (const p in this.players){
        if(p !== this.playerId){
          this.players[p].x = players[p].x;
          this.players[p].y = players[p].y;
        };
      };
    };
    
};