var Game = require("./game.js");

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
