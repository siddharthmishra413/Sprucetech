const jwt = require("jsonwebtoken");
const fs = require("fs");

const User = require("../models/user.model");
const publicKey = fs.readFileSync(process.env.PUBLIC_KEY);

let authenticate = async (req, res, next) => {
  let authHeader = req.headers.api_token;

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  let authenticatedUser;
  try {
    // authenticatedUser = jwt.verify(authHeader, publicKey, { algorithms: ['ES512'] })
    authenticatedUser = jwt.verify(authHeader, process.env.SECRET_KEY);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  let user = await User.findOne({ _id: authenticatedUser.user._id });

  if (!user) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;

  req.isAdmin = false;
  if (user.userRole) {
    let role = user.userRole.map(element => element.role);
    if (role.includes("admin")) req.isAdmin = true;
  }

  return next();
};

module.exports = authenticate;
