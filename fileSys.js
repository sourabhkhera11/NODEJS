let fs = require("fs");
//It is asynchronous in nature which means it will not block the main thread of execution
fs.readFile("./abc.txt", "utf8", (err, data) => {
  console.log(data);
});
fs.readFileSync("./abc.txt", "utf8", (err, data) => {
  console.log(data);
});
