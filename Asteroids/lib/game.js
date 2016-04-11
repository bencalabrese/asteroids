var Asteroid = require('./asteroid.js');

function Game () {
  this.asteroids = Game.addAsteroids();
}

Game.DIM_X = 400;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 5;

Game.addAsteroids = function () {
  var asteroids = [];
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++){
    asteroids.push(new Asteroid({pos: Game.randomPosition()}));
  }
  return asteroids;
};

Game.randomPosition = function(){
  var x = Math.floor(Math.random() * Game.DIM_X);
  var y = Math.floor(Math.random() * Game.DIM_Y);
  return [x, y];
};

Game.prototype.draw = function(context){
  context.clearRect(0, 0, this.DIM_X, this.DIM_Y);

  this.asteroids.forEach(function(el){
    el.draw(context);
  });
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(function(el){
    el.move();
  });
};

module.exports = Game;
