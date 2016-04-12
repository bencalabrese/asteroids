var Asteroid = require('./asteroid.js');

function Game () {
  this.asteroids = this.addAsteroids();
}

Game.DIM_X = 1000;
Game.DIM_Y = 800;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function () {
  var asteroids = [];
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++){
    asteroids.push(new Asteroid({pos: Game.randomPosition(), game: this}));
  }
  return asteroids;
};

Game.randomPosition = function(){
  var x = Math.floor(Math.random() * Game.DIM_X);
  var y = Math.floor(Math.random() * Game.DIM_Y);
  return [x, y];
};

Game.prototype.draw = function(context){

  context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.asteroids.forEach(function(el){
    el.draw(context);
  });
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(function(el){
    el.move();
  });
};

Game.prototype.wrap = function(pos){
  var x = (pos[0] + Game.DIM_X) % Game.DIM_X;
  var y = (pos[1] + Game.DIM_Y) % Game.DIM_Y;
  return [x, y];
};

Game.prototype.checkCollisions = function () {
  for (var i = 0; i < this.asteroids.length; i++) {
    for (var j = i + 1; j < this.asteroids.length; j++) {
      if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
        this.asteroids[i].collideWith(this.asteroids[j]);
      }
    }
  }
};

Game.prototype.step = function(context){
  this.moveObjects();
  this.checkCollisions();
  this.draw(context);
};

Game.prototype.remove = function(asteroid){
  this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
};

module.exports = Game;
