console.log("Hey from temp1.js");
console.log("Hehehehe");
function sum(a, b) {
  let total = a + b;
  console.log(total);
}
console.log(module.exports);
//older way
var name = "Sourabh khera";
// module.exports = { name, sum };
// let fname = "Sourabh";
// let lname = "khera";
// export { fname, lname };

//Another way of exporting
// module.exports.name = name;
// module.exports.sum = sum;
this.name = name;
this.sum = sum;
console.log(module.exports);
