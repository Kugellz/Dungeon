class MenuScene extends Phaser.Scene{
  constructor(){
    super();
  }
  preload(){
    this.load.image('button','assets/button.png');
    this.load.image('Title','assets/Title.png');
    this.load.image('StartScreen','assets/StartScreen.png');
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

  }
  create(){
    var bg = this.add.image(this.game.config.width/2 - 23, this.game.config.height/2 - 250, 'StartScreen', null).setScale(10);
    var start = this.matter.add.image(this.game.config.width/2 - 46, 700, 'button', null).setScale(8);
    start.setInteractive();
    start.once('pointerup',function(){
      console.log("buttonclicked");
      this.scene.start('base');
    },this);
    var title = this.matter.add.image(this.game.config.width/2 - 46, 300, 'Title', null).setScale(14);


    //GOOGLE fontSize
    var add = this.add;
    var game = this.game;
    WebFont.load({
        google: {
            families: [ 'Freckle Face', 'VT323' ]
        },
        active: function ()
        {
          //START BUTTON
          add.text(start.x, start.y, 'START', {
            fontFamily: 'VT323',
            fontSize:150,
            color:'#d9a066',
            align:'centre'
          })
          .setOrigin(0.5)
          .setShadow(8, 8, "#663931", 2, false, true);
          //TITLE
          add.text(title.x, title.y, 'CHAINFLAIL', {
            fontFamily: 'VT323',
            fontSize:200,
            color:'#d9a066',
            align:'centre'
          })
          .setOrigin(0.5)
          .setShadow(8, 8, "#663931", 2, false, true);
        }
    });



    //console.log(this.game.config.width);


  }
  update(){

  }
}
