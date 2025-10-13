const express = require("express");
const router = express.Router();
const { hospitalAuth } = require("../middleware/auth");
const connectedHospitals = require("../models/connectedHospitals");
const hospitals = require("../models/hospital");
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
//To view all the connected hospitals
/*things to keep in mind
1)Not shown its own profile 
2)Not shown anybody who is already connected
 */
router.get("/connected", hospitalAuth, async (req, res) => {
  try {
    const { _id } = req.result;
    const data1 = await connectedHospitals
      .find({
        toHospitalId: _id,
        status: "accepted",
      })
      .populate("fromHospitalId", "hospitalName");
    // console.log(data);
    const filter1 = data1.map((value) => {
      return value?.fromHospitalId?.hospitalName;
    });
    const data2 = await connectedHospitals
      .find({
        fromHospitalId: _id,
        status: "accepted",
      })
      .populate("toHospitalId", "hospitalName");
    // console.log(data);
    const filter2 = data2.map((value) => {
      return value?.fromHospitalId?.hospitalName;
    });
    const merge = [...filter1, ...filter2];
    res.status(200).send({
      message: "All the connected hospitals are:",
      data: merge,
    });
  } catch (er) {
    res.status(400).send({
      error: "Something went wrong!",
      message: er.message,
    });
  }
});
router.get("/activity", hospitalAuth, async (req, res) => {
  try {
    const { _id: loginId } = req.result;
    const linkedHos = await connectedHospitals
      .find({
        $or: [{ fromHospitalId: loginId }, { toHospitalId: loginId }],
      })
      .populate("fromHospitalId", "hospitalName")
      .populate("toHospitalId", "hospitalName");
    res.status(200).send(linkedHos);
  } catch (er) {
    res.status(400).send({
      error: "Something went wrong!",
      message: er.message,
    });
  }
});
router.get("/home", hospitalAuth, async (req, res) => {
  try {
    const { _id: loginId } = req.result;
    const linkedHos = await connectedHospitals
      .find({
        $or: [{ fromHospitalId: loginId }, { toHospitalId: loginId }],
      })
      .select("fromHospitalId toHospitalId");
    const hideIds = new Set();
    linkedHos.forEach((element) => {
      hideIds.add(element?.fromHospitalId.toString());
      hideIds.add(element?.toHospitalId.toString());
    });
    const feed = await hospitals
      .find({
        _id: { $nin: Array.from(hideIds) },
      })
      .select("hospitalName");
    // console.log(hideIds);
    res.status(200).send(feed);
  } catch (er) {
    res.status(400).send({
      error: "Something went wrong!",
      message: er.message,
    });
  }
});
module.exports = router;
