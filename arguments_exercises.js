function sum() {
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

function curriedSum(numArgs) {
  var numbers = [];
  var _curriedSum = function(number) {
    numbers.push(number);
    if (numbers.length === numArgs) {
      return sum.apply(null, numbers);
    } else {
      return _curriedSum;
    }
  };

  return _curriedSum;
}

var sumFour = curriedSum(4);

console.log(sumFour(5)(30)(20)(1));
