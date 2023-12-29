import Phaser from 'phaser';
import { config } from '../config/configuration';

export default class CreateCharacterScene extends Phaser.Scene {
    constructor(scene, characterSlotNumber) {
        super('CreateCharacter');

        this.scene = scene;
        this.characterSlotNumber = characterSlotNumber;
    }

    create() {
        this.add.text(((config.width/2) - 400), 90, 'Enter Character Name:', { fontSize: '24px', fill: '#fff' });

        const characterName = this.add.dom(config.width/2, 100).createFromHTML('<input type="text" name="nameField" id="nameField">');

        characterName.getChildByName('nameField').style.width = '400px';
        characterName.setOrigin(0.5, 0.5);

        characterName.addListener('click');
        characterName.on('click', function (event) {

            if (event.target.name === 'nameField') {
                // Handle input field click event if needed
            };

        });

        // Create Character Button
        const createButton = this.add.text(680, config.height - 200, 'Create Character', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        
        createButton.setInteractive({ useHandCursor: true });
        createButton.on('pointerdown', () => {

            // Handle the character creation logic here
            const name = characterName.getChildByName('nameField').value;
            console.log('Character Name:', name);

            // Add logic to create the character in the game using the entered name
            // For example, you can pass the characterName to another scene to create the character.
            // this.scene.start('YourGameScene', { characterName });
        });

        // Create Character Button
        const backButton = this.add.text(900, config.height - 200, 'Go Back', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        
        backButton.setInteractive({ useHandCursor: true });
        backButton.on('pointerdown', () => {


            // Add logic to create the character in the game using the entered name
            // For example, you can pass the characterName to another scene to create the character.

            // Switch back to the "Character" scene
            this.scene.switch('Character');
        });

    };
};