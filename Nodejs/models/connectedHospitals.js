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
    ref: "Hospital",
  },
  toHospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Hospital",
  },
  status: {
    type: String,
    enum: {
      values: ["ignored", "interested", "accepted", "rejected"],
      message: "{VALUE} can't be value of the status!",
    },
  },
});

//Compound Indexing as here we will search for the connection between two ids
connectedHospitals.index({ fromHospitalId: 1, toHospitalId: 1 });

//Schema pre fuctions
//Cant send the request to yourself
connectedHospitals.pre("save", function (next) {
  if (this.fromHospitalId.equals(this.toHospitalId)) {
    throw new Error("You can't sent request to yourself!");
  }
  next();
});
module.exports = mongoose.model("connectedHospitals", connectedHospitals);
