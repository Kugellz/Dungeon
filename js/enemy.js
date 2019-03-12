class Enemy{
  constructor(scene,x,y){
    this.scene = scene;
    this.sprite = this.scene.matter.add.sprite(x,y,'enemy',null, { shape: 'circle',radius:6});
    this.target = this.scene.player;
    this.sprite.setScale(5)
    .setOrigin(0.5, 0.6)
    .setFixedRotation()
    .setAngle(0)
    .setMass(10);
    this.XVEL = Phaser.Math.RND.pick([1,-1]);
    this.YVEL = Phaser.Math.RND.pick([1,-1]);
  }
  create(){


  }
  update(){
    //console.log("RUNNING ENEMIES");

    this.sprite.setVelocity(this.XVEL,this.YVEL);
  }
}
