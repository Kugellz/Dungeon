class BaseRoom{
  constructor(x,y,tileDataKey,tileDataSource,scene){
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.name = tileDataKey;
    this.tileDataKey = tileDataKey;
    this.tileDataSource = tileDataSource;

  }
  create(){

    this.map = this.scene.make.tilemap({key:this.tileDataKey});
    var tileset = this.map.addTilesetImage('tilesheet','tilesheet');
    this.ground = this.map.createStaticLayer('ground',tileset,this.x,this.y).setScale(2.5);
    this.walls = this.map.createStaticLayer('collision',tileset,this.x,this.y).setScale(2.5);

    this.walls.setCollisionByProperty({collides:true});
    this.scene.matter.world.convertTilemapLayer(this.walls);
    var enemy = new Enemy(this.scene,this.x + 200,this.y + 200);
  }
}
