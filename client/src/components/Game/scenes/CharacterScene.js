import Phaser from 'phaser';
import PlayCharacterButton from '../classes/buttons/PlayCharacterButton';
import AddCharacterButton from '../classes/buttons/AddCharacterButton'
import DeleteCharacterButton from '../classes/buttons/DeleteCharacterButton';
import { config } from '../config/configuration';

/**************************************************
 * CharacterScene class
 *************************************************/
export default class CharacterScene extends Phaser.Scene {
    /******************************
     * constructor() - fn
     ******************************/
    constructor() {
        super("Character");
        this.playButtons = {};
        this.deleteButtons = {};
    };

    /******************************
     * create() - fn
     ******************************/
    create() {
        // Add the pre game background image
        this.background = this.add.image(0, 0, 'pregame_background');

        // Scale the pre game background image to the size of users window
        this.background.setScale(
            (config.width / this.background.width) * 2, 
            (config.height / this.background.height) * 2
        );

        this.createCharacterSlots();

        this.addButton = new AddCharacterButton(
            this, 
            config.width / 2,
            config.height - 50, 
            'button01_unpressed', 
            'button01_pressed', 
            'add a character'
        );
        this.addButton.setScale(0.5);
    };

    /******************************
     * createCharacterSlots() - fn
     ******************************/
    createCharacterSlots(){
        // Set the width and height of each white square box
        const boxWidth = 150;
        const boxHeight = 150;
    
        // Set the gap between each box
        const gap = 30;
    
        // Calculate the total height of the column of boxes
        const totalHeight = (boxHeight + gap) * 3;
    
        // Calculate the starting Y position to center the column on the screen
        const startY = (config.height - totalHeight);
    
        // Create three white square boxes and buttons
        for (let i = 0; i < 3; i++) {
            // Create a white square box
            this.add.rectangle(config.width / 2, startY + i * (boxHeight + gap), boxWidth, boxHeight, 0x000000);
            this.playButtons[i] = new PlayCharacterButton(
                this, 
                config.width / 2,
                startY + i * (boxHeight + gap) + 25, 
                'button01_unpressed', 
                'button01_pressed', 
                'play', 
                i + 1,
                this.startScene.bind(this, 'Game')
            );
            this.playButtons[i].setScale(0.4);

            this.deleteButtons[i] = new DeleteCharacterButton(
                this, 
                config.width / 2,
                startY + i * (boxHeight + gap) + 60, 
                'button01_unpressed', 
                'button01_pressed', 
                'delete',
                i + 1
            );
            this.deleteButtons[i].setScale(0.4);
        };
    };
    
    
    /******************************
     * Function to help start the
     * game when the user clicks on
     * the 'play' button.
     ******************************/
    startScene(targetScene) {
        this.scene.start(targetScene);
    };

};