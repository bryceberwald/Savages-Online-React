import Phaser from 'phaser';
/**************************************************
 * UiButton class
 *************************************************/
export default class UiButton extends Phaser.GameObjects.Container {

    /******************************
     * constructor() - fn
     ******************************/
    constructor(scene, x, y, key, hoverKey, text, action, characterSlot) {
        super(scene, x, y);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.key = key;
        this.hoverKey = hoverKey;
        this.text = text;
        this.action = action;
        this.characterSlot = characterSlot;
        this.isCreateButtonClicked = false;
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
            // Check the action type
            switch (this.action) {
                case 'PLAY':
                    // TODO: Start the game with character in specific slot number
                    //console.log('Trying to start the game with character in slot #: ', this.characterSlot);

                    if(this.characterSlot === 1) {
                        this.scene.scene.start('Game', {character: 'character01'});
                    } else if (this.characterSlot === 2) {
                        this.scene.scene.start('Game', {character: 'character02'});
                    } else if (this.characterSlot === 3) {
                        this.scene.scene.start('Game', {character: 'character03'});
                    } else {

                    }

                    //this.scene.scene.start('Game');
                    break;
                case 'DELETE':
                    // TODO: Delete a character from the database in specific slot number
                    console.log('Tring to delete character in slot #: ', this.characterSlot);
                    break;
                case 'CREATE':
                    // TODO: Create a new character in the database in specific slot number
                    console.log('Trying to create a new character in slot #: ', this.characterSlot);
                    break;
                default:
                    // Error checking for invalid action type
                    console.log('Invalid action inside UiButton.js file when clicking a button in CharacterScene.js');
                    break;
            };
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