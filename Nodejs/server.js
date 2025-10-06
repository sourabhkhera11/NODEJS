const express = require("express");
const app = express();
const { dbConnect } = require("./src/database");
//Here user is an object (model object )
const User = require("./models/user");
const morgan = require("morgan");
//Best practice is ->First database connected then server listen
app.use(morgan("dev"));
app.use(express.json());
//Store data into the database (Create)
app.post("/register", async (req, res) => {
  const { firstName, lastName, age, phoneNumber, address } = req.body;
  const instance = new User({
    firstName,
    lastName,
    age,
    phoneNumber,
    address,
  });
  try {
    await instance.save();
    res.status(201).send({
      message: "User is created!",
      user: {
        id: instance._id,
        name: instance.firstName,
      },
    });
  } catch (err) {
    res.status(400).send({
      message: "User not created!",
    });
  }
});
//Read data from the database (Read)
//Make sure to always use async await for mongoose function as they return promises
app.get("/specificUser", async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const data = await User.find({ phoneNumber: phoneNumber });
    if (!data) {
      res.status(404).send("Data not found!");
    } else {
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(400).send("Somthing went wrong!");
  }
});

//Get all the data
app.get("/allUsers", async (req, res) => {
  try {
    const data = await User.find({}); //This will return all the data
    if (!data) {
      res.status(403).send("Data not found!");
    } else {
      res.status(200).send(data);
    }
  } catch (er) {
    res.status(400).send("Something went wrong!");
  }
});
//Modify data into the database(Update)
app.put("/modify/:id", async (req, res) => {
  const { id } = req.params;
  //   const { firstName, lastName } = req.body;
  try {
    await User.findByIdAndUpdate(id, {
      firstName: "Tushar",
      lastName: "Verma",
    });
    res.status(200).send("User modify successfully");
  } catch (er) {
    res.status(400).send("Bad request!");
  }
});

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
app.use((req, res) => {
  res.send("Hello World!");
});
