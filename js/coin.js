class Coin extends PickUp {
  constructor(config) {
    super(config,'coin',2.5);
    this.body.label = 'Coin';
  }
  create(scene){
    super.create(scene);
    var moveVect = new Phaser.Math.Vector2(Phaser.Math.Between(-1,1),Phaser.Math.Between(-1,1));
    this.applyForce({x:moveVect.x/20,y:moveVect.y/20});
    this.anims.play('coin', true);

  }
  update(){
    super.update();

  }
}
