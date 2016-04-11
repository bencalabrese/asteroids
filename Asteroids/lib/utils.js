if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

window.Asteroids.Util = function() {};

window.Asteroids.Util.inherits = function (ChildClass, ParentClass) {
  function Surrogate () {}
  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
  ChildClass.prototype.constructor = ChildClass;
};

module.exports = window.Asteroids.Util;
