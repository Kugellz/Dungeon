class NewPickUp extends Phaser.Physics.Matter.Sprite {
  constructor(config,key,size) {
    super(config.scene.scene.matter.world,0,0,key,null,null);
    this.setScale(size);

    this.paused = true;
    this.LOSRadius = 600;
  }

  create(scene){
    this.scene = scene;
    this.target = this.scene.player.sprite;
    this.depth = 1.2;
    console.log("HELLOOO");
    console.log(this.body);
    this.body.isSensor = false;
    this.body.type = 'circle';
    this.body.radius = 7 * this.size;

    this.setFixedRotation()
    .setAngle(0)
    .setFrictionAir(0.015);

    this.timedEvent = this.scene.time.delayedCall(500, this.onEvent, [], this);
  }
  update(){
    var currentPos = new Phaser.Math.Vector2(this.x,this.y);
    var targetPos = new Phaser.Math.Vector2(this.target.x,this.target.y);
    var distance = currentPos.distance(targetPos);
    var moveVect = new Phaser.Math.Vector2(targetPos.x - currentPos.x,targetPos.y - currentPos.y)
    .normalize()
    .scale(2/distance);

    if (distance < this.LOSRadius && this.paused == false) {
      this.applyForce({x:moveVect.x,y:moveVect.y});
    }
    if (distance < this.LOSRadius/4) {
      this.setSensor(true);
    } else {
      this.setSensor(false);
    }
  }
  move(x,y){
    this.setPosition(x,y);
  }
  onEvent(){
    this.paused = false;
  }
}
