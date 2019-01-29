class SceneA extends Phaser.Scene {
  constructor() {
    super();
    console.log("ITS WORKING");
    this.cursors;
  }
  preload(){
    this.load.spritesheet('knight', 'assets/knight.png',{ frameWidth: 16, frameHeight: 18 });
    this.load.image('ball','assets/ball.png');
  }
  create(){
    this.matter.world.setBounds(0, 0, 800, 600);
    this.playerColCat = this.matter.world.nextCategory();
    this.maceColCat = this.matter.world.nextCategory();
    this.player = new Player(this,300,400);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('knight', { start: 0, end: 2 }),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('knight', { start: 3, end: 6 }),
        frameRate: 8,
        repeat: -1
    });
  }
  update(){
    this.player.update();
  }



}


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#256413',
    parent: 'phaser-example',
    pixelArt: true,
    physics: {
        default: 'matter',
        matter: {
          gravity: {
          y: 0
          },
        debug: false
      }
    },
    scene: [SceneA]
};

var game = new Phaser.Game(config);
