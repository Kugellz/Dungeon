class Coin extends PickUp {
  constructor(x,y,scene) {
    super(x,y,'coin',3,scene);
    this.sprite.body.label = 'Coin';
  }
  create(){
    super.create();
    var moveVect = new Phaser.Math.Vector2(Phaser.Math.Between(-1,1),Phaser.Math.Between(-1,1));
    this.sprite.applyForce({x:moveVect.x/20,y:moveVect.y/20});

  }
  update(){
    super.update();
    this.sprite.anims.play('coin', true);
  }
}
