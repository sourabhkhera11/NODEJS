const express = require("express");
const app = express();
const morgan = require("morgan");
const { adminAuth, userAuth } = require("./middleware/auth");

app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("Application level middleware");
  next();
});
//Login route
app.use("/login", (req, res) => {
  res.send("token");
});

//admin auth for all the admin handlers

app.use("/admin", adminAuth);

//Get all the data
app.use("/admin/getAllData", (req, res) => {
  res.send("All admin data");
});
app.use("/admin/deleteAdminData", (req, res) => {
  res.send("Delete the admin data");
});

//user auth
app.use("/user", userAuth);
//get user data
app.use("/user/data", (req, res) => {
  res.send("user data");
});
//delete a user
app.use("/user/delete", (req, res) => {
  throw new Error("HHAHAHHA");
  res.send("Delete user data");
});

//Global error handler
app.use("/", (err, req, res, next) => {
  if (err) {
    console.log(err); //for us to see whats the error
    res.status(500).send("Some error is occured!");
  }
});
app.listen(3001, () => {
  console.log("Server is running at 3001");
});
