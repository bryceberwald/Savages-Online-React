import Phaser from 'phaser';
/**************************************************
* UiScene class
*************************************************/
export default class UiScene extends Phaser.Scene {
    constructor() {
        super('Ui');
        this.chatMessage = '';
        this.isChatMessageSent = false;
    };

    preload(){
        this.loadPlugins();
    };
      
    create() {
        this.setupUiElements();
        this.createPlayerChat();
    };

    update(){
        if(this.isChatMessageSent){
            console.log("Enter key released.");
        };

        if(this.inputText.node.value === ""){
            this.isChatMessageSent = false;
        };
    };

    loadPlugins() {
        this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
    };
  
    setupUiElements() {
        this.background = this.add.image(0, 0, 'ingame_background');
        this.background.setOrigin(0, 0);
        //this.background.setScrollFactor(0);
    };

    createPlayerChat() {
        // Add space bar to input keyboard keys to allow adding 'whitespace' in users chat message 
        const inputKeys = this.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        });

        // Create a input area for the user to type a chat message
        this.inputText = this.add.rexInputText(60, 480, 1160, 20, { 
            placeholder: "Type chat message here...",
            text: this.chatMessage, 
            fontSize: '16px', 
            backgroundColor: '#808080 ',
            type: 'text'
        });

        // Set the users chat input area's origin to (0,0) for positioning
        this.inputText.setOrigin(0,0);

        // Set the users chat input area to be active initially
        this.inputText.node.focus();

        // Check if the user has pressed the SPACE key
        this.input.keyboard.on('keydown-SPACE', () => {
            if (inputKeys.space.isDown) {
                this.inputText.node.value = this.inputText.node.value + " ";
                //this.chatMessage = this.inputText.node.value;
                //console.log(this.chatMessage);
            };
        });

        // Check if the user has pressed the ENTER key
        this.input.keyboard.on('keydown-ENTER', () => {
            if(inputKeys.enter.isDown && this.inputText.node.value !== ""){
                //console.log("Enter key was pressed.");
                this.chatMessage = this.inputText.node.value;
                this.isChatMessageSent = true;
                this.events.emit('chat', { msg: this.chatMessage });
                this.inputText.node.value = "";
                //this.chatMessage = "";
            };
        });

    };

    getChatMessage(){
        return this.chatMessage;
    };

    setChatMessageEmpty(){
        this.chatMessage = "";
    };
};