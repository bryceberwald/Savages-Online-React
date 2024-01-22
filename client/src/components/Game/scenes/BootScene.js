import Phaser from 'phaser';
/**************************************************
 * BootScene class
 *************************************************/
export default class BootScene extends Phaser.Scene {
    
    /******************************
     * Constructor is called at the
     * initiation of the BootScene
     * class.
     ******************************/
    constructor() {
        super("Boot");
    };
    
    /******************************
     * Function is called once when
     * BootScene is active. This
     * function will be used to load
     * all of the game assets using
     * functions within this class
     * for code consolidation.
     ******************************/
    preload() {
        // Load Images
        this.loadImages();

        // Load Map Atlas Files
        this.loadMapAtlasFiles();
      
        // Load SpriteSheets
        this.loadSpriteSheets();
      
        // Load Audio
        this.loadAudio();
    };
    
    /******************************
     * Function is used to load
     * images that'll be used by the
     * game.
     ******************************/
    loadImages() {

        // Display message to console for debugging purposes
        console.log("BootScene loadImages() function called.");

        // Load background images
        this.load.image("pregame_background", "./assets/images/ui/backgrounds/pregame/background.png");
        this.load.image("ingame_background", "./assets/images/ui/backgrounds/ingame/background.png");

        // Load button images
        this.load.image("button01_unpressed", "./assets/images/ui/buttons/button01/unpressed.png");
        this.load.image("button01_pressed", "./assets/images/ui/buttons/button01/pressed.png");

        this.load.image("button02_left_unpressed", "./assets/images/ui/buttons/button02/left/unpressed.png");
        this.load.image("button02_left_pressed", "./assets/images/ui/buttons/button02/left/pressed.png");

        this.load.image("button02_right_unpressed", "./assets/images/ui/buttons/button02/right/unpressed.png");
        this.load.image("button02_right_pressed", "./assets/images/ui/buttons/button02/right/pressed.png");

        // Load map tileset images
        this.load.image("tileset01", "./assets/images/tilesets/CL_MainLev.png");
    };

    /******************************
     * Function is used to load map
     * atlas files of type JSON
     * after tileset images are
     * loaded.
     ******************************/
    loadMapAtlasFiles() {
        // Load map atlas files
        this.load.tilemapTiledJSON("map01", "./assets/images/maps/map01/main_map.json");
    };
    
    /******************************
     * Function is used to load
     * sprite sheets used by the
     * game.
     ******************************/
    loadSpriteSheets() {
        // Display message to console for debugging purposes
        console.log("BootScene loadSpriteSheets() function called.");

        // Load human sprite sheets
        this.load.spritesheet("human01", "./assets/images/spritesheets/players/human/human01.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("human02", "./assets/images/spritesheets/players/human/human02.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("human03", "./assets/images/spritesheets/players/human/human03.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("human04", "./assets/images/spritesheets/players/human/human04.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("human05", "./assets/images/spritesheets/players/human/human05.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("human06", "./assets/images/spritesheets/players/human/human06.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("human07", "./assets/images/spritesheets/players/human/human07.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("human08", "./assets/images/spritesheets/players/human/human08.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("human09", "./assets/images/spritesheets/players/human/human09.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("human10", "./assets/images/spritesheets/players/human/human10.png", { frameWidth: 64, frameHeight: 64 });

        // Load demon sprite sheets
        this.load.spritesheet("demon01", "./assets/images/spritesheets/players/demon/demon01.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("demon02", "./assets/images/spritesheets/players/demon/demon02.png", { frameWidth: 64, frameHeight: 64 });

        // Load goblin sprite sheets
        this.load.spritesheet("goblin01", "./assets/images/spritesheets/players/goblin/goblin01.png", { frameWidth: 64, frameHeight: 64 });

        // Load hairstyle sprite sheets
        this.load.spritesheet("hairstyle01", "./assets/images/spritesheets/hairstyles/style01.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("hairstyle02", "./assets/images/spritesheets/hairstyles/style02.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("hairstyle03", "./assets/images/spritesheets/hairstyles/style03.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("hairstyle04", "./assets/images/spritesheets/hairstyles/style04.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("hairstyle05", "./assets/images/spritesheets/hairstyles/style05.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("hairstyle06", "./assets/images/spritesheets/hairstyles/style06.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("hairstyle07", "./assets/images/spritesheets/hairstyles/style07.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("hairstyle08", "./assets/images/spritesheets/hairstyles/style08.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("hairstyle09", "./assets/images/spritesheets/hairstyles/style09.png", { frameWidth: 64, frameHeight: 64 });
    };
    
    /******************************
     * Function is used to load
     * audio that'll be used by the
     * game.
     ******************************/
    loadAudio() {
        // Display message to console for debugging purposes
        console.log("BootScene loadAudio() function called.");
    };
    
    /******************************
     * Function is called once
     * after the preload() function
     * to switch to the TitleScene.
     ******************************/
    create() {
        // Display message to console for debugging purposes
        console.log("BootScene create() function called.");
    };

    /******************************
     * update() - fn
     *****************************/
    update(){
        // Extract users data from local storage.
        const startGame = localStorage.getItem('startGame');

        // Check if startGame is set to true, if so starting the GameScene.
        if(startGame === 'true'){
            this.scene.start("SelectCharacter");
        };
    };
    
};