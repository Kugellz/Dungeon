class BasePlayScene extends Phaser.Scene{
  constructor() {
    super('base');
    this.name = 'base';
    this.tileDataKey;
    this.tileDataSource;
    this.dungeon;
    this.enemies = [];
    this.coins = [];
    this.paused = false;
    this.shader = 'warp';
    this.shader2 = 'Transparent';
    this.cursors;
    console.log("ITS WORKING");

    this.infoData = {
      coins:0,
      kills:0,
      time:0
    }
  }
  preload(){
    this.load.spritesheet('knight', 'assets/knight-2.png',{ frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('enemy', 'assets/Enemy.png',{ frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('dungeonKing', 'assets/DungeonKing.png',{ frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet('coin', 'assets/coin.png',{ frameWidth: 16, frameHeight: 16 });
    this.load.image('ball','assets/ball.png');
    this.load.image('door','assets/Door.png');
    this.load.image('spikedBall','assets/spikeBall.png');
    this.load.image('tilesheet', 'assets/tilesheet.png');
    this.load.image('exit', 'assets/exit.png');
    this.load.image('pause', 'assets/pause.png');
    this.load.image('shadow', 'assets/shadow.png');
    this.load.tilemapTiledJSON('room1','assets/Level1.json');
    //this.load.tilemapTiledJSON('room2','assets/Level2.json');
    //this.load.tilemapTiledJSON('room3','assets/Level3.json');
  }
  create(){
    console.log(this.scene.scene.matter.world);
    //this.matter.world.createDebugGraphic();
    this.createDungeon(0,0);
    //console.log(this.dungeon.exit.x + ", " + this.dungeon.exit.y);
    this.player = new Player(this,this.dungeon.spawn.x,this.dungeon.spawn.y);

    this.coins = this.add.group({
      classType: Coin,
      maxSize: 50,
      runChildUpdate:true,
      config:{
        scene:this.scene
      }
    });

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

    //boss
    this.anims.create({
        key: 'bossIdle',
        frames: this.anims.generateFrameNumbers('dungeonKing', { start: 1, end: 6 }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'bossWalk',
        frames: this.anims.generateFrameNumbers('dungeonKing', { start: 8, end: 11 }),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'coin',
        frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 8 }),
        frameRate: 24,
        repeat: -1
    });

    //Collisions
    this.matter.world.on('collisionstart', this.Collision,this);

    //CAMERA SETUP

    this.cameras.main.startFollow(this.player.sprite,0.8,0.8);
    this.cameras.main.followOffset.y = -250;
    this.cameras.main.setZoom(1);
    this.cameras.main.setAlpha(1);
    this.miniCam = this.cameras.add(0, 0, 1000, 1000);
    this.miniCam.setBackgroundColor('rgba(0,0,0,0)');
    this.miniCam.setAlpha(1);
    this.miniCam.ignore([this.player.graphics]);
    this.miniCam.setZoom(0.3).startFollow(this.player.sprite,0.2,0.2);

    this.createShaders();

    this.scene.add('pauseScene',PauseMenu,true,{mainScene:this});
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
    if (this.coins) {
      for (var i = 0; i < this.coins.length; i++) {
        this.coins[i].update();
      }
    }
    if (this.boss) {
      this.boss.update();
    }
    this.pipeline.setFloat1('uTime', this.pipeTick); //A tickrate that increases by 0.01 per frame. Could also use update's own time parameter.
    this.pipeTick += 0.01;
  }

  Collision(event, bodyA, bodyB) {
  //console.log(bodyA.label + ", " + bodyB.label);
    if (bodyA && bodyB) {

      var nameA = bodyA.label;
      var nameB = bodyB.label;
      if ((nameA == "Enemy" && nameB == "Ball")) {
        //console.log("attempting damage from: " + nameB);
        if (this.player) {
          this.player.damage(bodyA.gameObject.parent);
        }
      } else if((nameA == "Ball" && nameB == "Enemy")){
        //console.log("attempting damage from: " + nameB);
        if (this.player) {
          this.player.damage(bodyB.gameObject.parent);
        }

      } else if (nameA == "room" && nameB == "Player") {
        //console.log("ROOM DETECT")
        bodyA.parent.playerEntered();
      } else if (nameB == "room" && nameA == "Player") {   //ROOOOMSSS
        //console.log("ROOM DETECT")
        bodyB.parent.playerEntered();
      } else if(nameA == "Exit" && nameB == "Player" || nameB == "Exit" && nameA == "Player") {
        this.startFade();
      } else if (nameA == "Coin" && nameB == "Player") {  //COINSSSSS
        bodyA.gameObject.destroy();
        this.infoData.coins++;
        console.log("COIN GET");
      } else if (nameB == "Coin" && nameA == "Player") {
        bodyB.gameObject.destroy();
        this.infoData.coins++;
        console.log("COIN GET");
      }

      if ((nameA == "Ball" && nameB == "Enemy") || (nameB == "Ball" && nameA == "Enemy")) {
        var power = this.player.mace.maceVector.length();
        //.log(power);
        if("vibrate" in window.navigator && power > 5) {
          //console.log("VIBRATED");
          window.navigator.vibrate([power*2,10,power]);
        }
      }
    }




  }
  createDungeon(x,y){
    this.dungeon = new dungeon(11,15,4,1,this);
    this.dungeon.create();
    this.createStairs();
  }

  createStairs(){
    this.exit = this.matter.add.sprite(this.dungeon.exit.x, this.dungeon.exit.y, 'exit', null, null)
        .setScale(5)
        .setFixedRotation()
        .setStatic(true)
        .setSensor(true);
    this.exit.depth = 1;
    this.exit.body.label = "Exit";
  }

  startFade(){
    this.cameras.main.fadeOut(500,0,0,0,false);
    this.player.disableTouch();
    this.player.sprite.setVelocity(0,0);
    this.player.mace.head.setVelocity(0,0);
    console.log("FADING OUT");

    this.cameras.main.once('camerafadeoutcomplete', function (camera) {
      this.player.sprite.setVelocity(0,0);
      this.player.mace.head.setVelocity(0,0);
      this.player.changePlayerPos(this.dungeon.bossRoom.x,this.dungeon.bossRoom.y + 1000);
      this.cameras.main.centerOn(this.player.sprite.x,this.player.sprite.y);
      this.miniCam.setVisible(false);
      this.player.sprite.setVelocity(0,0);
      this.player.mace.head.setVelocity(0,0);
      this.player.YVEL = -1;
      console.log("FADING IN");
      camera.fadeIn(1500, 0);
    }, this);

    this.cameras.main.once('camerafadeincomplete', function (camera) {
      this.player.enableTouch();
      this.startBossFight();
    }, this);

  }
  startBossFight(){
    this.clearEnemies();
    this.boss = new dunKing(this,this.dungeon.bossRoom.x,this.dungeon.bossRoom.y);
    this.boss.create();
  }

  clearEnemies(){
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].kill();
    }
  }

  createShaders(){
    this.pipeTick = 0.0;

        this.pipeline = this.game.renderer.addPipeline(this.shader, new Warp(this.game));
        this.pipeline.setFloat2('uResolution', game.config.width, game.config.height);
        this.pipeline2 = this.game.renderer.addPipeline(this.shader2, new TemplateShader(this.game));


        //this.player.sprite.setPipeline(this.shader);
        //this.cameras.main.setRenderToTexture(this.shader);
        this.miniCam.setRenderToTexture(this.shader2);

  }
}


var config = {
    type: Phaser.WEBGL,
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
        debug: true
      }
    },
    scene: [MenuScene,BasePlayScene],
    //fps:30
};

var game = new Phaser.Game(config);
