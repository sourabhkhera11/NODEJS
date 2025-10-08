const validator = require("validator");

const registerRoute = (password) => {
  const result = validator.isStrongPassword(password);
  if (!result) {
    throw new Error("Password is not strong enough!");
  }
};
const loginRoute = (email) => {
  const result = validator.isEmail(email);
  if (!result) {
    throw new Error("Not a valid email!");
  }
};
module.exports = { registerRoute, loginRoute };
