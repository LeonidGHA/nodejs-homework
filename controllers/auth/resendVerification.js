const { User } = require("../../models/user");

const { RequestError, sendGridMail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerifivation = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "User not found");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Please confirm your registration",
    html: `<a target='_blank' href='${BASE_URL}/api/users/verify/${user.verificationToken}'>click here to confirm </a>`,
  };
  await sendGridMail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifivation;
