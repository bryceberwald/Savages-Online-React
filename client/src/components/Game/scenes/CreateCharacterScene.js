import Phaser from 'phaser';
import { config } from '../config/configuration';

/**************************************************
 * CreateCharacterScene class
 *************************************************/
export default class CreateCharacterScene extends Phaser.Scene {

    /************************************
    * constructor() - fn
    *************************************/
    constructor(scene, characterSlotNumber) {
        super("CreateCharacter");

        this.scene = scene;
        this.characterSlotNumber = characterSlotNumber;
    };

    /************************************
    * create() - fn
    *************************************/
    create() {

        // Retrieve character slot from local storage
        const slot = parseInt(localStorage.getItem('characterSlot'));

        // Check if the slot is a valid number
        if (!isNaN(slot) && slot >= 1 && slot <= 3) {
            console.log('Character slot:', slot);
            // Your other code for creating a character goes here
        } else {
            // Output message to console when something goes wrong for debugging purposes only.
            console.log("Error Creating Character: Invalid character slot number.");
        }

        // Draw a white 150x150 square in the middle of the screen
        const square = this.add.graphics();
        square.fillStyle(0xffffff, 1); // white color
        square.fillRect(config.width / 2, config.height / 2 - 175, 250, 250);

        // Load and display an image with a specific frame in the middle of the square
        const frameNumber = 0; // replace with the desired frame number
        const image = this.add.image(config.width / 2 + 125, config.height / 2 - 50, 'human01', frameNumber); // replace 'yourSpritesheetKey' with the actual spritesheet key
        image.setOrigin(0.5); // set the origin to the center/ set the origin to the center
        image.setScale(2); // scale the image by 2

        // Add text to the screen to prompt the user to enter a character name
        this.add.text(((config.width/2) - 400), 90, 'Enter Character Name:', { fontSize: '24px', fill: '#fff' });

        // Create character name input field 
        const characterName = this.add.dom(config.width/2, 100).createFromHTML('<input type="text" name="nameField" id="nameField">');

        // Set values to created dom element for styling
        characterName.getChildByName('nameField').style.width = '400px';
        characterName.setOrigin(0.5, 0.5);
        characterName.addListener('click');

        /****************************************
         * Character name input field click event
         ****************************************/
        characterName.on('click', function (event) {

            if (event.target.name === 'nameField') {

                // TODO: Handle input field click event if needed

            };

        });

        // Create radio buttons for gender selection
        const maleRadioButton = this.add.dom(config.width / 2 + 75, config.height / 2 + 100).createFromHTML('<input type="radio" name="gender" id="maleRadio" value="male" checked><label for="maleRadio" style="font-family: Arial, sans-serif; color: #fff;">Male</label>');
        const femaleRadioButton = this.add.dom(config.width / 2 + 175, config.height / 2 + 100).createFromHTML('<input type="radio" name="gender" id="femaleRadio" value="female"><label for="femaleRadio" style="font-family: Arial, sans-serif; color: #fff;">Female</label>');

        // Set values to created dom elements for styling
        maleRadioButton.setOrigin(0.5, 0.5);
        femaleRadioButton.setOrigin(0.5, 0.5);

        // Create Character Button
        const createButton = this.add.text(680, config.height - 200, 'Create Character', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        
        // Set button as interactive for the user
        createButton.setInteractive({ useHandCursor: true });

        /************************************
         * Create button on click event
         ************************************/
        createButton.on('pointerdown', () => {

            // Handle the character creation logic here
            const name = characterName.getChildByName('nameField').value;

            // Output the character name to the console for debugging purposes
            console.log('Character Name:', name);

            //TODO: Add logic to create the character in the game using the entered name

            //TODO: For example, you can pass the characterName to another scene to create the character.
            
            //TODO: this.scene.start('YourGameScene', { characterName });
        });

        // Create Character Button
        const backButton = this.add.text(900, config.height - 200, 'Go Back', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        
        // Make button interactive for the user
        backButton.setInteractive({ useHandCursor: true });

        /************************************
        * Back button on click event
        *************************************/
        backButton.on('pointerdown', () => {


            // TODO: Add logic to create the character in the game using the entered name
            
            // TODO: For example, you can pass the characterName to another scene to create the character.

            // Stop the current scene before switching
            this.scene.stop('CreateCharacter');

            // Switch back to the "SelectCharacter" scene
            this.scene.start('SelectCharacter');
        });

    };
};