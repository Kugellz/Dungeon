class PickUp {
  constructor(x,y,key,size,scene) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.spriteKey = key;
    this.size = size;
    this.sprite = this.scene.matter.add.sprite(x, y, this.spriteKey, null, null).setScale(this.size);
    this.sprite.setBody({
        type: 'circle',
        radius: 7 * this.size,
    })
    .setFixedRotation()
    .setAngle(0);
    this.sprite.depth = 1.2;
    this.shadow = this.scene.add.image(x, y, 'shadow', null, null).setScale(this.size*0.5);
    this.shadow.depth = 1.1;
  }
  create(){

  }
  update(){
    
    this.shadow.setPosition(this.sprite.x, this.sprite.y + 15);
  }
  destroy(){

  }
}
