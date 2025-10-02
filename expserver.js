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
//query parameter
app.post("/rollno", (req, res) => {
  //Object destructuring on the fly
  const { rollno: id, name: Name } = req.query;
  console.log(req.query);
  res.send(`Rollno: ${id} and Name=${Name}`);
});
//Dynamic parameters
app.get("/student/:id", (req, res) => {
  const id = req.params;
  console.log(id);
  res.send(`Student id =${id.id}`);
});
app.use("/", (req, res) => {
  res.send("Hello World");
});
const port = process.env.PORT_NO;
app.listen(port);
/*  Use npm run <Script name to start this*/
