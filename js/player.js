class Player{
  constructor(scene, x, y){
    this.scene = scene;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.sprite = this.scene.matter.add.sprite(400,300,'knight',null, { shape: 'circle',radius:8});
    this.sprite.setScale(3);
    this.sprite.setFixedRotation();
    this.sprite.setAngle(0);
    this.sprite.setMass(10);
    this.sprite.XVEL = 0;
    this.sprite.YVEL = 0;
    this.sprite.maxSpeed = 10;
    this.sprite.speed = 4;
    this.sprite.parent = this;
    this.sprite.depth = 1;
    this.touching = false;
    //this.sprite.setCollisionCategory(this.spriteColCat)

    this.mace = new Mace(this.sprite,5);

    //touchcontrols
    this.touchData = {};
    this.graphics = this.scene.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });
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
      this.sprite.XVEL =0;
    }

    if (this.cursors.up.isDown)
    {
        this.sprite.YVEL =-1;
    }
    else if (this.cursors.down.isDown)
    {
        this.sprite.YVEL =1;
    } else if (this.touching == false) {
      this.sprite.YVEL =0;
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
    this.touchData = {};
    console.log("pointerDOWN");
    this.touching = true;
    this.touchData.startX = pointer.x;
    this.touchData.startY = pointer.y;
  }
  handlePointerMove(pointer){
    console.log("pointerMOVE");
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
    if (this.touching) {
      var line = new Phaser.Geom.Line(this.touchData.startX + this.scene.cameras.main.scrollX, this.touchData.startY + this.scene.cameras.main.scrollY, this.touchData.currentX + this.scene.cameras.main.scrollX, this.touchData.currentY + this.scene.cameras.main.scrollY);
    } else {
      var line = {};
    }
    this.graphics.strokeLineShape(line);
    const distX = this.touchData.currentX - this.touchData.startX;
    const distY = this.touchData.currentY - this.touchData.startY;
    //console.log(distX);

    const tolerance = 50;
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
        ball.setCollisionCategory(this.scene.maceColCat);
        ball.setFrictionAir(0.01);
        ball.setScale(1.5);

        this.scene.matter.add.joint(prev, ball, (i === length-1) ? 16 : 12, 0);
        if (i === length-1) {
          ball.setMass(0.5);
          ball.setScale(2.5);
          this.head = ball
        }
        balls.push(ball);
        prev = ball;

        y += 20;
    }


  }
}
