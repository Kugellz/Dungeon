class dunKing {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = this.sprite = this.scene.matter.add.sprite(x, y, 'dungeonKing', null, null).setScale(5);
    this.target = this.scene.player.sprite;
    this.mode = 1;
    this.running = false;
    this.XVEL = 0;
    this.YVEL = 0;
    this.LOSRadius = 1200;
    var Bodies = Phaser.Physics.Matter.Matter.Bodies;

    var rectBody = Bodies.rectangle(this.sprite.x, this.sprite.y, 100, 200, {
      chamfer: {
        radius: 20
      },
      label: "Boss"
    });
    var rectBody2 = Bodies.rectangle(this.sprite.x, this.sprite.y, 200, 100, {
      chamfer: {
        radius: 20
      },
      label: "Boss"
    });


    var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
      parts: [rectBody, rectBody2]
    });

    this.sprite.setExistingBody(compoundBody)
      .setScale(8)
      .setOrigin(0.5, 0.6)
      .setFixedRotation()
      .setAngle(0)
      .setMass(20)
      .setFrictionAir(0.2);
    this.sprite.anims.play("bossIdle");

    this.sprite.body.label = "Boss"
    this.sprite.depth = 1.1;

    this.shadow = this.scene.add.image(x, y, 'shadow', null, null).setScale(12);
    this.shadow.depth = 1;

    this.chargeSpeed = 40;
    this.walkSpeed = 6;

    this.graphics = this.scene.add.graphics({
      lineStyle: {
        width: 100,
        color: 0xff0000,
        alpha: 0.5
      },
      fillStyle: {
        color: 0xff0000,
        alpha: 0.5
      }
    });

  }
  create() {
    this.tween = this.scene.tweens.addCounter({
      from: 0,
      to: 0.9,
      duration: 230,
      yoyo: true,
      repeat: -1
    });
  }
  update() {
    var currentPos = new Phaser.Math.Vector2(this.sprite.x, this.sprite.y);
    var targetPos = new Phaser.Math.Vector2(this.target.x, this.target.y);

    var distance = currentPos.distance(targetPos);
    var moveVect = new Phaser.Math.Vector2(targetPos.x - currentPos.x, targetPos.y - currentPos.y).normalize();


    //console.log(distance);
    //this.sprite.applyForce({x:moveVect.x,y:moveVect.y});
    switch (this.mode) {
      case 0:
        this.graphics.clear();
        this.running = false;
        this.sprite.setVelocity(0, 0);
        this.sprite.anims.play('bossIdle', true);

        var degree = (Phaser.Math.RadToDeg(moveVect.angle()));

        if (45 > degree || degree > 315) {
          //RIGHT
          this.XVEL = this.chargeSpeed;
          this.YVEL = 0;
        } else if (135 > degree && degree > 45) {
          //DOWN
          this.YVEL = this.chargeSpeed;
          this.XVEL = 0;
        } else if (225 > degree && degree > 135) {
          //LEFT
          this.XVEL = -this.chargeSpeed;
          this.YVEL = 0;
        } else if (315 > degree && degree > 225) {
          //UP
          this.YVEL = -this.chargeSpeed;
          this.XVEL = 0;
        }

        //  var line = new Phaser.Math.Vector2(currentPos.x + this.XVEL*20, currentPos.y + this.YVEL*20);
        var graphicsSize = 120;
        var line = new Phaser.Geom.Line(currentPos.x, currentPos.y, currentPos.x + this.XVEL * distance / 25, currentPos.y + this.YVEL * distance / 25);
        var normalAngle = Phaser.Geom.Line.NormalAngle(line);
        var tangent = new Phaser.Geom.Line(
          line.x1 + Math.cos(normalAngle) * graphicsSize, line.y1 + Math.sin(normalAngle) * graphicsSize,
          line.x1 + Math.cos(normalAngle) * -graphicsSize, line.y1 + Math.sin(normalAngle) * -graphicsSize
        );

        var a = new Phaser.Geom.Point(tangent.x1, tangent.y1);
        var b = new Phaser.Geom.Point(tangent.x2, tangent.y2);
        var c = new Phaser.Geom.Point(line.x2, line.y2);
        var triangle = new Phaser.Geom.Triangle(a.x, a.y, b.x, b.y, c.x, c.y);

        this.graphics.clear();
        //this.graphics.strokeLineShape(line);
        this.triangle = this.graphics.fillTriangleShape(triangle);

        if (this.triangle) {
          this.triangle.setAlpha(this.tween.getValue());
        }
        break;
      case 1:
        this.graphics.clear();
        var xDif = Math.abs(moveVect.x)
        var yDif = Math.abs(moveVect.y)
        if (xDif > yDif) {
          var shortVect = new Phaser.Math.Vector2(currentPos.x, targetPos.y);
        } else {
          var shortVect = new Phaser.Math.Vector2(targetPos.x, currentPos.y);
        }


        var moveToShortVect = new Phaser.Math.Vector2(shortVect.x - currentPos.x, shortVect.y - currentPos.y).normalize();

        if (currentPos.distance(shortVect) > 50) {
          this.sprite.setVelocity(moveToShortVect.x * this.walkSpeed, moveToShortVect.y * this.walkSpeed);
          this.sprite.anims.play('bossWalk', true);
        } else {
          this.mode = 0
          this.timedEvent = this.scene.time.delayedCall(1000, this.switch2, [], this);
        }



        break;
      case 2:

        if (this.triangle) {
          this.triangle.setAlpha(0.7);
        }
        this.sprite.anims.play('bossWalk', true);
        this.sprite.setVelocity(this.XVEL + (moveVect.x * 2), this.YVEL + (moveVect.y * 2));


        break;
      case 3:
        this.graphics.clear();
        this.sprite.setVelocity(0, 0);
        if (this.sprite.anims.getCurrentKey() == 'bossRoar' && this.sprite.anims.getProgress() == 1) {
          this.switch1();
        }

        //this.timedEvent2 = this.scene.time.delayedCall(2000, this.switch1, [], this);
        break;
      default:

    }
    //console.log(this.tween.getValue());


    //VISUAL
    if (this.sprite.body.velocity.x < 0) {
      this.sprite.setFlipX(true);
    } else {
      this.sprite.setFlipX(false);
    }

    this.velocity = new Phaser.Math.Vector2(this.sprite.body.velocity.x, this.sprite.body.velocity.y);

    this.shadow.setPosition(this.sprite.x, this.sprite.y + 80);
  }

  switch2() {
    this.mode = 2;
  }
  switch1() {
    this.mode = 1;
  }

  hitWall() {
    console.log("HITWALL");
    if (this.mode != 3 && this.mode != 1) {
      this.sprite.anims.play('bossRoar', true);
      this.mode = 3;
    }


  }

}
