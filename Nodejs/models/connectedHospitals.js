const mongoose = require("mongoose");
/* 
-Create the schema 
-Validation of schema 
-Api to make request 
-Api validation 
-MongoDb queries
-Compound Indexing for fetching the information 
-Schema pre function for schema validation 
*/
const connectedHospitals = mongoose.Schema({
  fromHospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  toHospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: {
      values: ["ignored", "interested", "accepted", "rejected"],
      message: `${value} can't be value of the status!`,
    },
  },
});

const connectedHospitalsModel = mongoose.model(
  "connectedHospitals",
  connectedHospitals
);
module.exports = connectedHospitalsModel;
