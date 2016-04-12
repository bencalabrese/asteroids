var Game = require("./game.js");
var key = require("../keymaster.js");

function GameView(game, context) {
  this.game = game;
  this.context = context;
}

GameView.prototype.start = function() {
  var self = this;
  this.bindKeyHandlers();
  setInterval(function() {
    self.game.step(self.context);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function () {
  key('enter', function(){
    alert('you pressed a!');
  });
};

module.exports = GameView;
