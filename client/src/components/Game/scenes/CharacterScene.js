import Phaser from 'phaser';
import UiButton from '../classes/UiButton';
import { config } from '../config/configuration';

/**************************************************
 * CharacterScene class
 *************************************************/
export default class CharacterScene extends Phaser.Scene {
    /***********************************
     * Constructor is called at the
     * initiation of the CharacterScene
     * class.
     **********************************/
    constructor() {
        super("Character");
        this.characterSlots = {};
    };

    /***********************************
     * Function is called once when
     * CharacterScene is active. This
     * function will be used to create 
     * the character selection screen.
     **********************************/
    create() {
        // Add the pre game background image
        this.addBackgroundImage();

        // Add the character selection slots
        this.addCharacterSelectionSlots();

        // Output the characterSlots object to the console
        console.log(this.characterSlots);
    };

    /***********************************
     * Function is used to add the 
     * pre game background image to the
     * character selection screen.
     **********************************/
    addBackgroundImage() {
        const background = this.add.image(0, 0, 'pregame_background');
        background.setScale(
            (config.width / background.width) * 2, 
            (config.height / background.height) * 2
        );
    };

    /***********************************
     * Function is used to add the
     * character selection slots to the
     * character selection screen.
     **********************************/
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
                'PLAY',
                i + 1
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
                'DELETE',
                i + 1
            );
            
            // Scale the button size to 50%
            deleteButton.setScale(0.5);

            // Create a new button for each character selection slot to delete the character
            const createButton = new UiButton(
                this,
                (config.width / 2) + 100,
                startY + i * (boxSize + spacing) + 50,
                'button01_unpressed',
                'button01_pressed',
                'Create Character',
                'CREATE',
                i + 1
            );
            
            // Scale the button size to 50%
            createButton.setScale(0.5);

            // Add the character selection slots contents to the characteSolts object {}
            this.characterSlots[i] = {
                box: box,
                playButton: playButton,
                deleteButton: deleteButton,
                createButton: createButton
            };
                    
            // TODO: Add logic to check if the character slot is empty or not and add a character to slot in database if empty.
            this.characterSlots[i].createButton.on('pointerdown', () => {
                console.log("Creating a character...");
            });
            
        };
    };

    

};