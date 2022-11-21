const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw RequestError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw RequestError(401, "Email or password is wrong");
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

    const dataUser = await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: {
        email: dataUser.email,
        subscription: dataUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
