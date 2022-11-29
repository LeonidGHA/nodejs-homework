const fs = require("fs/promises");
const path = require("path");
// const jimp = require("jimp");

const { User } = require("../../models/user");
const { defaultAvatar } = require("../../helpers");

const tempDir = path.join(__dirname, "../../", "temp");

const updateAvatar = async (req, res) => {
  const { user } = req;
  const { originalname } = req.file;

  const newAvatar = await defaultAvatar(req);

  const removeUpload = path.join(tempDir, originalname);

  await fs.unlink(removeUpload);
  const avatarURL = newAvatar;
  await User.findByIdAndUpdate(user._id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = updateAvatar;
