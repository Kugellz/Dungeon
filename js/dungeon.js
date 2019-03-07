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
  }
  create() {
    console.log("constructing");
    this.generateDungeon();


  }

  generateDungeon() {
    this.level = this.createArray(this.size, this.size);

    for (var i = 0; i < 4; i++) {
      var headX = Phaser.Math.FloorTo(this.size / 2);
      var headY = Phaser.Math.FloorTo(this.size / 2);
      var headDir = Phaser.Math.Between(0, 3);

      for (var j = 0; j < 10; j++) {
        this.level[headY][headX] = i;
        this.createRoom(headX * this.grid,headY * this.grid,16,16,[1,1,1,1],4);
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
        if (headX == 0 || headX == this.size - 1) {
            headDir = Phaser.Math.RND.pick([1,3]);
        }
        if (headY == 0 || headX == this.size - 1) {
            headDir = Phaser.Math.RND.pick([0,2]);
        }
        var walk = 1;
        switch (headDir) {
          case 0:
          console.log(i + " : " + j +"left");
            headX -= walk;
            break;
          case 1:
          console.log(i + " : " + j + "up");
            headY-= walk;
            break;
          case 2:
          console.log(i + " : " +j +"right");
            headX+= walk;
            break;
          case 3:
          console.log(i + " : " +j+"down");
            headY+=walk;
            break;

          default:

        }
      }
    }
    console.log(this.level);




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



  createRoom(x, y, w, h, roomConfig, doorCount) {
    var room = new BaseRoom(x, y, w, h, roomConfig, doorCount, this.scene);
    room.create();
    this.rooms.push(room);
  }
}
