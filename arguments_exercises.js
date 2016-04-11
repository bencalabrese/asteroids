function sum() {
  var args = Array.prototype.slice.call(arguments);
  return args.reduce(function(accum, el) {
    return accum + el;
  });
}

console.log(sum(1,2,3,4));
