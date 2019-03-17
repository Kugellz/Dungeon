class BasePlayScene extends Phaser.Scene{
  constructor() {
    super('base');
    this.name = 'base';
    this.tileDataKey;
    this.tileDataSource;
    this.dungeon;
    this.enemies = [];

    console.log("ITS WORKING");
    this.cursors;
  }
  preload(){
    this.load.spritesheet('knight', 'assets/knight-2.png',{ frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('enemy', 'assets/Enemy.png',{ frameWidth: 24, frameHeight: 24 });
    this.load.image('ball','assets/ball.png');
    this.load.image('spikedBall','assets/spikeBall.png');
    this.load.image('tilesheet','assets/tilesheet.png');
    this.load.tilemapTiledJSON('room1','assets/Level1.json');
    //this.load.tilemapTiledJSON('room2','assets/Level2.json');
    //this.load.tilemapTiledJSON('room3','assets/Level3.json');
  }
  create(){
    console.log(this);

    //this.matter.world.createDebugGraphic();
    this.createDungeon(0,0);


    console.log(this.dungeon.spawn.x);
    this.player = new Player(this,this.dungeon.spawn.x,this.dungeon.spawn.y);




    this.playerColCat = this.matter.world.nextCategory();
    this.maceColCat = this.matter.world.nextCategory();

    this.cursors = this.input.keyboard.createCursorKeys();
    //ANIMATION LOADER
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
    this.anims.create({
        key: 'enemyIdle',
        frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'enemyWalk',
        frames: this.anims.generateFrameNumbers('enemy', { start: 6, end: 9 }),
        frameRate: 6,
        repeat: -1
    });

    //Collisions
    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
      //console.log(bodyA);
      var nameA = bodyA.gameObject.name;
      var nameB = bodyB.gameObject.name;
      if ((nameA == "Enemy" && nameB == "Ball")) {
        console.log("attempting damage from: " + nameB);
        if (this.player) {
          this.player.damage(bodyA.gameObject.parent);
        }

      } else if((nameA == "Ball" && nameB == "Enemy")){
        console.log("attempting damage from: " + nameA);
      }

    });

    if (this.enemies) {
      for (var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].setPlayer();
      }
    }

    this.cameras.main.startFollow(this.player.sprite,0.2,0.2);
    this.cameras.main.followOffset.y = -250;
    this.cameras.main.setZoom(1);
  }

  update(){
    if (this.player) {
      this.player.update();
    }
    if (this.enemies) {
      for (var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].update();
      }
    }
  }
  createDungeon(x,y){
    this.dungeon = new dungeon(11,15,4,1,this);
    this.dungeon.create();
  }


}


var config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 2280,
    scale: {
      mode:Phaser.Scale.RESIZE,
      autoCenter : Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
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
