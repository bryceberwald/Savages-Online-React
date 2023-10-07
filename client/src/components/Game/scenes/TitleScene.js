import Phaser from 'phaser';
import UiLargeButton from '../classes/UiLargeButton';
import { config } from '../config/configuration';

/**************************************************
 * TitleScene class
 *************************************************/
export default class TitleScene extends Phaser.Scene {
    /******************************
     * Constructor is called at the
     * initiation of the TitleScene
     * class.
     ******************************/
    constructor() {
        super("Title");
    };

    /******************************
     * Function is called once when
     * TitleScene is active.
     ******************************/
    create() {
        // Add the pre game background image
        this.background = this.add.image(0, 0, 'pregame_background');
        
        // Scale the pre game background image to the size of users window
        this.background.setScale(
            (config.width / this.background.width) * 2, 
            (config.height / this.background.height) * 2
        );
        
        // Add title text to the screen with respect to users window size
        this.titleText = this.add.text(
            config.width / 2, 
            (config.height / 2) * 0.4, 
            'Savages-Online', 
            { fontSize: '48px', fill: '#fff' }
        );

        // Set game title text origin to 50% with respect to users window size
        this.titleText.setOrigin(0.5);
        
        // Create a 'Play Now' button below the title text with respect to users window size
        this.playGameButton = new UiLargeButton(
            this, 
            config.width / 2,
            config.height / 2, 
            'button01_unpressed', 
            'button01_pressed', 
            'Play Now', 
            this.startScene.bind(this, 'Game')
        );
        
        // Scale 'Play Now' button's width & height to 75%
        this.playGameButton.setScale(0.75);
    };
    
    /******************************
     * Function to help start the
     * game when the user clicks on
     * the 'Play Now' button.
     ******************************/
    startScene(targetScene) {
        this.scene.start(targetScene);
    };

};