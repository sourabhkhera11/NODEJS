const express = require("express");
const router = express.Router();
const { hospitalAuth } = require("../middleware/auth");
const connectedHospitals = require("../models/connectedHospitals");

//Router level middlewares
router.use("/", (req, res, next) => {
  console.log("Connection Requests Route are working!");
  next();
});

//Create
router.post("/:status/:toHospitalId", hospitalAuth, async (req, res) => {
  try {
    const { status, toHospitalId } = req.params;
    const { _id: fromHospitalId } = req.result?._id;
    const instance = new connectedHospitals({
      fromHospitalId,
      toHospitalId,
      status,
    });
    await instance.save();
    res.status(201).send({
      message: "Connection request is successfully send!",
    });
  } catch (er) {
    res.status(400).send({
      Error: "Something went wrong!",
      message: er.message,
    });
  }
});
module.exports = router;
