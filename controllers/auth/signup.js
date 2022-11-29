const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { s: "250" });

  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = signUp;
