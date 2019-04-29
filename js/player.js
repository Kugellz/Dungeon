class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.sprite = this.scene.matter.add.sprite(x, y, 'knight', null, null);
    this.sprite.setBody({
        type: 'circle',
        radius: 8,
      })
      .setOrigin(0.5, 0.7)
      .setScale(5)
      .setFixedRotation()
      .setAngle(0);

    this.sprite.setMass(10);
    this.sprite.XVEL = 0;
    this.sprite.YVEL = 0;
    this.sprite.maxSpeed = 20;
    this.sprite.speed = 10;
    this.sprite.parent = this;
    this.sprite.depth = 1.3;
    this.sprite.body.label = 'Player';
    this.sprite.setName("Player");

    this.shadow = this.scene.add.image(x, y, 'shadow', null, null).setScale(5);
    this.shadow.depth = 1.1;

    this.touching = false;
    this.touchEnabled = true;

    //PLAYER INFO
    this.maxHealth = 10;
    this.health = this.maxHealth;
    //parent, length, scale, ballScale
    this.mace = new Mace(this.sprite, 4, 1.4, 1.3);
    this.damageMultiplier = 2;
    //constructor(parent,length,scale,ballScale)

    //touchcontrols
    this.touchData = {};
    this.graphics = this.scene.add.graphics({
      lineStyle: {
        width: 20,
        color: 0xaa00aa
      },
    });

    this.scene.input.on('pointerdown', this.handlePointerDown, this);
    this.scene.input.on('pointermove', this.handlePointerMove, this);
    this.scene.input.on('pointerup', this.handlePointerUp, this);

  }
  update() {
    this.updateMaceData()
    //console.log(this.mace.head.body.velocity);
    if (this.cursors.left.isDown) {
      this.sprite.XVEL = -1;
    } else if (this.cursors.right.isDown) {
      this.sprite.XVEL = 1;
    } else if (this.touching == false) {
      this.sprite.XVEL = 0;
    }

    if (this.cursors.up.isDown) {
      this.sprite.YVEL = -1;
    } else if (this.cursors.down.isDown) {
      this.sprite.YVEL = 1;
    } else if (this.touching == false) {
      this.sprite.YVEL = 0;
    }
    let rawVector = new Phaser.Math.Vector2(this.sprite.XVEL, this.sprite.YVEL);
    var rawLength = Phaser.Math.Clamp(rawVector.length(), 0, 1);
    var vector = rawVector.normalize().scale(rawLength);


    if (this.sprite.XVEL == 0 && this.sprite.YVEL == 0) {
      this.sprite.anims.play('idle', true);
    } else {
      this.sprite.anims.play('walk', true);
    }
    if (this.sprite.XVEL > 0) {
      this.sprite.flipX = false;
    } else if (this.sprite.XVEL < 0) {
      this.sprite.flipX = true;
    }
    this.sprite.setVelocity(vector.x * this.sprite.speed, vector.y * this.sprite.speed);
    this.shadow.setPosition(this.sprite.x, this.sprite.y + 5);

    this.checkHealth();
  }
  //touchHandlers-------------------------------------------------------
  handlePointerDown(pointer) {
    this.graphics.clear();
    this.touchData = {};


    this.touching = true;
    this.touchData.startX = pointer.x;
    this.touchData.startY = pointer.y;

  }
  handlePointerMove(pointer) {
    //console.log("pointerMOVE");
    this.touchData.currentX = pointer.x;
    this.touchData.currentY = pointer.y;
    this.updateTouch();
  }
  handlePointerUp(pointer) {

    this.touching = false;
    this.graphics.clear();
    this.touchData = {};
    this.touchData.endX = pointer.x;
    this.touchData.endY = pointer.y;

  }

  updateTouch() {
    this.graphics.clear();
    const graphicsSize = 80;
    const distX = this.touchData.currentX - this.touchData.startX;
    const distY = this.touchData.currentY - this.touchData.startY;

    var circle = new Phaser.Geom.Circle(this.touchData.startX, this.touchData.startY, graphicsSize);
    if (this.touching) {
      var line = new Phaser.Geom.Line(this.touchData.startX, this.touchData.startY, this.touchData.currentX, this.touchData.currentY);
      var normalAngle = Phaser.Geom.Line.NormalAngle(line);
      var tangent = new Phaser.Geom.Line(
        this.touchData.startX + Math.cos(normalAngle) * graphicsSize, this.touchData.startY + Math.sin(normalAngle) * graphicsSize,
        this.touchData.startX + Math.cos(normalAngle) * -graphicsSize, this.touchData.startY + Math.sin(normalAngle) * -graphicsSize
      );
      //triangle
      var a = new Phaser.Geom.Point(tangent.x1, tangent.y1);
      var b = new Phaser.Geom.Point(tangent.x2, tangent.y2);
      var c = new Phaser.Geom.Point(this.touchData.currentX, this.touchData.currentY);
      var triangle = new Phaser.Geom.Triangle(a.x, a.y, b.x, b.y, c.x, c.y);
      //MAKE THE LINES WORK
    } else {
      var line = {};
    }
    this.graphics.depth = 5;
    this.graphics.fillStyle(0xFFFFFF, 0.3);
    this.graphics.fillTriangleShape(triangle).setScrollFactor(0, 0);
    this.graphics.fillStyle(0xFFFFFF, 1);
    this.graphics.fillCircleShape(circle).setScrollFactor(0, 0);


    //console.log(distX);

    if (this.touchEnabled) {
      const tolerance = 25;
      const reduceBy = 150;
      if (distX > 0 + tolerance) {
        this.sprite.XVEL = distX / reduceBy;
      } else if (distX < 0 - tolerance) {
        this.sprite.XVEL = distX / reduceBy;
      } else {
        this.sprite.XVEL = 0;
      }
      if (distY > 0 + tolerance) {
        this.sprite.YVEL = distY / reduceBy;
      } else if (distY < 0 - tolerance) {
        this.sprite.YVEL = distY / reduceBy;
      } else {
        this.sprite.YVEL = 0;
      }
    }
  }



  //-----------------------------------------

  disableTouch() {
    this.touchEnabled = false;
  }
  enableTouch() {
    this.touchEnabled = true;
  }

  checkHealth(){
    if (this.health <= 0) {
      this.kill();
    }
  }

  kill(){
      console.log("D E A D");

      //this.sprite.destroy;
      this.scene.player = null;
      this.scene.gameOver = true;
  }

  damage(object) {
    //console.log("DAMAGE ENEMY WITH: " + this.mace.maceVector.length());
    var power = this.mace.maceVector.length()
    object.health -= power * this.damageMultiplier;

    if (power > 10) {
      this.scene.cameras.main.shake(200, 0.003);

    }

  }
  updateMaceData() {
    this.mace.maceVector = new Phaser.Math.Vector2()
    this.mace.maceVector.set(this.mace.head.body.velocity.x, this.mace.head.body.velocity.y);
    this.mace.shadow.setPosition(this.mace.head.x, this.mace.head.y + 5 + this.mace.maceVector.length());
    //console.log(this.mace.maceVector.length());
  }
  changePlayerPos(x, y) {
    this.sprite.setPosition(x, y);
    for (var i = 0; i < this.mace.balls.length; i++) {
      this.mace.balls[i].setPosition(x, y + 100);
    }
    this.mace.head.setPosition(x, y + 100);
  }
}

class Mace {
  constructor(parent, length, scale, ballScale) {
    this.scene = parent.parent.scene;
    this.maceScale = scale;
    this.ballScale = ballScale;
    this.maceVector;

    this.shadow = this.scene.add.image(x, y, 'shadow', null, null).setScale(5);
    this.shadow.depth = 1.1;
    //-------------------
    var y = parent.y;
    var x = parent.x;
    var balls = [];
    var prev = parent;
    for (var i = 0; i < length; i++) {
      var ball = this.scene.matter.add.image(x, y, 'ball', null, {
        shape: 'circle',
        mass: 0.01,
        lable: 'chain'
      });

      ball.setFrictionAir(0.000);
      ball.setScale(2 * this.maceScale);
      ball.setMass(8);
      this.scene.matter.add.constraint(prev, ball, 24 * this.maceScale, 1);

      ball.setCollisionCategory(this.scene.maceColCat);
      ball.depth = 1.2;
      balls.push(ball);
      prev = ball;

      y += 20;
    }
    var ball = this.scene.matter.add.image(x, y, 'spikedBall', null, {
      shape: 'circle',
      mass: 0.01,
    });
    ball.body.label = 'Ball';
    ball.depth = 1.2;
    ball.setScale(3 * this.maceScale * this.ballScale);
    ball.setMass(10);
    ball.setName("Ball")
    this.scene.matter.add.constraint(prev, ball, 20 * this.maceScale * this.ballScale, 1);
    balls.push(ball);
    this.balls = balls;
    this.head = ball;




  }
}
