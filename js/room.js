class BaseRoom{
  constructor(x,y,width,height,tileDataKey,tileDataSource,scene){
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.name = tileDataKey;
    this.tileDataKey = tileDataKey;
    this.tileDataSource = tileDataSource;
    this.width = width;
    this.height = height;

  }
  create(){
    //OLD WAYS
    //this.map = this.scene.make.tilemap({key:this.tileDataKey});
    //var tileset = this.map.addTilesetImage('tilesheet','tilesheet');
    //this.ground = this.map.createStaticLayer('ground',tileset,this.x,this.y).setScale(5);
    //this.walls = this.map.createStaticLayer('collision',tileset,this.x,this.y).setScale(5);


    const levelTest = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];

    //EDIT LEVEL - auto creates the level matrix, adds walls
    const level = [];
    for (var y = 0; y < this.height; y++) {
      var row = [];
      for (var x = 0; x < this.width; x++) {
        var num = Phaser.Math.RND.between(0,1);
        if ( y == 0 || y == this.height || x == 0 || x == this.height) {
          num = 0;
        }else if (y == 1) {
          num = 1;
        } else {
          num = 2;
        }
        row.push(num);
      }
      level.push(row);
    }

    //NEW WAYS - give the level data to the tilemap creator.
    const map = this.scene.make.tilemap({data: level,tileWidth:16,tileHeight:16});
    this.tiles = map.addTilesetImage('tilesheet');
    this.walls = map.createStaticLayer(0,this.tiles,this.x,this.y).setScale(5);

    this.walls.setCollision([0,1],true,true);
    this.scene.matter.world.convertTilemapLayer(this.walls);
    var enemy = new Enemy(this.scene,this.x + 400,this.y + 400);
  }
}
