const adminAuth = (req, res, next) => {
  console.log("Admin auth executed!");
  const token = "xyz";
  if (token === "xyz") {
    next();
  } else {
    res.status(401).send("Unauthorised");
  }
};
const userAuth = (req, res, next) => {
  console.log("Userauth executed!");
  const token = "xyz";
  if (token === "xyz") {
    next();
  } else {
    res.status(401).send("Unauthorised");
  }
};
module.exports = { adminAuth, userAuth };
