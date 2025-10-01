const express = require("express");
const app = express();
require("dotenv").config();
//Here position metters when we are using the use middleware
app.get("/hello", (req, res) => {
  res.send("Post hello");
});
app.use("/hello", (req, res) => {
  res.send("Hello from hello tab");
});
app.get("/user", (req, res) => {
  res.send("User data is fetched!");
});
app.post("/user", (req, res) => {
  const data = req.body;
  console.log(data);
  res.send(`Data is received ${data}`);
});
app.use("/", (req, res) => {
  res.send("Hello World");
});
const port = process.env.PORT_NO;
app.listen(port);
/*  Use npm run <Script name to start this*/
