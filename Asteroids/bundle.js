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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(3);
	var Util = __webpack_require__(4);

	var Asteroid = function(options){
	  this.pos = options.pos;
	  this.color = Asteroid.COLOR;
	  this.radius = Asteroid.RADIUS;
	  this.vel = Util.randomVec(5);
	};

	Util.inherits(Asteroid, MovingObject);

	Asteroid.COLOR = "000000";
	Asteroid.RADIUS = 5;

	module.exports = Asteroid;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var MovingObject = function(options){
	  this.pos = options.pos;
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
	    self.game.moveObjects();
	    self.game.draw(self.context);
	  }, 20);
	};

	module.exports = GameView;


/***/ }
/******/ ]);