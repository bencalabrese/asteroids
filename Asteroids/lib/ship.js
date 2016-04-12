var MovingObject = require("./movingObject.js");
var Util = require("./utils.js");

var Ship = function(options){
  MovingObject.call(this, {
    pos: options.pos,
    game: options.game,
    color: Ship.COLOR,
    radius: Ship.RADIUS,
    vel: [0, 0]
  });
};

Util.inherits(Ship, MovingObject);

Ship.COLOR = "green";
Ship.RADIUS = 25;

Ship.prototype.relocate = function(){
  this.pos = this.game.randomPosition();
  this.vel = [0,0];
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

module.exports = Ship;
