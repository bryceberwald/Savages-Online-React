import Phaser from "phaser";
import BootScene from "../scenes/BootScene.js";
import SelectCharacterScene from "../scenes/SelectCharacterScene.js";
import CreateCharacterScene from "../scenes/CreateCharacterScene.js";
import GameScene from "../scenes/GameScene.js";
import UiScene from "../scenes/UiScene.js";

export const config = {
  width: 1280,
  height: 720,
  backgroundColor: "black",
  parent: "Savages-Online",
  dom: {
    createContainer: true
  },
  scene: [
    BootScene,
    SelectCharacterScene,
    CreateCharacterScene,
    GameScene,
    UiScene
  ],
  scale: {
    type: Phaser.AUTO,
    mode: Phaser.Scale.AUTO, // .Auto or .FIT
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 1,
  },
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false,
    },
  },
};

export const SavagesOnline = new Phaser.Game(config);