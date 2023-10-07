import Phaser from 'phaser';
/**************************************************
 * Map class
 *************************************************/
export default class Map extends Phaser.Physics.Arcade.Image {

    /******************************
     * Constructor is called at the
     * initiation of Map class.
     ******************************/
    constructor(scene, mapKey) {
        super(scene);
        this.layer1 = null;
        this.map = scene.make.tilemap({ key: mapKey });
        this.tileset = this.map.addTilesetImage("CL_MainLev", "tileset01", 32, 32, 0, 0);
        this.layer1 = this.map.createLayer("Tile Layer 1", this.tileset, 0, 0);
        this.layer1.setScale(2);
        scene.add.existing(this);
    };
};