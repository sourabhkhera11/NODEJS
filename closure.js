//Closure example

function hello1(x) {
  return function hello1(y) {
    console.log(x + y);
  };
}
const hehe = hello1(2);
hehe(3);

//Curing concept using closure

function table(x) {
  return function specific(y) {
    console.log(`${x} X ${y} = ${x * y}`);
  };
}
//More specialised function for table of 2
const tableOf2 = table(2);
tableOf2(1);
tableOf2(2);
tableOf2(3);
tableOf2(4);
tableOf2(5);
tableOf2(6);
tableOf2(7);
tableOf2(8);
tableOf2(9);
tableOf2(10);

//Closures are also used for encapsulation 

