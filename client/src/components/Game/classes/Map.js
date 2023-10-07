import Phaser from 'phaser';
/**************************************************
 * Map class
 *************************************************/
// export default class Map extends Phaser.Physics.Arcade.Image {

//     /******************************
//      * Constructor is called at the
//      * initiation of Map class.
//      ******************************/
//     constructor(scene, mapKey) {
//         super(scene);
//         this.layer1 = null;
//         this.map = scene.make.tilemap({ key: mapKey });
//         this.tileset = this.map.addTilesetImage("CL_MainLev", "tileset01", 32, 32, 0, 0);
//         this.layer1 = this.map.createLayer("Tile Layer 1", this.tileset, 0, 0);
//         this.layer1.setScale(2);
//         scene.add.existing(this);
//     };
// };

export default class Map extends Phaser.Physics.Arcade.Image {
    constructor(scene, mapKey) {
        super(scene);
        this.layer1 = null;
        this.map = scene.make.tilemap({ key: mapKey });
        this.tileset = this.map.addTilesetImage("CL_MainLev", "tileset01", 32, 32, 0, 0);
        console.log("Map Key:", mapKey);
        console.log("Tileset Key:", "tileset01");
        console.log("Layer Name:", "Tile Layer 1");

        console.log("Available Layer Names:", this.map.layers.map(layer => layer.name));
        this.layer1 = this.map.createLayer("Tile Layer 1", this.tileset, 0, 0);
        //this.layer1.setScale(2);
        scene.add.existing(this);
    };
};