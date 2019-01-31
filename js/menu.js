class MenuScene extends Phaser.Scene{
  constructor(){
    super();
  }
  preload(){
    this.load.image('button','assets/button.png');

  }
  create(){
    var button = this.matter.add.image(540, 300, 'button', null).setScale(10);
    button.setInteractive();
    button.once('pointerup',function(){
      console.log("buttonclicked");
      this.scene.start('base');
    },this);

  }
  update(){

  }
}
