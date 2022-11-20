const { User } = require("../../models/user");

const subscription = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const updateUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.json(updateUser);
  } catch (error) {
    next(error);
  }
};

module.exports = subscription;
