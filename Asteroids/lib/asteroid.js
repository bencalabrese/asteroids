var MovingObject = require("./movingObject.js");
var Util = require("./utils.js");
var Ship = require("./ship.js");

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

Asteroid.prototype.collideWith = function(otherObject){
  var self = this;

  setTimeout(function() {
    if (otherObject instanceof Ship){
      otherObject.relocate();
    } else {
      self.game.remove(otherObject);
    }
    self.game.remove(self);
  }, 0);
};

module.exports = Asteroid;
