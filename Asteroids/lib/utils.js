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
