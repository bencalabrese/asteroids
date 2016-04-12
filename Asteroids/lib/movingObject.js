var Util = require("./utils.js");

var MovingObject = function(options){
  this.pos = options.pos;
  this.game = options.game;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
};

MovingObject.prototype.draw = function(context){
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  context.fill();
};

MovingObject.prototype.move = function(){
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];

  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function(otherObject){
  var distance = Util.distance(this.pos, otherObject.pos);

  return distance < (this.radius + otherObject.radius);
};

MovingObject.prototype.collideWith = function(otherObject){
  var self = this;

  setTimeout(function() {
    self.game.remove(otherObject);
    self.game.remove(self);
  }, 0);
};

module.exports = MovingObject;
