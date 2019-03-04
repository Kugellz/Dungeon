class BasePlayScene extends Phaser.Scene{
  constructor() {
    super('base');
    this.name = 'base';
    this.tileDataKey;
    this.tileDataSource;
    this.rooms = [];

    console.log("ITS WORKING");
    this.cursors;
  }
  preload(){
    this.load.spritesheet('knight', 'assets/knight-2.png',{ frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('enemy', 'assets/Enemy.png',{ frameWidth: 24, frameHeight: 24 });
    this.load.image('ball','assets/ball.png');
    this.load.image('tilesheet','assets/tilesheet.png');
    this.load.tilemapTiledJSON('room1','assets/Level1.json');
    //this.load.tilemapTiledJSON('room2','assets/Level2.json');
    //this.load.tilemapTiledJSON('room3','assets/Level3.json');
  }
  create(){
    console.log(this);

    //this.matter.world.createDebugGraphic();
    this.createRooms(0,0);

    //this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
    //this.matter.world.setBounds(0,0,this.map.widthInPixels * 2.5,this.map.heightInPixels * 2.5);
    this.player = new Player(this,300,400);
    this.playerColCat = this.matter.world.nextCategory();
    this.maceColCat = this.matter.world.nextCategory();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('knight', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('knight', { start: 4, end: 8 }),
        frameRate: 8,
        repeat: -1
    });

    //Collisions
    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {



    });

    this.cameras.main.startFollow(this.player.sprite,0.2,0.2);
    this.cameras.main.followOffset.y = -300;
    this.cameras.main.setZoom(1);
  }
  update(){
    this.player.update();
  }

  createRooms(x,y){
    this.rooms[0] = new BaseRoom(0,0,16,16,[1,0,1,1],'room1','assets/Level1.json',this);
    this.rooms[0].create();
  }
}


var config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 2280,
    backgroundColor: '#170E4D',
    parent: 'phaser-example',
    pixelArt: true,
    physics: {
        default: 'matter',
        matter: {
          gravity: {
          y: 0
          },
        debug: true
      }
    },
    scene: [MenuScene,BasePlayScene],
    //fps:30
};

var game = new Phaser.Game(config);
