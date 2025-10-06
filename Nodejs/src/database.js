const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose.connect(
    "mongodb+srv://sourabhkhera:jpRByHDn3cvc8l9o@namastenode.9ucfnln.mongodb.net/devTinder"
  );
};
module.exports = { dbConnect };
