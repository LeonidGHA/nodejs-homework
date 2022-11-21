const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw RequestError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, password: hashPassword });

    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;
