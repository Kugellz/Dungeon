class bossRoom {
  constructor(x,y,scene) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.grid = 16 * 16 * 5;
    this.rooms = [];
  }
  create(){
    this.createRoom();
  }
  update(){

  }

  createRoom(){
    //for (var i = 0; i < 4; i++) {
    console.log(this.scene);
      var room = new BaseRoom(this.x,this.y, 32, 32, [0,0,0,0], 0, this.scene);
      console.log(room);

      room.create();
      console.log(room);
    //}
  }
}
