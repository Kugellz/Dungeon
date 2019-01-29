class Player{
  constructor(scene, x, y){
    this.scene = scene;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.sprite = this.scene.matter.add.sprite(400,300,'knight',null, { shape: 'circle',radius:8});
    this.sprite.setScale(2);
    this.sprite.setFixedRotation();
    this.sprite.setAngle(0);
    this.sprite.setMass(10);
    this.sprite.XVEL = 0;
    this.sprite.YVEL = 0;
    this.sprite.maxSpeed = 10;
    this.sprite.speed = 4;
    this.sprite.parent = this;
    //this.sprite.setCollisionCategory(this.spriteColCat)

    this.mace = new Mace(this.sprite,5);

  }
  update(){
    if (this.cursors.left.isDown)
    {
        this.sprite.XVEL =-2;
        this.sprite.flipX = true;
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.XVEL = 2;
        this.sprite.flipX = false;
    } else {
      this.sprite.XVEL =0;
    }

    if (this.cursors.up.isDown)
    {
        this.sprite.YVEL =-2;
    }
    else if (this.cursors.down.isDown)
    {
        this.sprite.YVEL =2;
    } else {
      this.sprite.YVEL =0;
    }
    let vector = (new Phaser.Math.Vector2(this.sprite.XVEL,this.sprite.YVEL)).normalize();
    if (this.sprite.XVEL == 0 && this.sprite.YVEL == 0) {
      this.sprite.anims.play('idle', true);
    } else {
      this.sprite.anims.play('walk', true);
    }
    this.sprite.setVelocity(vector.x*this.sprite.speed,vector.y*this.sprite.speed);

  }
}

class Mace{
  constructor(parent,length){
    this.scene = parent.parent.scene;
    var y = parent.y;
    var prev = parent;
    for (var i = 0; i < length; i++)
    {
        var ball = this.scene.matter.add.image(400, y, 'ball', null, { shape: 'circle', mass: 0.1 });
        ball.setCollisionCategory(this.maceColCat);
        ball.setFrictionAir(0.01);

        this.scene.matter.add.joint(prev, ball, (i === length-1) ? 12 : 8, 0);
        if (i === length-1) {
          ball.setMass(0.5);
          ball.setScale(2);
        }

        prev = ball;

        y += 10;
    }


  }
}
