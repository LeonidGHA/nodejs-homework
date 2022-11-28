const { User } = require("../../models/user");

const subscription = async (req, res, next) => {
  const { _id } = req.user;

  const updateUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.json(updateUser);
};

module.exports = subscription;
