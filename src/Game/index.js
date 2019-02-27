// Import outside libraries
const Phaser = require('phaser');
// Local Modules
const SerialPortReader = require('./SerialPortReader');

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
};

const serial = new SerialPortReader();

var map;
// Phaser setup
function create() {

  cursors = this.input.keyboard.createCursorKeys();
  
  map = this.add.graphics({
    fillStyle: { color: 0xff66ff },
    lineStyle: { width: 3, color: 0xeeeeee }
  });
}

function update(totalTime, deltaTime) {
  cursors = this.input.keyboard.createCursorKeys();

  map.clear();

  map.save();
  map.translate(config.width/2, config.height/2);
  map.fillCircle(0,0,100);
  map.restore();

  // Keyboard controls
  if (cursors.down.isDown) {
    map = this.add.graphics({
      fillStyle: { color: 0x00ffff } 
    });
  }

  else if (cursors.up.isDown) {
    map = this.add.graphics({
      fillStyle: { color: 0xff66ff }
    });
  }

}

function onSerialMessage(msg) {
  // Put your serial reading code in here. msg will be a string
  // if(command === 't') {
  //   map = this.add.graphics({
  //     fillStyle: { color: 0x00ffff } 
  //   });
  // }
  // else if(command === 'b') {
  //   map = this.add.graphics({
  //     fillStyle: { color: 0xff66ff }
  //   });
  // }
  console.log(msg);
}


config.scene = {
  create: create,
  update: update
}

let game;
  
// Exported Module so game can be initialized elseware
const GameManager = {
  init: () => {
    // Set serial port listener. To keep the code clean we use a helper function defined above
    serial.setListener(onSerialMessage);
    // The openPort function takes a callback function for finding the correct arduino from a list
    // and whatever you want your delimiter to be between packets
    serial.openPort(p => /Arduino/.test(p.manufacturer), '-');
    
    game = new Phaser.Game(config);
  },
};

module.exports = GameManager;
