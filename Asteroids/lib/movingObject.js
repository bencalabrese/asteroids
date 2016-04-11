if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

window.Asteroids.MovingObject = function(options){
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
};

window.Asteroids.MovingObject.prototype.draw = function(context){
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

window.Asteroids.MovingObject.prototype.move = function(){
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

module.exports = window.Asteroids.MovingObject;
