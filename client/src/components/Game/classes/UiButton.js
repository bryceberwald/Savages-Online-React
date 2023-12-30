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
                    // TODO: Start the game with a character from the database (With respect to the slot number)
                    if(this.characterSlot === 1) {
                        console.log("Trying to start the game with character in slot #: ", this.characterSlot);
                        this.scene.scene.start('Game');
                    } else if (this.characterSlot === 2) {
                        console.log("Trying to start the game with character in slot #: ", this.characterSlot);
                    } else if (this.characterSlot === 3) {
                        console.log("Trying to start the game with character in slot #: ", this.characterSlot)
                    } else {
                        console.log("Error loading character...");
                    };
                    break;
                case 'DELETE':
                    // TODO: Delete a character from the database (With respect to the slot number)
                    if(this.characterSlot === 1) {
                        console.log("Trying to delete character in slot #: ", this.characterSlot);
                    } else if(this.characterSlot === 2) {
                        console.log("Trying to delete character in slot #: ", this.characterSlot);
                    } else if (this.characterSlot === 3) {
                        console.log("Trying to delete character in slot #: ", this.characterSlot);
                    } else {
                        console.log("Error deleting character...");
                    };
                    break;
                case 'CREATE':
                    // TODO: Create a new character in the database (With respect to the slot number)
                    if(this.characterSlot === 1) {

                        // Output to console for debugging purposes only which character slot is to be created in the database.
                        console.log("Trying to create character in slot #: ", { slot: this.characterSlot });

                        this.scene.scene.switch('CreateCharacter', { slot: this.characterSlot }); // Why can't I access the passed key/value object in CreateCharacterScene.js?

                    } else if(this.characterSlot === 2) {

                        // Output to console for debugging purposes only which character slot is to be created in the database.
                        console.log("Trying to create character in slot #: ", { slot: this.characterSlot });

                        this.scene.scene.switch('CreateCharacter', { slot: this.characterSlot }); // Why can't I access the passed key/value object in CreateCharacterScene.js?

                    } else if (this.characterSlot === 3) {

                        // Output to console for debugging purposes only which character slot is to be created in the database.
                        console.log("Trying to create character in slot #: ", { slot: this.characterSlot });

                        this.scene.scene.switch('CreateCharacter', { slot: this.characterSlot }); // Why can't I access the passed key/value object in CreateCharacterScene.js?

                    } else {
                        // Output message to console when something goes wrong for debugging purposes only.
                        console.log("Error Creating Character: Invalid character slot number.");
                    };
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