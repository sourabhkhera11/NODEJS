//Working of Event Loop
//It has various phases which work in a loop fashion
//Also has a inner loop which is excute first before executing a outer loop
//Inner loop has nextTick and promise callbacks to handle which has higher priority also called microtask queue
//Outer loop has timer -> pool(i/o operations and network calls-> check (setImmediate) -> close
//Once every callback queue is empty node.js event loop will wait at the poll phase and start executing in that order means
// poll -> check -> close -> timer
//Example1
let fs = require("fs");
setTimeout(() => {
  console.log("Timeout");
}, 0);
setImmediate(() => {
  console.log("Immediate");
});
fs.readFile("./abc.txt", "utf8", () => {
  console.log("File readed");
});
console.log("End of the js file");
Promise.resolve("Promise").then((data) => {
  console.log(data);
});
process.nextTick(() => {
  console.log("nextTick");
});
