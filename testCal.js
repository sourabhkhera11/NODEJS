let {
  addition: add,
  subtraction: sub,
  multiplication: mul,
  division: div,
} = require("./calculator");
//It doesn't require the whole path here it just require the module name
//Only valid when the main file name is index.js other wise it takes the whole path
let a = 10;
let b = 5;
add(a, b);
sub(a, b);
mul(a, b);
div(a, b);
(function (a) {
  console.log(`Hello im IIFE! ${a}`);
})("Heheh");
setTimeout(() => {
  console.log("Hello guys!");
}, 3000);
