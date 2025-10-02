const express = require("express");
const app = express();
app.use("/", (req, res, next) => {
  console.log("Global middleware");
  next();
});
app.use("/", (req, res) => {
  res.send("Hello world");
});
app.listen(7777, (req, res) => {
  console.log("Server is listening on 7777 port number");
});
