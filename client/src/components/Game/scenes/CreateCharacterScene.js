import Phaser from 'phaser';
import UiButton from '../classes/UiButton';
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

        // Retrieve character slot from local storage.
        const slot = parseInt(localStorage.getItem('characterSlot'));

        // Check if the slot is a valid number.
        if (!isNaN(slot) && slot >= 1 && slot <= 3) {
            console.log('Character slot:', slot);
            // Your other code for creating a character goes here.
        } else {
            // Output message to console when something goes wrong for debugging purposes only.
            console.log("Error Creating Character: Invalid character slot number.");
        }

        // Draw a white square in approx. the middle of the screen for the character to be displayed on.
        const square = this.add.graphics();
        square.fillStyle(0xffffff, 1);
        square.fillRect(config.width / 2, config.height / 2 - 175, 250, 250);

        // Add a image of the character to the screen inside the white square.
        const characterFrameNumber = 0;
        const character = this.add.image(config.width / 2 + 125, config.height / 2 - 50, 'human01', characterFrameNumber);
        character.setOrigin(0.5);
        character.setScale(2);

        // Add a image of the hairstyle to the screen inside the white square on the character image.
        const hairstyleImage = this.add.image(config.width / 2 + 125, config.height / 2 - 50, 'hairstyle01', 0);
        hairstyleImage.setOrigin(0.5);
        hairstyleImage.setScale(2);

        // Add a label for the character name input field.
        this.add.text(((config.width/2) - 400), 90, 'Enter Character Name:', { fontSize: '24px', fill: '#fff' });

        // Create character name input field.
        const characterName = this.add.dom(config.width/2, 100).createFromHTML('<input type="text" name="nameField" id="nameField">');

        // Set values to created dom element for styling.
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

        // Add a label for the gender selection.
        this.add.text(config.width / 2 + 350, config.height / 2 - 175, 'Gender:', { fontSize: '24px', fill: '#fff' });

        // Create radio buttons for gender selection.
        const maleRadioButton = this.add.dom(config.width / 2 + 380, config.height / 2 - 125).createFromHTML('<input type="radio" name="gender" id="maleRadio" value="male" checked><label for="maleRadio" style="font-family: Arial, sans-serif; color: #fff;">Male</label>');
        const femaleRadioButton = this.add.dom(config.width / 2 + 480, config.height / 2 - 125).createFromHTML('<input type="radio" name="gender" id="femaleRadio" value="female"><label for="femaleRadio" style="font-family: Arial, sans-serif; color: #fff;">Female</label>');

        // Set values to created dom elements for styling.
        maleRadioButton.setOrigin(0.5, 0.5);
        femaleRadioButton.setOrigin(0.5, 0.5);

        // Add a label for the race selection.
        this.add.text(config.width / 2 + 350, config.height / 2 - 75, 'Race:', { fontSize: '24px', fill: '#fff' });

        // Create radio buttons for race selection.
        const humanRadioButton = this.add.dom(config.width / 2 + 380, config.height / 2 - 25).createFromHTML('<input type="radio" name="race" id="humanRadio" value="human" checked><label for="humanRadio" style="font-family: Arial, sans-serif; color: #fff;">Human</label>');
        const demonRadioButton = this.add.dom(config.width / 2 + 480, config.height / 2 - 25).createFromHTML('<input type="radio" name="race" id="demonRadio" value="demon"><label for="demonRadio" style="font-family: Arial, sans-serif; color: #fff;">Demon</label>');
        const goblinRadioButton = this.add.dom(config.width / 2 + 580, config.height / 2 - 25).createFromHTML('<input type="radio" name="race" id="goblinRadio" value="goblin"><label for="goblinRadio" style="font-family: Arial, sans-serif; color: #fff;">Goblin</label>');

        // Set values to created dom elements for styling.
        humanRadioButton.setOrigin(0.5, 0.5);
        demonRadioButton.setOrigin(0.5, 0.5);
        goblinRadioButton.setOrigin(0.5, 0.5);


       /*****************************************************************************************/
        // NEW CODE - Implementing the character hairstyling customization options through the UI.
        /*****************************************************************************************/
        

        // // Add a label for the hairstyle selection.
        // this.add.text(config.width / 2 + 350, config.height / 2 + 25, 'Hairstyle:', { fontSize: '24px', fill: '#fff' });

        // // Add a image of the hairstyle to the screen inside the white square on the character image.
        // const hairstyleImages = ['hairstyle01', 'hairstyle02', 'hairstyle03', 'hairstyle04', 'hairstyle05', 'hairstyle06', 'hairstyle07', 'hairstyle08', 'hairstyle09']; // Add more hairstyles as needed
        // let currentHairstyleIndex = 0;

        // const updateHairstyle = () => {
        //     this.hairstyle.setTexture(hairstyleImages[currentHairstyleIndex]);
        // };

        // this.hairstyle = this.add.image(config.width / 2 + 125, config.height / 2 - 50, hairstyleImages[currentHairstyleIndex], 0);
        // this.hairstyle.setOrigin(0.5);
        // this.hairstyle.setScale(2);

        // const leftHairstyleButton = new UiButton(this, config.width / 2 + 390, config.height / 2 + 75, 'button02_left_pressed', 'button02_left_unpressed', '', () => {
        //     console.log('Left Hairstyle Button Pressed');

        //     currentHairstyleIndex = (currentHairstyleIndex - 1 + hairstyleImages.length) % hairstyleImages.length;
        //     updateHairstyle();
        // });

        // leftHairstyleButton.setScale(0.6);

        // const rightHairStyleButton = new UiButton(this, config.width / 2 + 440, config.height / 2 + 75, 'button02_right_pressed', 'button02_right_unpressed', '', () => {
        //     console.log('Right Hairstyle Button Pressed');

        //     currentHairstyleIndex = (currentHairstyleIndex + 1) % hairstyleImages.length;
        //     updateHairstyle();
        // });

        // rightHairStyleButton.setScale(0.6);

        /********************************************************************************************************************************/
        //TODO: Fix issue of destorying and creating the hairstyle image to allow the player to choose an otion with no hairstyle selected.
        
        // Add a label for the hairstyle selection.
        this.add.text(config.width / 2 + 350, config.height / 2 + 25, 'Hairstyle:', { fontSize: '24px', fill: '#fff' });

        // Add an image of the hairstyle to the screen inside the white square on the character image.
        const hairstyleImages = ['hairstyle01', 'hairstyle02', 'hairstyle03', 'hairstyle04', 'hairstyle05', 'hairstyle06', 'hairstyle07', 'hairstyle08', 'hairstyle09']; // Add more hairstyles as needed
        let currentHairstyleIndex = 0;
        let hairstyle = this.add.image(config.width / 2 + 125, config.height / 2 - 50, hairstyleImages[currentHairstyleIndex], 0);
        hairstyle.setOrigin(0.5);
        hairstyle.setScale(2);

        const updateHairstyle = () => {
            if (currentHairstyleIndex === 10) {
                // Destroy the hairstyle image at index zero
                hairstyle.destroy();
                hairstyle = undefined;
            } else {
                // Create or add the image again when the index is above zero
                if (!hairstyle) {
                    hairstyle = this.add.image(config.width / 2 + 125, config.height / 2 - 50, hairstyleImages[currentHairstyleIndex], 0);
                    hairstyle.setOrigin(0.5);
                    hairstyle.setScale(2);
                } else {
                    // Set texture for other indices
                    hairstyle.setTexture(hairstyleImages[currentHairstyleIndex]);
                }
            }
        };

        const leftHairstyleButton = new UiButton(this, config.width / 2 + 390, config.height / 2 + 75, 'button02_left_pressed', 'button02_left_unpressed', '', () => {
            console.log('Left Hairstyle Button Pressed');
            currentHairstyleIndex = (currentHairstyleIndex - 1 + hairstyleImages.length) % hairstyleImages.length;
            updateHairstyle();
        });

        leftHairstyleButton.setScale(0.6);

        const rightHairStyleButton = new UiButton(this, config.width / 2 + 440, config.height / 2 + 75, 'button02_right_pressed', 'button02_right_unpressed', '', () => {
            console.log('Right Hairstyle Button Pressed');
            currentHairstyleIndex = (currentHairstyleIndex + 1) % hairstyleImages.length;
            updateHairstyle();
        });

        rightHairStyleButton.setScale(0.6);


        /*****************************************************************************************/
        // NEW CODE - Implementing the character hairstyling customization options through the UI.
        /*****************************************************************************************/


        // Add text for the 'create character' button.
        const createButton = this.add.text(680, config.height - 200, 'Create Character', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        
        // Set button as interactive for the user.
        createButton.setInteractive({ useHandCursor: true });

        /************************************
         * Create button on click event
         ************************************/
        createButton.on('pointerdown', () => {

            // Handle the character creation logic here.
            const name = characterName.getChildByName('nameField').value;

            // Output the character name to the console for debugging purposes.
            console.log('Character Name:', name);

            //TODO: Add logic to create the character in the game using the entered name

            //TODO: For example, you can pass the characterName to another scene to create the character.
            
            //TODO: this.scene.start('YourGameScene', { characterName });
        });

        // Add text for the 'go back' button.
        const backButton = this.add.text(900, config.height - 200, 'Go Back', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        
        // Make button interactive for the user.
        backButton.setInteractive({ useHandCursor: true });

        /************************************
        * Back button on click event
        *************************************/
        backButton.on('pointerdown', () => {


            // TODO: Add logic to create the character in the game using the entered name
            
            // TODO: For example, you can pass the characterName to another scene to create the character.

            // Stop the current scene before switching.
            this.scene.stop('CreateCharacter');

            // Switch back to the "SelectCharacter" scene.
            this.scene.start('SelectCharacter');
        });

    };
};