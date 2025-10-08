//Step1 Require mongoose file
const mongoose = require("mongoose");
const validator = require("validator");
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
      // match: [
      //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //   "Please fill a valid email address",
      // ],
      validate(value) {
        const result = validator.isEmail(value);
        if (!result) {
          throw new Error("Not a valid email!");
        }
      },
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
      minLength: 5,
      maxLength: 100,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 30,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      minLength: 3,
      maxLength: 30,
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
      minLength: 5,
      maxLength: 30,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 5,
      maxLength: 30,
    },
    registrationCertificate: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        const result = validator.isURL(value);
        if (!result) {
          throw new Error("Not a valid URL");
        }
      },
    },
    licenseCertificate: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        const result = validator.isURL(value);
        if (!result) {
          throw new Error("Not a valid URL");
        }
      },
    },
    pocName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 35,
    },
    pocIdProof: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        const result = validator.isURL(value);
        if (!result) {
          throw new Error("Not a vlaid poc ID proof!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 500,
    },
  },
  { timestamps: true }
);
//Step3 - Creating and exporting a model
module.exports = mongoose.model("Hospital", Hospital);
