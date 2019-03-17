class dungeon {
  constructor(size, totRooms, pathStart, lootPerc, scene) {
    this.scene = scene;
    this.size = size;
    this.grid = 16 * 16 * 5;
    this.totalRooms = totRooms;
    if (pathStart > 4) {
      pathStart = 4;
    } else if (pathStart < 1) {
      pathStart = 1;
    }
    this.pathStartNum = pathStart;
    this.lootPercent = lootPerc;
    this.rooms = [];
    this.spawn = {
      x:0,
      y:0
    };
  }
  create() {
    console.log("Constructing Dungeon");
    this.generateDungeon();
    this.modifyDungeon();


  }

  generateDungeon() {
    this.level = this.createArray(this.size, this.size);

    for (var i = 0; i < 5; i++) {
      var headX = Phaser.Math.FloorTo(this.size / 2);
      var headY = Phaser.Math.FloorTo(this.size / 2);
      this.spawn.x = headX * this.grid;
      this.spawn.y = headY * this.grid;
      this.level[headY][headX] = 1;
      //var headDir = Phaser.Math.Between(0, 3);
      var headDir = i;
      for (var j = 0; j < 10; j++) {

        if (j%2 == 0) {
          headDir += Phaser.Math.Between(-1, 1);
        }
        if (headDir > 3) {
          headDir = 0;
        }
        if (headDir < 0) {
          headDir = 3;
        }
        //DETECT EDGE
        if (headX == 0) {
          this.level[headY][headX] = 1;
            headDir = Phaser.Math.RND.pick([1,2,3]);
        }
        if (headX == (this.size - 1)) {
          this.level[headY][headX] = 1;
            headDir = Phaser.Math.RND.pick([0,1,3]);
        }
        if (headY == 0) {
          this.level[headY][headX] = 1;
            headDir = Phaser.Math.RND.pick([0,2,3]);
        }
        if (headY == (this.size - 1)) {
          this.level[headY][headX] = 1;
            headDir = Phaser.Math.RND.pick([0,1,2]);
        }
        var walk = 1;
        switch (headDir) {
          case 0:
          //console.log(i + " : " + j +"left");
            headX -= walk;
            break;
          case 1:
          //console.log(i + " : " + j + "up");
            headY-= walk;
            break;
          case 2:
          //console.log(i + " : " +j +"right");
            headX+= walk;
            break;
          case 3:
          //console.log(i + " : " +j+"down");
            headY+=walk;
            break;

          default:

        }
        //console.log(this.level);
        //console.log(headX + ", " + headY + ", " + headDir);
        this.level[headY][headX] = 1;

      }
    }
    console.log("Level Data: " + this.level);




  }

  modifyDungeon(){
    for (var y = 0; y < this.size; y++) {
      for (var x = 0; x < this.size; x++) {
        var config = [1,1,1,1]
        var enemies = 4;
        if (x == 0 || this.level[y][x-1] == 0) {
          config[0] = 0;
        }
        if (y == 0 || this.level[y-1][x] == 0) {
          config[1] = 0;
        }
        if (x == this.size-1 || this.level[y][x+1] == 0) {
          config[2] = 0;
        }
        if (y == this.size-1 || this.level[y+1][x] == 0) {
          config[3] = 0;
        }
        if (this.level[y][x] == 1) {
          if (y==this.spawn.y/this.grid && x==this.spawn.x/this.grid) {
            enemies = 0;
          }
          this.createRoom(x * this.grid,y * this.grid,16,16,config,enemies);
        }
        //console.log(x + ", " + y + ", " + config);
      }
    }
  }

  generateRoom(config, doorTotal) {
    //var config = [0,0,0,0];#
    var doorsLeft = 0;
    for (var i = 0; i < config.length; i++) {
      if (config[i] == 0) {
        doorsLeft++;
      } else {
        //doorTotal--;
      }
    }
    //console.log(doorTotal);
    for (var i = 0; i < doorTotal; i++) {
      var counter = 0;
      //GEN RANDOM NUMVER
      var value = Phaser.Math.Between(0, doorsLeft - 1);
      //RESET COUNTER
      counter = 0;
      for (var j = 0; j < 4; j++) {
        if (config[j] === 0) {
          if (counter === value) {
            //CHECK IF CURRENT COUNTER IN ARRAY IS EQUAL TO ZERO
            config[j] = 1;
            doorsLeft--;

            break;
          } else {
            counter++
          }
        } else {
          //doorsLeft--;
        }
      }
    }

    //console.log(config);
    return config;
  }



  createArray(w, h) {
    const level = [];
    for (var y = 0; y < h; y++) {
      level[y] = [];
      for (var x = 0; x < w; x++) {
        level[y][x] = 0;
      }
    }
    return level;
  }



  createRoom(x, y, w, h, roomConfig, maxEnemy) {
    var room = new BaseRoom(x, y, w, h, roomConfig, maxEnemy, this.scene);
    room.create();
    this.rooms.push(room);

  }
}
