class Coin extends PickUp {
  constructor(x,y,scene) {
    super(x,y,'coin',3,scene);
  }
  update(){
    super.update();
    this.sprite.anims.play('coin', true);
  }
}
