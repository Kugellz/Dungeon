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
    this.createPlayer();
    this.createMace(this.player);
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  createPlayer(){
    this.player = this.matter.add.sprite(400,300,'knight',null, { shape: 'circle',radius:10});
    this.player.setScale(2);
    this.player.setFixedRotation();
    this.player.setAngle(0);
    this.player.XVEL = 0;
    this.player.YVEL = 0;
    this.player.maxSpeed = 10;
    this.player.setCollisionCategory(this.playerColCat)
  }
  createMace(player){
    //player.mace = this.matter.add.sprite(410,300,'ball');
    //player.mace.setScale(2);
    //player.mace.setFriction(0);
    //this.matter.add.spring(player, player.mace, 60, 0);
    var y = 300;
    var prev = player;
    for (var i = 0; i < 6; i++)
    {
        var ball = this.matter.add.image(400, y, 'ball', null, { shape: 'circle', mass: 0.1 });
        ball.setCollisionCategory(this.maceColCat);

        this.matter.add.joint(prev, ball, 25, 0.4);
        if (i === 6) {
          ball.setMass(1);
        }

        prev = ball;

        y += 6;
    }


  }
  update(){
    if (this.cursors.left.isDown)
    {
        this.player.XVEL =-2;
    }
    else if (this.cursors.right.isDown)
    {
        this.player.XVEL = 2;
    } else {
      this.player.XVEL =0;
    }

    if (this.cursors.up.isDown)
    {
        this.player.YVEL =-2;
    }
    else if (this.cursors.down.isDown)
    {
        this.player.YVEL =2;
    } else {
      this.player.YVEL =0;
    }
    let vector = (new Phaser.Math.Vector2(this.player.XVEL,this.player.YVEL)).normalize();
    this.player.setVelocity(vector.x*2,vector.y*2);
  }
}


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1b1464',
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
    scene: [SceneA]
};

var game = new Phaser.Game(config);
