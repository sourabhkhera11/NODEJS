const validator = require("validator");
const bcrypt = require("bcrypt");
const registerRoute = (password) => {
  const result = validator.isStrongPassword(password);
  if (!result) {
    throw new Error("Password is not strong enough!");
  }
};
const isValidEmail = (email) => {
  const result = validator.isEmail(email);
  if (!result) {
    throw new Error("Not a valid email!");
  }
};
const updateRoute = (req) => {
  const VALID_FIELDS = [
    "hospitalName",
    "totalIcuBeds",
    "address",
    "state",
    "city",
    "pincode",
    "pocName",
    "pocIdProof",
  ];
  const data = req.body;
  var status = Object.keys(data).every((value) => VALID_FIELDS.includes(value));
  if (!status) {
    throw new Error("These fields can't be updated!");
  }
  const { hospitalName, totalIcuBeds, address, state, city, pincode, pocName } =
    data;
  if (hospitalName && (hospitalName.length < 5 || hospitalName.length > 35)) {
    throw new Error("Not a valid hospital name!");
  }
  if (totalIcuBeds && (totalIcuBeds < 10 || totalIcuBeds > 200)) {
    throw new Error("Not a valid number of icu beds!");
  }
  if (address && (address.length < 5 || address.length > 100)) {
    throw new Error("Not a valid address!");
  }
  if (state && (state.length < 3 || state.length > 30)) {
    throw new Error("Not a valid state!");
  }
  if (city && (city.length < 3 || city.length > 30)) {
    throw new Error("Not a valid city!");
  }
  if (pincode && pincode.length != 6) {
    throw new Error("Not a valid pincode!");
  }
  if (pocName && (pocName.length < 3 || pocName.length > 35)) {
    throw new Error("Not a valid pocName name!");
  }
};
const validChangePassword = async (req) => {
  const { currentPassword, newPassword } = req.body;

  const { _id, password } = req.result;
  const status =await bcrypt.compare(currentPassword, password);
  if (!status) {
    throw new Error("Invlaid password!");
  }
  if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Not a strong Password!");
  }
};
module.exports = {
  registerRoute,
  isValidEmail,
  updateRoute,
  validChangePassword,
};
