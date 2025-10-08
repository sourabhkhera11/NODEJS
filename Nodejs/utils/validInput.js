const validator = require("validator");

const registerRoute = (password) => {
  const result = validator.isStrongPassword(password);
  if (!result) {
    throw new Error("Password is not strong enough!");
  }
};
module.exports = { registerRoute };
