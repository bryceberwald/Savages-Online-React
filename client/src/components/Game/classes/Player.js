import Phaser from 'phaser';
/**************************************************
* Player class
*************************************************/
export default class Player extends Phaser.Physics.Arcade.Image {

    /******************************
    * Constructor is called at the
    * initiation of Player class.
    ******************************/
    constructor(scene, x, y, key, socket) {
      super(scene, x, y);

      // Create a variable that holds the keyboard input
      this.cursors = this.scene.input.keyboard.createCursorKeys();

      // Create variables from constructor to be used within 'Player' class
      this.scene = scene;
      this.playerX = x;
      this.playerY = y;
      this.key = key;
      this.socket = socket;

      // Create a variable to hold players chat message
      this.chatMessage = "";

      // Set the initial frame of the sprite sheet being used
      this.frame = 0;

      // Set the velocity of how fast the player should move
      this.velocity = 500;

      // Set the origin for player image
      this.setOrigin(0.5, 0.5);

      // Resize the frame of the sprite sheet being used.
      this.setScale(2);

      // Set the player sprite sheet texture using the key & frame 
      this.setTexture(this.key, this.frame);

      // Enable world physics for the player to be used in GameScene 
      scene.physics.world.enable(this);

      // Add this player to the GameScene
      scene.add.existing(this);
    };

    /******************************
    * This function is used to 
    * update the player by the
    * scene it's called in.
    ******************************/
    update() {
      // Call the function created in 'Player' class to handle input keys
      this.handleInputKeys();

      // Update the player texture using the key & frame
      this.setTexture(this.key, this.frame);

      // Update chat message from the user
      this.chatMessage = this.uiscene.getChatMessage()

      // Output the chat message to the console
      if(this.chatMessage !== ""){
        this.displayChatMessage(this.chatMessage);
        this.socket.handleSocketEmitChatMessage(this.chatMessage);
      };

      // Update chat message to empty string after usage
      this.uiscene.setChatMessageEmpty();

      // Handle socketIO player position 'emit'
      this.socket.handleSocketEmitPlayerPosition(this.x, this.y, this.frame);
    };

    /******************************
    * This function gets called in
    * the player update() function.
    ******************************/
    handleInputKeys() {
      // Set the default/non-moving velocity of the player
      this.setVelocity(0);
      
      // Check to see if the player has moved
      if(this.cursors.left.isDown) {
        this.frame = 24;
        this.setVelocityX(-this.velocity);
        this.playerX -= this.velocity;
      } else if(this.cursors.right.isDown) {
        this.frame = 16;
        this.setVelocityX(this.velocity);
        this.playerX += this.velocity;
      } else if(this.cursors.up.isDown) {
        this.playerY -= this.velocity;
        this.frame = 8;
        this.setVelocityY(-this.velocity);
      } else if(this.cursors.down.isDown) {
        this.playerY += this.velocity;
        this.frame = 0;
        this.setVelocityY(this.velocity);
      };
 
    };

    /******************************
    * This function displays the
    * users chat message.
    ******************************/
    displayChatMessage(msg){
      console.log(msg);
    };

    /******************************
    * This function listens for
    * events that occur in the
    * UiScene to pass data back
    * and forth. This gets called
    * in GameScene.
    ******************************/
    setEventListeners(){
      this.uiscene.events.on('chat', this.onChatMessage);
    };

    /******************************
    * This function sets the ui
    * scene to be used by this
    * class. This gets called in
    * GameScene.
    ******************************/
    setUiScene(scene){
      this.uiscene = scene;
    };

    /******************************
    * This function is used by the
    * player class to help retrieve
    * the users chat message.
    ******************************/
    onChatMessage(msg) {
      this.chatMessage = msg;
    };
};