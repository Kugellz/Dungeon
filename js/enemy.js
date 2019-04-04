class Enemy{
  constructor(scene,x,y,origin){
    this.scene = scene;
    this.sprite = this.scene.matter.add.sprite(x,y,'enemy',null, { shape: 'circle',radius:6});
    this.sprite.setName("Enemy");
    this.sprite.parent = this;
    this.sprite.setScale(5)
    .setOrigin(0.5, 0.6)
    .setFixedRotation()
    .setAngle(0)
    .setMass(8)
    .setFrictionAir(0.1)
    .depth = 1;
    this.sprite.body.label = 'Enemy';

    this.shadow = this.scene.add.image(x, y, 'shadow', null, null).setScale(5);
    this.shadow.depth = 1.1;
    this.scene.miniCam.ignore([this.sprite,this.shadow]);

    this.XVEL = Phaser.Math.RND.pick([1,-1]);
    this.YVEL = Phaser.Math.RND.pick([1,-1]);
    this.temp = true;
    this.LOSRadius = 700;
    this.originRoom = origin;
    this.paused = false;
    //HEALTH
    this.maxHealth = 100;
    this.health = this.maxHealth;

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

    if (distance < this.LOSRadius && this.paused == false) {
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
    this.shadow.setPosition(this.sprite.x, this.sprite.y + 10);
    this.checkHealth();

  }
  checkHealth(){
    if (this.health < 0) {
      this.kill();
    }
  }
  pause(){
    this.paused = true;
    this.sprite.setVelocity(0,0);
  }
  unPause(){
    this.paused = false;
  }
  spawnCoins(){
    for (var i = 0; i < 3; i++) {
      //var coin = new Coin(this.sprite.x,this.sprite.y,this.scene);
      var coin = this.scene.coins.get();
      if (coin) {
        coin.create(this.scene);
        coin.move(this.sprite.x,this.sprite.y);
        //this.scene.coins.push(coin);
      }

    }
  }
  kill(){
    this.spawnCoins();
    Phaser.Utils.Array.Remove(this.scene.enemies,this);
    Phaser.Utils.Array.Remove(this.originRoom.enemies,this);
    this.originRoom.checkEnemyCount();
    this.sprite.destroy();
    this.shadow.destroy();
  }
}
