var Asteroid = require('./asteroid.js');
var Ship = require('./ship.js');

function Game () {
  this.asteroids = this.addAsteroids();
  this.ship = new Ship({pos: Game.prototype.randomPosition(), game: this});
}

Game.DIM_X = 1000;
Game.DIM_Y = 800;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function () {
  var asteroids = [];
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++){
    asteroids.push(new Asteroid({pos: Game.prototype.randomPosition(), game: this}));
  }
  return asteroids;
};

Game.prototype.randomPosition = function(){
  var x = Math.floor(Math.random() * Game.DIM_X);
  var y = Math.floor(Math.random() * Game.DIM_Y);
  return [x, y];
};

Game.prototype.draw = function(context){

  context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach(function(el){
    el.draw(context);
  });
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(function(el){
    el.move();
  });
};

Game.prototype.wrap = function(pos){
  var x = (pos[0] + Game.DIM_X) % Game.DIM_X;
  var y = (pos[1] + Game.DIM_Y) % Game.DIM_Y;
  return [x, y];
};

Game.prototype.checkCollisions = function () {
  for (var i = 0; i < this.allObjects().length; i++) {
    for (var j = i + 1; j < this.allObjects().length; j++) {

      if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
        this.allObjects()[i].collideWith(this.allObjects()[j]);
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

Game.prototype.allObjects = function () {
  return this.asteroids.concat([this.ship]);
};
module.exports = Game;
