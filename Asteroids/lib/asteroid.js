var MovingObject = require("./movingObject.js");
var Util = require("./utils.js");

var Asteroid = function(options){
  MovingObject.call(this, {
    pos: options.pos,
    game: options.game,
    color: Asteroid.COLOR,
    radius: Asteroid.RADIUS,
    vel: Util.randomVec(5)
  });
};

Util.inherits(Asteroid, MovingObject);

Asteroid.COLOR = "magenta";
Asteroid.RADIUS = 25;

module.exports = Asteroid;
