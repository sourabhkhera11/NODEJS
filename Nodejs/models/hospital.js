//Step1 Require mongoose file
const mongoose = require("mongoose");
//Step2 Crating a schema - Schema name should be capital
const Hospital = mongoose.Schema({
  hospitalName: {
    type: String,
  },
  email: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
  hospitalType: {
    type: String,
  },
  totalIcuBeds: {
    type: Number,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  registrationNumber: {
    type: String,
  },
  LicenseNumber: {
    type: String,
  },
  registrationCertificate: {
    type: String,
  },
  LicenseCertificate: {
    type: String,
  },
  pocName: {
    type: String,
  },
  pocIdProof: {
    type: String,
  },
  password: {
    type: String,
  },
});
//Step3 - Creating and exporting a model
module.exports = mongoose.model("Hospital", Hospital);
