class BasePlayScene extends Phaser.Scene{
  constructor() {
    super('base');
    this.name = 'base';
    this.tileDataKey;
    this.tileDataSource;

    console.log("ITS WORKING");
    this.cursors;
  }
  preload(){
    this.tileDataKey = 'test';
    this.tileDataSource = 'assets/testmap.json';
    this.load.spritesheet('knight', 'assets/knight.png',{ frameWidth: 16, frameHeight: 18 });
    this.load.image('ball','assets/ball.png');
    this.load.image('tilesheet','assets/tilesheet.png');
    this.load.tilemapTiledJSON(this.tileDataKey,this.tileDataSource);
  }
  create(){
    this.map = this.make.tilemap({key:this.tileDataKey});
    var tileset = this.map.addTilesetImage('tilesheet');
    //this.ground = this.map.createStaticLayer('ground',tileset,0,0).setScale(2.5);
    this.walls = this.map.createDynamicLayer('collision',tileset,0,0).setScale(2.5);
    //this.tops = this.map.createStaticLayer('walltops',tileset,0,0).setScale(2.5);


    this.walls.setCollisionByProperty({collides:true});
    this.matter.world.convertTilemapLayer(this.walls);
    this.matter.world.createDebugGraphic();


    //this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
    this.matter.world.setBounds(0,0,this.map.widthInPixels * 2.5,this.map.heightInPixels * 2.5);
    this.player = new Player(this,300,400);
    this.playerColCat = this.matter.world.nextCategory();
    this.maceColCat = this.matter.world.nextCategory();

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
    this.cameras.main.startFollow(this.player.sprite,0.2,0.2);
    this.cameras.main.setZoom(2);
  }
  update(){
    this.player.update();
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
        debug: false
      }
    },
    scene: [MenuScene,BasePlayScene],
    //fps:30
};

var game = new Phaser.Game(config);
