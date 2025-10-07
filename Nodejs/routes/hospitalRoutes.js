//step 1) Router function is used to create a mini app , to modularise the express routes
const express = require("express");
const router = express.Router();
//Step 2)require the hospital model
const hospital = require("../models/hospital");
//Step 3)
router.use(express.json()); //for parsing the content in the express body
//Hospital Application Middleware
router.use((req, res, next) => {
  console.log("Hospital route is working!");
  //   res.status(200).send("Hospital route remember the name !");
  next();
});
//Create
router.post("/register", async (req, res) => {
  //   const { hospitalName, email } = req.body;
  //   console.log(req.body);

  //   console.log(hospitalName, email);
  const instance = new hospital(req.body);
  try {
    await instance.save();
    res.status(201).send({
      message: "Hospital created successfully!",
      content: {
        id: instance._id,
        hospitalName: instance?.hospitalName,
      },
    });
  } catch (err) {
    res.status(400).send({
      Eroor: "Something Went Wrong! endpoint -> /register",
      message: err.message,
    });
  }
});
//Read
router.get("/information/:hospitalName", async (req, res) => {
  const { hospitalName: name } = req?.params;
  try {
    const data = await hospital.find({ hospitalName: name });
    res.status(200).send(data);
  } catch (er) {
    res.status(400).send({
      Error: "Something went wrong!",
      message: er.message,
    });
  }
});
//Show all hospitals
router.get("/hospitals", async (req, res) => {
  const data = await hospital.find({});
  try {
    if (!data) {
      res.status(400).send("Data not present!");
    } else {
      res.status(200).send(data);
    }
  } catch (er) {
    res.status(400).send({
      Error: "Something went wrong!",
      message: er.message,
    });
  }
});
//Update the hospital
//In this you must specify which fields can update which cant
//Means you need to specify which are the sensitive fields
router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const VALID_FIELDS = [
    "hospitalName",
    "totalIcuBeds",
    "address",
    "state",
    "city",
    "pincode",
    "pocName",
    "pocIdProof",
  ];
  const data = req.body;
  try {
    const result = Object.keys(data).every((value) => {
      VALID_FIELDS.includes(value);
    });
    if (!result) {
      throw new Error("These fields can't be updated!");
    }
    await hospital.findByIdAndUpdate(id, req.body);
    res.status(200).send("Update successfully!");
  } catch (er) {
    res.status(400).send({
      Error: "Something went wrong!",
      message: er.message,
    });
  }
});

module.exports = router;
