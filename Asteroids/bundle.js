/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(5);

	var canvas = document.getElementById("game-canvas");
	var context = canvas.getContext("2d");

	var game = new Game();
	var view = new GameView(game, context);

	view.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Asteroid = __webpack_require__(2);
	var Ship = __webpack_require__(6);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(3);
	var Util = __webpack_require__(4);
	var Ship = __webpack_require__(6);

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4);

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
	};

	module.exports = MovingObject;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Util = function() {};

	Util.inherits = function (ChildClass, ParentClass) {
	  function Surrogate () {}
	  Surrogate.prototype = ParentClass.prototype;
	  ChildClass.prototype = new Surrogate();
	  ChildClass.prototype.constructor = ChildClass;
	};

	Util.randomVec = function(length){
	  var x = (Math.random() * 2 - 1) * length;

	  var yMultiplier = Math.random() > .5 ? 1 : -1;
	  var y = Math.sqrt((length * length) - (x * x)) * yMultiplier;

	  return [x, y];
	};

	Util.distance = function(pos1, pos2) {
	  var xDistance = Math.abs(pos2[0] - pos1[0]);
	  var yDistance = Math.abs(pos2[1] - pos1[1]);

	  return Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));
	};

	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);

	function GameView(game, context) {
	  this.game = game;
	  this.context = context;
	}

	GameView.prototype.start = function() {
	  var self = this;
	  setInterval(function() {
	    self.game.step(self.context);
	  }, 20);
	};

	module.exports = GameView;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(3);
	var Util = __webpack_require__(4);

	var Ship = function(options){
	  MovingObject.call(this, {
	    pos: options.pos,
	    game: options.game,
	    color: Ship.COLOR,
	    radius: Ship.RADIUS,
	    vel: [0, 0]
	  });
	};

	Util.inherits(Ship, MovingObject);

	Ship.COLOR = "green";
	Ship.RADIUS = 25;

	Ship.prototype.relocate = function(){
	  this.pos = this.game.randomPosition();
	  this.vel = [0,0];
	};

	module.exports = Ship;


/***/ }
/******/ ]);