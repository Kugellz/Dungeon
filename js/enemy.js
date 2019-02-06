class Enemy{
  constructor(scene,x,y){
    this.scene = scene;
    this.sprite = this.scene.matter.add.sprite(x,y,'ball',null, { shape: 'circle',radius:7});
    //this.sprite.setCollisionCategory(this.scene.enemyColCat);
    //this.sprite.setCollidesWith([this.scene.enemyColCat, this.scene.wallColCat]);
    this.sprite.setScale(5);
    this.sprite.setFixedRotation();
    this.sprite.setAngle(0);
    this.sprite.setMass(10);
  }
  create(){


  }
}
