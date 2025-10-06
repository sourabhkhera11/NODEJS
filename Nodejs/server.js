const express = require("express");
const app = express();
const { dbConnect } = require("./src/database");
const morgan = require("morgan");
//Best practice is ->First database connected then server listen
dbConnect()
  .then(() => {
    console.log("Successfully connected to DB!");
    app.listen(4000, () => {
      console.log("Server is listening on 4000 port!!");
    });
  })
  .catch((er) => {
    console.error("Failed to connect with DB!");
  });
app.use(morgan("dev"));
app.use((req, res) => {
  res.send("Hello World!");
});
