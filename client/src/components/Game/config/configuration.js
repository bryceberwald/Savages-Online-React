import Phaser from "phaser";
import BootScene from "../scenes/BootScene.js";
import TitleScene from "../scenes/TitleScene.js";
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
    TitleScene,
    GameScene,
    UiScene
  ],
  scale: {
    type: Phaser.AUTO,
    mode: Phaser.Scale.FIT, // .Auto
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
  // plugins: {
  //   global: [{
  //       key: 'rexInputTextPlugin',
  //       plugin: InputTextPlugin,
  //       start: true
  //   }],
  // },
};

export const SavagesOnline = new Phaser.Game(config);