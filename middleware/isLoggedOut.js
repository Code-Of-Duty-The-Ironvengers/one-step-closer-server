const goHomeYoureDrunk = require("../utils/go-home-youre-drunk");

module.exports = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return goHomeYoureDrunk(res);
  }
  next();
};
