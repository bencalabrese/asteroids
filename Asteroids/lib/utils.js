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
