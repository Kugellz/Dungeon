class BaseRoom {
  constructor(x, y, width, height, values, doorCount, scene) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.readX = x - (width / 2) * 16 * 5;
    this.readY = y - (height / 2) * 16 * 5;
    this.values = values;
    this.doorCount = doorCount;
    //this.name = tileDataKey;
    //this.tileDataKey = tileDataKey;
    //this.tileDataSource = tileDataSource;
    this.width = width;
    this.height = height;

    if (values[0] == 1) {
      this.left = true;
    }
    if (values[1] == 1) {
      this.up = true;
    }
    if (values[2] == 1) {
      this.right = true;
    }
    if (values[3] == 1) {
      this.down = true;
    }

  }
  create() {
    console.log("Constructing Room");
    const levelTest = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];

    const wallData = this.createArray();
    const wallTopData = this.createArray();
    //EDIT LEVEL - auto creates the level matrix, adds walls

    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var num = Phaser.Math.RND.between(0, 1);
        if (y == 0 || y == this.height - 1 || x == 0 || x == this.width - 1) {
          num = Phaser.Math.RND.pick([1,1,1,1,9]);;
        } else {
          num = Phaser.Math.RND.pick([2,2,2,2,2,2,2,2,2,2,3,10,11]);
        }
        //RIGHT DOOR
        if (this.right) {
          if ((y + 1 == this.height / 2 || y == this.height / 2) && x > this.width / 2) {
            num = 2;
          }
        }
        //LEFT DOOR
        if (this.left) {
          if ((y + 1 == this.height / 2 || y == this.height / 2) && x < this.width / 2) {
            num = 2;
          }
        }
        //TOP DOOR
        if (this.up) {
          if ((x + 1 == this.width / 2 || x == this.width / 2) && y < this.height / 2) {
            num = 2;
          }
        }
        //BOTTOM DOOR
        if (this.down) {
          if ((x + 1 == this.width / 2 || x == this.width / 2) && y > this.height / 2) {
            num = 2;
          }
        }
        wallData[y][x] = num;
      }

    }

    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        if (wallData[y][x] == 1 || wallData[y][x] == 9) {
          wallTopData[y][x] = 0;
        } else {
          wallTopData[y][x] = -1;
        }

        if ((y >= 0 && y + 1 < this.height) && wallData[y + 1][x] == 1) {
          //level[y][x] = 0
        }
      }
    }


    //NEW WAYS - give the level data to the tilemap creator.
    const wallMap = this.scene.make.tilemap({
      data: wallData,
      tileWidth: 16,
      tileHeight: 16
    });
    this.wallTiles = wallMap.addTilesetImage('tilesheet');
    this.walls = wallMap.createStaticLayer(0, this.wallTiles, this.readX, this.readY).setScale(5);
    this.walls.depth = 0;
    this.walls.setCollision([1,9], true, true);
    this.scene.matter.world.convertTilemapLayer(this.walls);

    const topMap = this.scene.make.tilemap({
      data: wallTopData,
      tileWidth: 16,
      tileHeight: 16
    });
    this.topTiles = topMap.addTilesetImage('tilesheet');
    this.tops = topMap.createStaticLayer(0, this.topTiles, this.readX, this.readY - 16 * 5).setScale(5);
    this.tops.depth = 2;
    this.scene.matter.world.convertTilemapLayer(this.tops);

    var number = Phaser.Math.RND.between(0, 4);
    for (var i = 0; i < number; i++) {
      var enemy = new Enemy(this.scene, this.x + 100,this.y + 100);
      enemy.create();
      this.scene.enemies.push(enemy);
    }
  }

  createArray() {
    const level = [];
    for (var y = 0; y < this.height; y++) {
      level[y] = [];
      for (var x = 0; x < this.width; x++) {
        level[y][x] = -1;
      }
    }
    return level;
  }
}
