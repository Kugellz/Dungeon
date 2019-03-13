class Enemy{
  constructor(scene,x,y){
    this.scene = scene;
    this.sprite = this.scene.matter.add.sprite(x,y,'enemy',null, { shape: 'circle',radius:6});

    this.sprite.setScale(5)
    .setOrigin(0.5, 0.6)
    .setFixedRotation()
    .setAngle(0)
    .setMass(100)
    .setFrictionAir(0.1);
    this.XVEL = Phaser.Math.RND.pick([1,-1]);
    this.YVEL = Phaser.Math.RND.pick([1,-1]);
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
    var moveVect = new Phaser.Math.Vector2(currentPos.x - targetPos.x,currentPos.y - targetPos.y).normalize();
    console.log(this.sprite.body.velocity);

    if (this.sprite.body.velocity.x<1 && this.sprite.body.velocity.y < 1) {
      this.sprite.thrustRight(moveVect.x);
      this.sprite.thrustBack(-moveVect.y);
    }

  }
}
