class Player{
  constructor(scene, x, y){
    this.scene = scene;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.sprite = this.scene.matter.add.sprite(400,300,'knight',null, { shape: 'circle',radius:7});
    this.sprite.setScale(6);
    this.sprite.setFixedRotation();
    this.sprite.setAngle(0);
    this.sprite.setMass(10);
    this.sprite.XVEL = 0;
    this.sprite.YVEL = 0;
    this.sprite.maxSpeed = 20;
    this.sprite.speed = 8;
    this.sprite.parent = this;
    this.sprite.depth = 1;
    this.touching = false;
    //this.sprite.setCollisionCategory(this.spriteColCat)

    this.mace = new Mace(this.sprite,5);

    //touchcontrols
    this.touchData = {};
    this.graphics = this.scene.add.graphics({
       lineStyle: { width: 20, color: 0xaa00aa },
       fillStyle: { color: 0xff0000 }
     });
    this.scene.input.on('pointerdown', this.handlePointerDown,this);
    this.scene.input.on('pointermove', this.handlePointerMove,this);
    this.scene.input.on('pointerup', this.handlePointerUp,this);

  }
  update(){
    this.updateMaceData()
    //console.log(this.mace.head.body.velocity);
    if (this.cursors.left.isDown)
    {
        this.sprite.XVEL =-1;
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.XVEL = 1;
    } else if (this.touching == false){
      this.sprite.XVEL = 0;
    }

    if (this.cursors.up.isDown)
    {
        this.sprite.YVEL =-1;
    }
    else if (this.cursors.down.isDown)
    {
        this.sprite.YVEL = 1;
    } else if (this.touching == false) {
      this.sprite.YVEL = 0;
    }
    let vector = (new Phaser.Math.Vector2(this.sprite.XVEL,this.sprite.YVEL)).normalize();
    if (this.sprite.XVEL == 0 && this.sprite.YVEL == 0) {
      this.sprite.anims.play('idle', true);
    } else {
      this.sprite.anims.play('walk', true);
    }
    if (this.sprite.XVEL > 0) {
      this.sprite.flipX = false;
    } else {
      this.sprite.flipX = true;
    }
    this.sprite.setVelocity(vector.x*this.sprite.speed,vector.y*this.sprite.speed);

  }
  //touchHandlers-------------------------------------------------------
  handlePointerDown(pointer){
    this.graphics.clear();
    this.touchData = {};
    console.log("pointerDOWN");

    this.touching = true;
    this.touchData.startX = pointer.x;
    this.touchData.startY = pointer.y;

  }
  handlePointerMove(pointer){
    //console.log("pointerMOVE");
    this.touchData.currentX = pointer.x;
    this.touchData.currentY = pointer.y;
    this.updateTouch();
  }
  handlePointerUp(pointer){
    console.log("pointerUP");
    this.touching = false;
    this.touchData = {};
    this.touchData.endX = pointer.x;
    this.touchData.endY = pointer.y;

  }

  updateTouch(){
    this.graphics.clear();
    var circle = new Phaser.Geom.Circle(this.touchData.startX, this.touchData.startY, 25);
    if (this.touching) {
      var line = new Phaser.Geom.Line(this.touchData.startX, this.touchData.startY, this.touchData.currentX, this.touchData.currentY);
      var a = new Phaser.Geom.Point(this.touchData.startX, this.touchData.startY);
      var b = new Phaser.Geom.Point(this.touchData.startX, this.touchData.startY);
      var c = new Phaser.Geom.Point(this.touchData.currentX, this.touchData.currentY);
      //MAKE THE LINES WORK
    } else {
      var line = {};
    }
    this.graphics.strokeLineShape(line).setScrollFactor(0,0);
    this.graphics.fillCircleShape(circle).setScrollFactor(0,0);

    const distX = this.touchData.currentX - this.touchData.startX;
    const distY = this.touchData.currentY - this.touchData.startY;
    //console.log(distX);

    const tolerance = 25;
    if (distX > 0 + tolerance) {
      this.sprite.XVEL = distX/10;
    } else if (distX < 0 - tolerance) {
      this.sprite.XVEL = distX/10;
    } else {
      this.sprite.XVEL = 0;
    }
    if (distY > 0 + tolerance) {
      this.sprite.YVEL = distY/10;
    } else if (distY < 0 - tolerance) {
      this.sprite.YVEL = distY/10;
    } else {
      this.sprite.YVEL = 0;
    }
  }
  //-----------------------------------------
  updateMaceData(){
    this.mace.maceVector = new Phaser.Math.Vector2()
    this.mace.maceVector.set(this.mace.head.body.velocity.x,this.mace.head.body.velocity.y);
    //console.log(this.mace.maceVector.length());
  }
}

class Mace{
  constructor(parent,length){
    this.scene = parent.parent.scene;
    this.maceVector;
    //-------------------
    var y = parent.y;
    var balls = [];
    var prev = parent;
    for (var i = 0; i < length; i++)
    {
        var ball = this.scene.matter.add.image(400, y, 'ball', null, { shape: 'circle', mass: 0.1 });

        ball.setFrictionAir(0.000);
        ball.setScale(3);

        this.scene.matter.add.joint(prev, ball, (i === length-1) ? 40 : 24, 0);
        if (i === length-1) {
          ball.setMass(0.5);
          ball.setScale(6);
          this.head = ball
        } else {
          ball.setCollisionCategory(this.scene.maceColCat);
        }
        balls.push(ball);
        prev = ball;

        y += 20;
    }


  }
}
