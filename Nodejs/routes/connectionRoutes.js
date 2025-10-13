const express = require("express");
const router = express.Router();
const { hospitalAuth } = require("../middleware/auth");
const connectedHospitals = require("../models/connectedHospitals");
const {
  validRequest,
  validStatus,
  validHospital,
  validReview,
} = require("../utils/validInput");
//Router level middlewares
router.use("/", (req, res, next) => {
  console.log("Connection Requests Route are working!");
  next();
});

//Create
/* 
various edge cases that we take care of 
1)Not sending request to itself -> Using presave schema functions 
2)Hos1 requested to hos2 then hos2 can't send request to hos1
3)Hos1 cant send request again to hos2
4)Valid status -> only interested or ignored 
5)Valid toHospitalId must be a registered hospital 
6)Used compound indexing for searching together using toHos and fromHos
7)Used the schema pre function 
8)Used the mongoDb queries like or and etc */
router.post("/send/:status/:toHospitalId", hospitalAuth, async (req, res) => {
  try {
    const { status, toHospitalId } = req.params;
    const { _id: fromHospitalId } = req.result?._id;
    await validRequest(fromHospitalId, toHospitalId);
    await validStatus(status);
    await validHospital(toHospitalId);
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

//Accept or reject the connection request
/* 
Higher level -> User data validation 
1)Auth toHospitalId must be login ✔
2)Valid status -> Accepted / Rejected ✔
3)Valid fromHospitalId must be there in the database✔ 
Lower level
4)fromHospitalId and tohospitalId exist in the database and there status must be interested ✔
 */
router.patch(
  "/review/:status/:fromHospitalId",
  hospitalAuth,
  async (req, res) => {
    try {
      const { status, fromHospitalId } = req.params;
      const { _id: toHospitalId } = req.result?._id;
      const data = await validReview(status, fromHospitalId, toHospitalId);
      console.log(data);
      
      console.log(data?._id);

      await connectedHospitals.updateOne(
        { _id: data?._id },
        { $set: { status: status } }
      );
      res.status(200).send(`Connection request is ${status}`);
    } catch (Er) {
      res.status(400).send({
        Error: "Something went wrong!",
        message: Er.message,
      });
    }
  }
);
module.exports = router;
