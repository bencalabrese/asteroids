var Asteroid = require('./asteroid.js');

function Game () {
  this.asteroids = this.addAsteroids();
}

Game.DIM_X = 1000;
Game.DIM_Y = 800;
Game.NUM_ASTEROIDS = 5;

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

module.exports = Game;
