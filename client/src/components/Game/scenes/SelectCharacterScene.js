import Phaser from 'phaser';
import UiButton from '../classes/UiButton';
import { config } from '../config/configuration';

/**************************************************
 * SelectCharacterScene class
 *************************************************/
export default class SelectCharacterScene extends Phaser.Scene {
    /************************************
     * constructor() - fn
     ***********************************/
    constructor() {
        super("SelectCharacter");
        this.characterSlots = {};
    };

    /***********************************
     * create() - fn
     ***********************************/
    create() {
        // Add the pre game background image
        this.addBackgroundImage();

        // Add the character selection slots
        this.addCharacterSelectionSlots();

        // Output the characterSlots object to the console
        console.log(this.characterSlots);
    };

    /***********************************
    * addBackgroundImage() - fn
    ***********************************/
    addBackgroundImage() {
        const background = this.add.image(0, 0, 'pregame_background');
        background.setScale(
            (config.width / background.width) * 2, 
            (config.height / background.height) * 2
        );
    };

    /***********************************
    * addCharacterSelectionSlots() - fn
    ***********************************/
    addCharacterSelectionSlots() {

        const boxCount = 3;
        const boxSize = 190;
        const spacing = 20;
        const totalHeight = boxCount * boxSize + (boxCount - 1) * spacing;
        const startY = (config.height - totalHeight) / 2 + 100;

        for (let i = 0; i < boxCount; i++) {

            // Create a new rectangle for character selection slots
            const box = this.add.rectangle(
            config.width / 2, // Centered horizontally
            startY + i * (boxSize + spacing), // Vertically spaced
            boxSize * 2,
            boxSize,
            0xffffff
            );
            
            // Set the origin of the rectangle to the center
            box.setOrigin(0.5);

            // Create a new rectangle for character selection slots
            const buttonContainerBox = this.add.rectangle(
                config.width / 2 + 100, // Centered horizontally
                startY + i * (boxSize + spacing), // Vertically spaced
                boxSize,
                boxSize,
                0x000000
            );
                
            // Set the origin of the rectangle to the center
            buttonContainerBox.setOrigin(0.5);

            // Create a new button for each character selection slot to play the game with that character
            const playButton = new UiButton(
                this,
                (config.width / 2) + 100,
                startY + i * (boxSize + spacing) - 30,
                'button01_unpressed',
                'button01_pressed',
                'Play',
                () => {
                    console.log("Trying to start the game with character in slot #: ", i + 1);
                    this.scene.start('Game');
                }
            );
            
            // Scale the button size to 50%
            playButton.setScale(0.5);

            // Create a new button for each character selection slot to delete the character
            const deleteButton = new UiButton(
                this,
                (config.width / 2) + 100,
                startY + i * (boxSize + spacing) + 10,
                'button01_unpressed',
                'button01_pressed',
                'Delete',
                () => {
                    console.log("Trying to delete character in slot #: ", i + 1);
                }
            );
            
            // Scale the button size to 50%
            deleteButton.setScale(0.5);

            // Create a new button for each character selection slot to create a new character.
            const createButton = new UiButton(
                this,
                (config.width / 2) + 100,
                startY + i * (boxSize + spacing) + 50,
                'button01_unpressed',
                'button01_pressed',
                'Create',
                () => {
                    console.log("Trying to create character in slot #:", i + 1);
                    localStorage.setItem('characterSlot', i + 1);
                    this.scene.switch('CreateCharacter');
                }
            );
            
            // Scale the button size to 50%
            createButton.setScale(0.5);
            
        };

    };

};