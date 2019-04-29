class PauseMenu extends Phaser.Scene{
  constructor(){
    super('pause');
    this.paused = false;
  }
  create(data){
    //super.create();
    this.mainScene = data.mainScene;
    this.gameOver = false;
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
    var rect = new Phaser.Geom.Rectangle(0, 0, 4000, 4000);
    this.background = graphics.fillRectShape(rect).setAlpha(0).setScrollFactor(0);
    this.pausedText = this.add.text(this.game.config.width/2 - 46, 500, 'PAUSED', {
      fontSize:150,
      color:'#d9a066',
      align:'centre'
    }).setOrigin(0.5)
    .setShadow(8, 8, "#663931", 2, false, true)
    .setAlpha(0);
    this.gameOverText = this.add.text(this.game.config.width/2 - 46, 500, 'GAME OVER', {
      fontSize:150,
      color:'#d9a066',
      align:'centre'
    }).setOrigin(0.5)
    .setShadow(8, 8, "#663931", 2, false, true)
    .setAlpha(0);


    this.coins = this.add.text(this.game.config.width/2 + 50,50,"COINS:",{
      fontSize:50,
      color:'#d9a066',
      align:'left'
    }).setOrigin(0,0.5)
    .setShadow(8, 8, "#663931", 2, false, true)
    .setAlpha(1);
    this.hearts = this.add.text(this.game.config.width/2 - 70,50,"HEARTS:",{
      fontSize:50,
      color:'#d9a066',
      align:'left'
    }).setOrigin(0,0.5)
    .setShadow(8, 8, "#663931", 2, false, true)
    .setAlpha(1);

    this.add.image(this.coins.x - 30,this.coins.y,"coin",null).setScale(2);
    this.add.image(this.hearts.x - 30,this.hearts.y,"heart",null).setScale(2);
  }
  update(){

    this.coins.text = this.mainScene.infoData.coins;
    if (this.mainScene.player) {
      this.hearts.text = this.mainScene.player.health;
    }
    if (this.mainScene.gameOver == true && this.gameOver == false) {
      this.endGame();
      this.gameOver = true;
    }

  }

  endGame(){
    this.pauseBTN.x = -1000;
    this.mainScene.scene.pause();
    this.background.setAlpha(1);
    this.gameOverText.setAlpha(1);

  }

  togglePause(){
    if (this.paused == false) {
      this.paused = true;
      this.background.setAlpha(0.5);
      this.pausedText.setAlpha(1);
      this.mainScene.scene.pause();
      for (var i = 0; i < this.mainScene.enemies.length; i++) {
        this.mainScene.enemies[i].pause();
      }

    } else if (this.paused == true) {
      this.paused = false;
      this.background.setAlpha(0);
      this.pausedText.setAlpha(0);
      this.mainScene.scene.resume();
      for (var i = 0; i < this.mainScene.enemies.length; i++) {
        this.mainScene.enemies[i].unPause();
      }
    }
    console.log(this.paused);
  }
}
