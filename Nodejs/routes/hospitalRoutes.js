//step 1) Router function is used to create a mini app , to modularise the express routes
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
// require("dotenv").config();
//Step 2)require the hospital model
const hospital = require("../models/hospital");
const { hospitalAuth } = require("../middleware/auth");
const {
  registerRoute,
  isValidEmail,
  updateRoute,
  validChangePassword,
} = require("../utils/validInput");
//Step 3)
router.use(express.json()); //for parsing the content in the express body
//Hospital Application Middleware
router.use(cookieParser()); //By default req.cookies doesn't contain the cookies they first need to be parsed which is done by this default middleware
router.use((req, res, next) => {
  console.log("Hospital route is working!");
  //   res.status(200).send("Hospital route remember the name !");
  next();
});
//Create
router.post("/register", async (req, res) => {
  //Best way is fetch each field and check the things in the separate function
  //But now i don't need it as everything is check at my database level
  //Only thing i can't check there is password because there password will be hashed
  //So i will create a separate function to check the password

  try {
    registerRoute(req.body?.password);
    const {
      hospitalName,
      email,
      contactNumber,
      hospitalType,
      totalIcuBeds,
      address,
      state,
      city,
      pincode,
      registrationNumber,
      licenseNumber,
      registrationCertificate,
      licenseCertificate,
      pocName,
      pocIdProof,
      password,
    } = req.body;
    const pass = await bcrypt.hash(req.body?.password, 10);
    const instance = new hospital({
      hospitalName,
      email,
      contactNumber,
      hospitalType,
      totalIcuBeds,
      address,
      state,
      city,
      pincode,
      registrationNumber,
      licenseNumber,
      registrationCertificate,
      licenseCertificate,
      pocName,
      pocIdProof,
      password: pass,
    });
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
//Read(Old one no need now !)
router.get("/information/:hospitalName", async (req, res) => {
  const { hospitalName: name } = req?.params;
  try {
    const data = await hospital.find({ hospitalName: name });
    if (data.length === 0) {
      throw new Error("Hospital not found!");
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
//Show all hospitals(This route should be for admin not to hospital )
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
router.patch("/update", hospitalAuth, async (req, res) => {
  const { _id } = req.result;
  try {
    updateRoute(req);
    await hospital.findByIdAndUpdate(_id, req.body);
    res.status(200).send("Update successfully!");
  } catch (er) {
    res.status(400).send({
      Error: "Something went wrong!",
      message: er.message,
    });
  }
});
//Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password: pass } = req.body;
    isValidEmail(email);
    //result is the instance of the hospital
    const result = await hospital.findOne({ email: email });
    // console.log(result);
    if (!result) {
      throw new Error("Invalid credentials!");
    } else {
      const valid = await bcrypt.compare(pass, result?.password);
      if (!valid) {
        throw new Error("Invalid credentials!");
      } else {
        // console.log(result?._id);
        const token = await result.generateJWT();
        res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 3600000),
          })
          .send(result);
      }
    }
  } catch (er) {
    res.status(400).send({
      Error: "Something went wrong ",
      message: er.message,
    });
  }
});

//profile route
router.get("/profile", hospitalAuth, async (req, res) => {
  try {
    const result = req.result;
    res.status(200).send(result);
  } catch (er) {
    res.status(400).send({
      Error: "Something went wrong!",
      message: er.message,
    });
  }
});

//Get POC information
router.get("/pocInfo", hospitalAuth, async (req, res) => {
  try {
    const result = req.result;
    const { pocName, pocIdProof } = result;
    res.status(200).send({
      message: "Poc contact details!",
      data: {
        pocName,
        pocIdProof,
      },
    });
  } catch (er) {
    res.status(400).send({
      Error: "Something went wrong!",
      message: er.message,
    });
  }
});

//Logout Route
//No need to authenticate here or to check for any kind of error
//One thing -> Logout is also treated as a cleanup function, to free up the resources
router.post("/logout", (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .status(200)
    .send("Logout Successfully!");
});

//Update password
router.post("/changePassword", hospitalAuth, async (req, res) => {
  try {
    await validChangePassword(req);
    const { _id } = req.result;
    const hashPassword = await bcrypt.hash(req.body?.newPassword, 10);
    await hospital.findByIdAndUpdate(_id, { password: hashPassword });
    res.status(201).send("Password change successfuly");
  } catch (er) {
    res.status(400).send({
      Error: "There is an Error while updating the password",
      message: er.message,
    });
  }
});
module.exports = router;
