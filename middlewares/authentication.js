const jwt = require("jsonwebtoken");

const { RequestError } = require("../helpers");

const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authentication = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(RequestError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      next(RequestError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(RequestError(401, error.message));
  }
};

module.exports = authentication;
