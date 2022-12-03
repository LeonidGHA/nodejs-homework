const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
require("dotenv").config();

const { BASE_URL } = process.env;

const { User } = require("../../models/user");

const { RequestError, sendGridMail } = require("../../helpers");

const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { s: "250" });

  const verificationToken = nanoid();

  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Please confirm your registration",
    html: `<a target='_blank' href='${BASE_URL}/api/users/verify/${newUser.verificationToken}'>click here to confirm </a>`,
  };

  await sendGridMail(mail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    verificationToken: newUser.verificationToken,
  });
};

module.exports = signUp;
