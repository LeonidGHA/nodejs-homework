const jimp = require("jimp");

const defaultAvatar = async (req) => {
  const { user } = req;
  const { path: tempUpload, originalname } = req.file;
  // console.log(req.file);
  const newFileName = `/avatars/${user._id}_${originalname}`;
  const newAvatar = await jimp.read(tempUpload);
  await newAvatar.resize(250, 250);
  await newAvatar.writeAsync(`public${newFileName}`);
  return newFileName;
};

module.exports = defaultAvatar;
