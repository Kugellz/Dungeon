class dunKing {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = this.sprite = this.scene.matter.add.sprite(x, y, 'dungeonKing', null, null).setScale(5);
    this.target = this.scene.player.sprite;
    this.mode = 2;
    this.running = false;
    this.XVEL = 0;
    this.YVEL = 0;
    var Bodies = Phaser.Physics.Matter.Matter.Bodies;

    var rectBody = Bodies.rectangle(this.sprite.x, this.sprite.y, 100, 200, {
      chamfer: {
        radius: 20
      }
    })
    var rectBody2 = Bodies.rectangle(this.sprite.x + 80, this.sprite.y + 0, 50, 100, {
      chamfer: {
        radius: 20
      }
    })
    var rectBody3 = Bodies.rectangle(this.sprite.x - 80, this.sprite.y + 0, 50, 100, {
      chamfer: {
        radius: 20
      }
    })

    var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
      parts: [rectBody, rectBody2, rectBody3]
    });

    this.sprite.setExistingBody(compoundBody)
      .setOrigin(0.5, 0.6)
      .setFixedRotation()
      .setAngle(0)
      .setMass(20)
      .setFrictionAir(0.2);
    this.sprite.anims.play("bossIdle");

    this.sprite.depth = 1.1;

    this.shadow = this.scene.add.image(x, y, 'shadow', null, null).setScale(8);
    this.shadow.depth = 1;
  }
  create() {

  }
  update() {
    var currentPos = new Phaser.Math.Vector2(this.sprite.x, this.sprite.y);
    var targetPos = new Phaser.Math.Vector2(this.target.x, this.target.y);
    var distance = currentPos.distance(targetPos);
    var moveVect = new Phaser.Math.Vector2(targetPos.x - currentPos.x, targetPos.y - currentPos.y).normalize();


    //console.log(moveVect);
    //this.sprite.applyForce({x:moveVect.x,y:moveVect.y});
    switch (this.mode) {
      case 0:
        this.sprite.setVelocity(0, 0);
        this.sprite.anims.play('bossIdle', true);
        break;
      case 1:
        this.sprite.setVelocity(moveVect.x * 2, moveVect.y * 2);
        this.sprite.anims.play('bossWalk', true);

        break;
      case 2:
        var degree = (Phaser.Math.RadToDeg(moveVect.angle()));
        if (this.running == false) {
          this.running = true;
          if (45 > degree || degree > 315) {
            //RIGHT
            this.XVEL = 8;
          } else if (135 > degree && degree > 45) {
            //DOWN
            this.YVEL = 8;
          } else if (225 > degree && degree > 135) {
            //LEFT
            this.XVEL = -8
          } else if (315 > degree && degree > 225) {
            //UP
            this.YVEL = -8;
          }
        } else {
          this.sprite.anims.play('bossWalk', true);
          this.sprite.setVelocity(this.XVEL, this.YVEL);
        }




        break;
      default:

    }




    //VISUAL
    if (moveVect.x < 0) {
      this.sprite.setFlipX(true);
    } else {
      this.sprite.setFlipX(false);
    }

    this.velocity = new Phaser.Math.Vector2(this.sprite.body.velocity.x, this.sprite.body.velocity.y);

    this.shadow.setPosition(this.sprite.x, this.sprite.y + 50);
  }

}
