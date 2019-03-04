class Enemy{
  constructor(scene,x,y){
    this.scene = scene;
    this.sprite = this.scene.matter.add.sprite(x,y,'enemy',null, { shape: 'circle',radius:6});
    console.log(this.sprite);
    //this.sprite.setCollisionCategory(this.scene.enemyColCat);
    //this.sprite.setCollidesWith([this.scene.enemyColCat, this.scene.wallColCat]);
    this.sprite.setScale(5).setOrigin(0.5, 0.6);
    this.sprite.setFixedRotation();
    this.sprite.setAngle(0);
    this.sprite.setMass(10);
  }
  create(){


  }
}
