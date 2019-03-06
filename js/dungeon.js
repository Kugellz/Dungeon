class dungeon{
  constructor(size,totRooms,pathStart,lootPerc,scene){
    this.scene = scene;
    this.size = size;
    this.grid = 16*16*5;
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
  create(){
    console.log("constructing");
    this.generateDungeon();


  }

  generateDungeon(){
    this.generateRoom(0,0,16,16,[0,0,0,0],this.pathStartNum);
    console.log("ROOM VALUE: " + this.rooms[0].values);
    for (var i = 0; i < this.totalRooms; i++) {
      if (i == 0) {
        if (this.rooms[i].values[0] == 1) {
          this.generateRoom(this.rooms[i].x-this.grid,this.rooms[i].y,16,8,[1,0,1,0],2);
        }
        if (this.rooms[i].values[1] == 1) {
          this.generateRoom(this.rooms[i].x,this.rooms[i].y+this.grid,8,16,[0,1,0,1],2);
        }
        if (this.rooms[i].values[2] == 1) {
          this.generateRoom(this.rooms[i].x+this.grid,this.rooms[0].y,16,8,[1,0,1,0],2);
        }
        if (this.rooms[i].values[3] == 1) {
          this.generateRoom(this.rooms[i].x,this.rooms[i].y-this.grid,8,16,[0,1,0,1],2);
        }
      } else {
        if (this.rooms[i].values[0] == 1 && this.rooms[i].x < this.rooms[i-1].x) {
          this.generateRoom(this.rooms[i].x-this.grid,this.rooms[i].y,16,16,[0,0,1,0],3);
        }
        if (this.rooms[i].values[1] == 1 && this.rooms[i].y > this.rooms[i-1].y) {
          this.generateRoom(this.rooms[i].x,this.rooms[i].y+this.grid,16,16,[0,0,0,1],3);
        }
        if (this.rooms[i].values[2] == 1 && this.rooms[i].x > this.rooms[i-1].x) {
          this.generateRoom(this.rooms[i].x+this.grid,this.rooms[0].y,16,16,[1,0,0,0],3);
        }
        if (this.rooms[i].values[3] == 1 && this.rooms[i].y < this.rooms[i-1].y) {
          this.generateRoom(this.rooms[i].x,this.rooms[i].y-this.grid,16,16,[0,0,0,1],3);
        }
      }

    }
    // if (i > 0) {
    //   var prevX = this.rooms[i-1].x;
    //   var prevY = this.rooms[i-1].y;
    // } else {
    //   var prevX = 0;
    //   var prevY = 0;
    // }
    //
    // if (this.rooms[i].values[0] == 1) {
    //   this.generateRoom(prevX-this.grid,prevY,16,8,[1,0,1,0],2);
    // }
    // if (this.rooms[i].values[1] == 1) {
    //   this.generateRoom(prevX, prevY-this.grid,8,16,[0,1,0,1],2);
    // }
    // if (this.rooms[i].values[2] == 1) {
    //   this.generateRoom(prevX + this.grid,prevY,16,8,[1,0,1,0],2);
    // }
    // if (this.rooms[i].values[3] == 1) {
    //   this.generateRoom(prevX, prevY + this.grid,8,16,[0,1,0,1],2);
    // }


  }



  generateRoom(x,y,w,h,config,doorTotal){
    //var config = [0,0,0,0];#
    var doorsLeft = 0;
    for (var i = 0; i < config.length; i++) {
      if (config[i] == 0) {
        doorsLeft++;
      }else {
        doorTotal--;
      }
    }

    var counter = 0;
    for (var i = 0; i < doorTotal; i++) {
      //GEN RANDOM NUMVER
      console.log("DOORSLEFT: " + doorsLeft);
      var value = Phaser.Math.Between(0,doorsLeft-1);
      console.log("RANDOM: " + value);
      //RESET COUNTER
      counter = 0;
      for (var j = 0; j < 4; j++) {
        if (config[j] === 0) {
          if (counter === value) {
            //CHECK IF CURRENT COUNTER IN ARRAY IS EQUAL TO ZERO
            config[j] = 1;
            doorsLeft--;
            console.log(config);
            break;
          } else {
            counter++
          }
        } else {
          //doorsLeft--;
        }
      }
    }

    this.createRoom(x,y,w,h,config,doorTotal);
  }

  createRoom(x,y,w,h,roomConfig,doorCount){
    var room = new BaseRoom(x,y,w,h,roomConfig,doorCount,this.scene);
    room.create();
    this.rooms.push(room);
  }
}
