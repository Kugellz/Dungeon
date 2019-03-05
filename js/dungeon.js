class dungeon{
  constructor(size,totRooms,pathStart,lootPerc,scene){
    this.scene = scene;
    this.size = size;
    this.scale = 16*16*5;
    this.totalRooms = totRooms;
    if (pathStart > 4) {
      pathStart = 4;
    }
    this.pathStartNum = pathStart;
    this.lootPercent = lootPerc;
    this.rooms = [];
  }
  create(){
    console.log("constructing");
    this.generateRoom(0,0,16,16,[1,1,1,1],4);
    this.generateRoom(this.scale*1,this.scale*0,16,8,[1,0,1,0],1);
    this.generateRoom(this.scale*-1,this.scale*0,16,8,[1,0,1,0],1);
    this.generateRoom(this.scale*0,this.scale*1,8,16,[0,1,0,1],1);
    this.generateRoom(this.scale*0,this.scale*-1,8,16,[0,1,0,1],1);
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

    this.createRoom(x,y,w,h,config);
  }

  createRoom(x,y,w,h,roomConfig){
    var room = new BaseRoom(x,y,w,h,roomConfig,this.scene);
    room.create();
    this.rooms.push(room);
  }
}
