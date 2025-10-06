const mongoose = require("mongoose");
//Create a schema
const User = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  phoneNumber: {
    type: Number,
  },
  address: {
    type: String,
  },
});

//A collection of User will be form at the database
// const m = mongoose.model("User", User);
//No need to array distructuting at the import side beacuse we need
//model object directly
// const {n}=m;
// console.log(m);
// console.log(n);

module.exports = mongoose.model("User", User);
