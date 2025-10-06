const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};
module.exports = { dbConnect };
