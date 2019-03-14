class Enemy{
  constructor(scene,x,y){
    this.scene = scene;
    this.sprite = this.scene.matter.add.sprite(x,y,'enemy',null, { shape: 'circle',radius:6});

    this.sprite.setScale(5)
    .setOrigin(0.5, 0.6)
    .setFixedRotation()
    .setAngle(0)
    .setMass(8)
    .setFrictionAir(0.1)
    .depth = 1;
    this.XVEL = Phaser.Math.RND.pick([1,-1]);
    this.YVEL = Phaser.Math.RND.pick([1,-1]);
    this.temp = true;
    this.LOSRadius = 700;
  }
  create(){

  }
  setPlayer(){
    this.target = this.scene.player.sprite;
    //console.log(this.target);
  }
  update(){
    var currentPos = new Phaser.Math.Vector2(this.sprite.x,this.sprite.y);
    var targetPos = new Phaser.Math.Vector2(this.target.x,this.target.y);
    var distance = currentPos.distance(targetPos);
    var moveVect = new Phaser.Math.Vector2(targetPos.x - currentPos.x,targetPos.y - currentPos.y)
    .normalize()
    .scale(0.005);
    //console.log(distance);

    if (distance < this.LOSRadius) {
      this.sprite.applyForce({x:moveVect.x,y:moveVect.y});
      if (moveVect.x < 0) {
        this.sprite.setFlipX(true);
      } else {
        this.sprite.setFlipX(false);
      }
    }

    this.velocity = new Phaser.Math.Vector2(this.sprite.body.velocity.x,this.sprite.body.velocity.y);
    if (this.velocity.length() < 0.1) {
      this.sprite.anims.play('enemyIdle', true);
    } else {
      this.sprite.anims.play('enemyWalk', true);
    }



  }
}
