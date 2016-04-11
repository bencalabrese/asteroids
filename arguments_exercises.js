function sum() {
  console.log(this);
  var args = Array.prototype.slice.call(arguments);
  return args.reduce(function(accum, el) {
    return accum + el;
  });
}

console.log(sum(1,2,3,4));

Function.prototype.myBind = function(context) {
  var args = Array.prototype.slice.call(arguments).slice(1);
  var fn = this;
  return function(){
    return fn.apply(context, args);
  };
};

var Dog = {
  name: "Rufus"
};

console.log(sum.myBind(Dog, 1, 2, 3)());
