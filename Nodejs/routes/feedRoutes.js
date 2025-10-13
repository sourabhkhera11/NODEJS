const express = require("express");
const router = express.Router();
const { hospitalAuth } = require("../middleware/auth");
const connectedHospitals = require("../models/connectedHospitals");
//Application level api
router.use("/", (req, res, next) => {
  console.log("Feed API's working fine!");
  next();
});

//To view all the requests which are pending
router.get("/pending", hospitalAuth, async (req, res) => {
  try {
    const { _id } = req.result;
    const data = await connectedHospitals
      .find({
        toHospitalId: _id,
        status: "interested",
      })
      .populate("fromHospitalId", "hospitalName");
    // console.log(data);

    const filter = data.map((value) => {
      return value?.fromHospitalId?.hospitalName;
    });
    res.status(200).send({
      message: "All the pending requests are:",
      data: filter,
    });
  } catch (er) {
    res.status(400).send({
      error: "Something went wrong!",
      message: er.message,
    });
  }
});
module.exports = router;
