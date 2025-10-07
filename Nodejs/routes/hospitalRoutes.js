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
  const { hospitalName, email } = req.body;
  console.log(hospitalName, email);
  const instance = new hospital({
    hospitalName: hospitalName,
    email: email,
  });
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
    res.status(400).send(err);
  }
});


module.exports = router;
