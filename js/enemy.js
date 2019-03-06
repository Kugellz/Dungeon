class Enemy{
  constructor(scene,x,y){
    this.scene = scene;
    this.sprite = this.scene.matter.add.sprite(x,y,'enemy',null, { shape: 'circle',radius:6});
    this.sprite.setScale(5)
    .setOrigin(0.5, 0.6)
    .setFixedRotation()
    .setAngle(0)
    .setMass(10);
  }
  create(){


  }
}
