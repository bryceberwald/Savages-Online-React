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

      // Create variables from constructor to be used within class.
      this.scene = scene;
      this.playerX = x;
      this.playerY = y;
      this.key = key;
      this.socket = socket;

      // Extract users data from local storage.
      const storedUser = localStorage.getItem('user');
      
      // Parse extracted data of storedUser from local storage.
      this.loginData = storedUser ? JSON.parse(storedUser) : null;

      // Display the username to the console for testing purposes.
      console.log(this.loginData);

      // Assign the users loginData to the player.
      this.username = this.loginData.username;
      this.x = this.loginData.character.x;
      this.y = this.loginData.character.y;
      this.frame = this.loginData.character.frame;
      this.level = this.loginData.character.level;

      // Create a object {} to valuable hold information.
      this.playerData = {
        username: this.username,
        x: this.x,
        y: this.y,
        frame: this.frame,
        level: this.level,
      };

      if(this.playerData){
        const data = this.playerData;
        data.x = this.x;
        data.y = this.y;
      }

      // Update the position of the player's username to follow the player
      this.playerDataText = this.scene.add.text(this.playerData.x - 20, this.playerData.y - 60, this.playerData.username);
      
      // Create a variable that holds the keyboard input
      this.cursors = this.scene.input.keyboard.createCursorKeys();

      // Create a variable to hold players chat message
      this.chatMessage = "";

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

      // Check if there's a chat message
      if(this.chatMessage !== ""){
        this.socket.handleSocketEmitChatMessage(this.chatMessage);
      };

        this.playerData.x = this.body.x;
        this.playerData.y = this.body.y;

        // this.playerDataText = this.scene.add.setPosition(this.body.x + 20, this.body.y - 60);


      // Check if there's a current chat text, if so have it follow the player.
      if(this.chatText){
        this.chatText.x = this.body.x + 65;
        this.chatText.y = this.body.y + 25;
      };

      // Update chat message to empty string after usage
      this.uiscene.setChatMessageEmpty();

      // Handle socketIO player position 'emit'
      this.socket.handleSocketEmitPlayerPosition(this.x, this.y, this.frame, this.username);
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

    /****************************
     * displayChatMessage() fn - 
     * displays the chat message 
     * above the player.
     ****************************/
    displayChatMessage(message) {
      // Ensure there is a message to display
      if (message && message !== "") {
        // Create a text label above the player
        if (!this.chatText) {
          this.chatText = this.scene.add.text(this.x, this.y - 40, message, {
            fontSize: "16px",
            fontFamily: "Arial",
            fill: "#ffffff",
            backgroundColor: "#000000",
            padding: {
              x: 5,
              y: 5
            }
          }).setOrigin(0.5, 1); // Set the origin to the bottom center
        } else {
          // Update existing text with the new message
          this.chatText.setText(message);
        };

        // Set a timer to remove the text after a certain duration (e.g., 3000 milliseconds)
        this.scene.time.delayedCall(3000, () => {
          if (this.chatText) {
            this.chatText.destroy();
            this.chatText = null;
          };
        });
      };
    };

    /******************************
    * This function will update the
    * players chat location if the
    * chat message exists.
    ******************************/
    updateChatMessagePosition(x, y){
      if(this.chatText){
        this.chatText.x = x;
        this.chatText.y = y - 40;
      };
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