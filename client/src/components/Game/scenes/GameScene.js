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

    };

    showPlayers(players){

      for(const p in players){
        //console.log(p)
        //console.log(this.playerId)
        //console.log(players[p])
        if(p !== this.playerId){
          new Player(this, players[p].x, players[p].y, this.currentPlayerSpriteSheet, this.socket);
            //.setEventListeners();
          console.log("Added new player.")
        };

      };

    };

    createNewPlayer(){
      this.player = new Player(this, config.width / 2, config.height / 2, this.currentPlayerSpriteSheet, this.socket);
      this.player.setUiScene(this.uiscene);
      this.player.setEventListeners();
    };

    getCurrentPlayerId(id){
      this.playerId = id;
    };

    getCurrentPlayer(player) {
      this.currentPlayer = player;
    };

    getAllPlayers(players){
      this.players = players;
    };
    
};