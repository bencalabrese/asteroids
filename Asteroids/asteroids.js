var Game = require("./lib/game.js");
var GameView = require("./lib/gameView.js");

var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");

var game = new Game();
var view = new GameView(game, context);

view.start();
