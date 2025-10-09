const hospital = require("../models/hospital");
const jwt = require("jsonwebtoken");
const hospitalAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Not authorized!");
    }
    const { _id } = await jwt.verify(token, process.env.JWT_SECRET);
    const result = await hospital.findOne({ _id: _id });
    if (result.length == 0) {
      throw new Error("Not a valid hospital!");
    }
    req.result = result;
    next();
  } catch (er) {
    res.status(400).send({
      Error: "Something went wrong!",
      message: er.message,
    });
  }
};

module.exports = { hospitalAuth };
