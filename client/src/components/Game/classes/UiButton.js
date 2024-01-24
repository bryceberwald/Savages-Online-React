import Phaser from 'phaser';

/****************************************
* UiButton class
****************************************/
export default class UiButton extends Phaser.GameObjects.Container {

    /*******************************
    * Constructor is called at the
    * initiation of UiButton class.
    *******************************/
    constructor(scene, x, y, key, hoverKey, text, targetCallback) {
        super(scene, x, y);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.key = key;
        this.hoverKey = hoverKey;
        this.text = text;
        this.targetCallback = targetCallback;
        this.createButton();
        this.scene.add.existing(this);
    };
    
    /******************************
    * Function is used to create
    * a button using the parameters
    * passed to the constructor.
    * This function gets called in
    * the constructor.
    ******************************/
    createButton() {

        // Add button displaying unpressed image file
        this.button = this.scene.add.image(0, 0, this.key);

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
            this.targetCallback();
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