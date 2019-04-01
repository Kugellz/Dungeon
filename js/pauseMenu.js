class PauseMenu extends Phaser.Scene{
  constructor(){
    super('pause');
    this.paused = false;
  }
  create(data){
    //super.create();
    this.mainScene = data.mainScene;
    console.log("PAUSE SCENE LOADED");
    //PAUSE button
    this.pauseBTN = this.matter.add.image(this.game.config.width - 180, 70, 'pause', null).setScale(10).setScrollFactor(0);
    this.pauseBTN.depth = 10;
    this.pauseBTN.setInteractive();
    this.pauseBTN.on('pointerup',function(){
      console.log("toggling pause");
      this.togglePause();
    },this);
    var graphics = this.add.graphics({ fillStyle: { color: 0x00000 } });
    var rect = new Phaser.Geom.Rectangle(0, 0, 1000, 3000);
    this.background = graphics.fillRectShape(rect).setAlpha(0);;
    this.pausedText = this.add.text(this.game.config.width/2 - 46, 500, 'PAUSED', {
      fontSize:150,
      color:'#d9a066',
      align:'centre'
    }).setOrigin(0.5)
    .setShadow(8, 8, "#663931", 2, false, true)
    .setAlpha(0);

  }
  togglePause(){
    if (this.paused == false) {
      this.paused = true;
      this.background.setAlpha(0.5);
      this.pausedText.setAlpha(1);
      this.mainScene.scene.pause();
      for (var i = 0; i < this.mainScene.enemies.length; i++) {
        this.enemies[i].pause();
      }

    } else if (this.paused == true) {
      this.paused = false;
      this.background.setAlpha(0);
      this.pausedText.setAlpha(0);
      this.mainScene.scene.resume();
      for (var i = 0; i < this.mainScene.enemies.length; i++) {
        this.enemies[i].unPause();
      }
    }
    console.log(this.paused);
  }
}
