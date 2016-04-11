Function.prototype.inherits = function (SuperClass) {
  function Surrogate () {}
  Surrogate.prototype = SuperClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

function MovingObject () {}
MovingObject.prototype.a = function () {
  return "a";
};

function Ship () {}
Ship.inherits(MovingObject);
Ship.prototype.b = function () {
  return "b";
};


function Asteroid () {}
Asteroid.inherits(MovingObject);
Asteroid.prototype.c = function () {
  return "c";
};
