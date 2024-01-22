import Phaser from 'phaser';
import { config } from '../config/configuration';

export default class UiCustomButton extends Phaser.GameObjects.Container {
    static hairstyleSpritesheet = 1;

    constructor(scene, x, y, key, hoverKey, direction) {
        super(scene, x, y);

        this.defaultState = this.createButton(key);
        this.hoverState = this.createButton(hoverKey);

        this.add(this.defaultState);

        this.defaultState.setVisible(true);
        this.hoverState.setVisible(false);

        this.setInteractive();
        this.on('pointerover', this.onHover, this);
        this.on('pointerout', this.onOut, this);

        scene.add.existing(this);

        this.direction = direction;
    }

    createButton(key) {
        const button = new Phaser.GameObjects.Sprite(this.scene, 0, 0, key).setOrigin(0.5);
        button.setInteractive({ useHandCursor: true });

        this.setSize(button.width, button.height);

        button.on('pointerdown', () => {
            // Example: Change the static variable for all instances
            if (this.direction === 'left' && UiCustomButton.hairstyleSpritesheet <= 1) {
                UiCustomButton.hairstyleSpritesheet = 9;
            } else if (this.direction === 'left' && UiCustomButton.hairstyleSpritesheet > 0) {
                UiCustomButton.hairstyleSpritesheet -= 1;
            }

            if(this.direction === 'right' && UiCustomButton.hairstyleSpritesheet >= 9) {
                UiCustomButton.hairstyleSpritesheet = 1;
            } else if (this.direction === 'right' && UiCustomButton.hairstyleSpritesheet < 9) {
                UiCustomButton.hairstyleSpritesheet += 1;
            }

            console.log('Variable changed:', UiCustomButton.hairstyleSpritesheet);

            // Update the displayed hairstyle image for all instances
            this.updateHairstyleImage();
        });

        return button;
    }

    onHover() {
        this.defaultState.setVisible(false);
        this.hoverState.setVisible(true);
    }

    onOut() {
        this.defaultState.setVisible(true);
        this.hoverState.setVisible(false);
    }

    updateHairstyleImage() {
        // Access the CreateCharacterScene and update the hairstyleSpritesheet variable
        const createCharacterScene = this.scene.scene.get('CreateCharacter');
    
        // Update the displayed hairstyle image for all instances
        const hairstyleFrameNumber = 0;
        const hairstyle = createCharacterScene.add.image(
            config.width / 2 + 125,
            config.height / 2 - 50,
            `hairstyle0${UiCustomButton.hairstyleSpritesheet}`,
            hairstyleFrameNumber
        );
    
        hairstyle.setOrigin(0.5);
        hairstyle.setScale(2);
    
        if (UiCustomButton.hairstyleSpritesheet <= 0) {
            hairstyle.destroy();
        }
    }
    
}