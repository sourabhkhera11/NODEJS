//Step1 Require mongoose file
const mongoose = require("mongoose");
//Step2 Crating a schema - Schema name should be capital
const Hospital = mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
      maxLength: 35,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 10,
      maxLength: 10,
    },
    hospitalType: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ["private", "government"],
    },
    totalIcuBeds: {
      type: Number,
      required: true,
      trim: true,
      min: 5,
      max: 200,
    },
    address: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    pincode: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
      maxLength: 6,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    registrationCertificate: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    licenseCertificate: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    pocName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    pocIdProof: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { Timestamp: true }
);
//Step3 - Creating and exporting a model
module.exports = mongoose.model("Hospital", Hospital);
