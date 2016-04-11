var MovingObject = require("./movingObject.js");
var Util = require("./utils.js");

var Asteroid = function(options){
  this.pos = options.pos;
  this.color = Asteroid.COLOR;
  this.radius = Asteroid.RADIUS;
  this.vel = Util.randomVec();
};

module.exports = Asteroid;
