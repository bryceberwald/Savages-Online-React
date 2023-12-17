import Phaser from 'phaser';

/**************************************************
 * PlayCharacterButton Class
 *************************************************/
export default class PlayCharacterButton extends Phaser.GameObjects.Container {

    /******************************
     * constructor() - fn
     ******************************/
    constructor(scene, x, y, key, hoverKey, text, slotNumber, targetCallback) {
        super(scene, x, y);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.key = key;
        this.hoverKey = hoverKey;
        this.text = text;
        this.slotNumber = slotNumber;
        this.targetCallback = targetCallback;
        this.createButton();
        this.scene.add.existing(this); 
    };
    
    /******************************
     * createButton() - fn
     ******************************/
    createButton() {

        // Add button displaying unpressed image file
        this.button = this.scene.add.image(0, 0, 'button01_unpressed');

        // Make button interactive for the user
        this.button.setInteractive();

        // Scale the button size to 135%
        this.button.setScale(1.35);

        // Add text to the button with passed parameter, origin starts at the buttons origin
        this.buttonText = this.scene.add.text(0, 0, this.text, { fontSize: '26px', fill: '#fff' });
        
        // Use Phaser 3's built-in function to center text with respect to the button
        Phaser.Display.Align.In.Center(this.buttonText, this.button);
        
        // Add button & button text
        this.add(this.button);
        this.add(this.buttonText);

        // Check to see if user clicked on button
        this.button.on('pointerdown', () => {
            switch(this.slotNumber){
                case 1:
                    console.log("Character #1 is trying to play the game...");
                    break;
                case 2:
                    console.log("Character #2 is trying to play the game...");
                    break;
                case 3:
                    console.log("Character #3 is trying to play the game...");
                    break;
                default:
                    console.log("Something went wrong when trying to play the game...");
                    break;
            };
            // Start the game after assigning the character data to the player.
            this.targetCallback();
        });
      
        // Check to see if user hovered over button
        this.button.on('pointerover', () => {
            this.button.setTexture(this.hoverKey);
        });
      
        // check to see if user stopped hovering over button
        this.button.on('pointerout', () => {
            this.button.setTexture(this.key);
        });
    };
};