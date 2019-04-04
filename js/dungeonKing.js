class dunKing {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = this.sprite = this.scene.matter.add.sprite(x, y, 'dungeonKing', null, null).setScale(5);
    this.target = this.scene.player;

    var Bodies = Phaser.Physics.Matter.Matter.Bodies;

    var rectBody = Bodies.rectangle(this.sprite.x, this.sprite.y, 100, 150, {
        chamfer: { radius: 20 }
    })
    var rectBody2 = Bodies.rectangle(this.sprite.x+80, this.sprite.y+0, 50, 100, {
        chamfer: { radius: 20 }
    })
    var rectBody3 = Bodies.rectangle(this.sprite.x-80, this.sprite.y+0, 50, 100, {
        chamfer: { radius: 20 }
    })

    var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
        parts: [ rectBody,rectBody2,rectBody3 ]
    });

    this.sprite.setExistingBody(compoundBody)
    .setOrigin(0.5,0.7)
    .setFixedRotation()
    .setAngle(0)
    .setMass(20)
    .setFrictionAir(0.2);
    this.sprite.anims.play("bossIdle");

    this.sprite.depth = 1;
  }
  create(){

  }
  update(){
    
  }
}
