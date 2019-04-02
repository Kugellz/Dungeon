class PickUp {
  constructor(x,y,key,size,scene) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.spriteKey = key;
    this.size = size;
    this.sprite = this.scene.matter.add.sprite(x, y, this.spriteKey, null, null).setScale(this.size);
    this.sprite.setBody({
      isSensor:true,
        type: 'circle',
        radius: 7 * this.size,
    })
    .setFixedRotation()
    .setAngle(0)
    .setFrictionAir(0.01);
    this.sprite.depth = 1.2;
    this.sprite.parent = this;

    this.shadow = this.scene.add.image(x, y, 'shadow', null, null).setScale(this.size*0.5);
    this.shadow.depth = 1.1;

    this.paused = true;
    this.LOSRadius = 550;

    this.target = this.scene.player.sprite;
  }
  create(){
    this.timedEvent = this.scene.time.delayedCall(500, this.onEvent, [], this);
  }
  update(){
    var currentPos = new Phaser.Math.Vector2(this.sprite.x,this.sprite.y);
    var targetPos = new Phaser.Math.Vector2(this.target.x,this.target.y);
    var distance = currentPos.distance(targetPos);
    var moveVect = new Phaser.Math.Vector2(targetPos.x - currentPos.x,targetPos.y - currentPos.y)
    .normalize()
    .scale(2/distance);

    if (distance < this.LOSRadius && this.paused == false) {
      this.sprite.applyForce({x:moveVect.x,y:moveVect.y});
    }
    if (distance < this.LOSRadius/4) {
      this.sprite.setSensor(true);
    } else {
      this.sprite.setSensor(false);
    }

    this.shadow.setPosition(this.sprite.x, this.sprite.y + 15);
  }
  onEvent(){
    this.paused = false;
  }
  destroy(){
    Phaser.Utils.Array.Remove(this.scene.coins,this);
    this.sprite.destroy();
    this.shadow.destroy();
  }
}
