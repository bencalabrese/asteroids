var MovingObject = require("./movingObject.js");
var Util = require("./utils.js");

var Asteroid = function(options){
  this.pos = options.pos;
  this.color = Asteroid.COLOR;
  this.radius = Asteroid.RADIUS;
  this.vel = Util.randomVec();
};

Util.inherits(Asteroid, MovingObject);

Asteroid.COLOR = "brown";
Asteroid.RADIUS = 5;

module.exports = Asteroid;
