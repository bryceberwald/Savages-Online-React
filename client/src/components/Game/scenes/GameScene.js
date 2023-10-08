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
      
    };

    init() {
      console.log("GameScene init() function is called.");
      
      this.socket = new Socket();
      this.socket.initializeSocketIO();
      
      this.map = new Map(this, this.currentMap);
      this.player = new Player(this, config.width / 2, config.height / 2, this.currentPlayerSpriteSheet, this.socket);
      
      this.scene.launch('Ui');
      this.uiscene = this.scene.get('Ui');

      this.player.setUiScene(this.uiscene);
      this.player.setEventListeners();
    };

    preload() {
      console.log("GameScene preload() function is called.");
    };

    create() {
      console.log("GameScene create() function is called.");
    };

    update() {
      //console.log("GameScene update() function is called.");
      this.player.update();
    };

};