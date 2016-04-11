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


Function.prototype.curry = function(numArgs){
  var args = [];
  var fn = this;
  var _curriedFunction = function(arg){
    args.push(arg);
    if (args.length === numArgs){
      return fn.apply(fn, args);
    } else {
      return _curriedFunction;
    }
  };
  return _curriedFunction;
};

var sumThree = sum.curry(3);
console.log(sumThree(5)(6)(7));
