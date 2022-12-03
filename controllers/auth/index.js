const signUp = require("./signup");
const verification = require("./verification");
const logIn = require("./login");
const logOut = require("./logout");
const current = require("./current");
const subscription = require("./subscription");
const updateAvatar = require("./updateAvatar");
const resendVerifivation = require("./resendVerification");

module.exports = {
  signUp,
  verification,
  resendVerifivation,
  logIn,
  logOut,
  current,
  subscription,
  updateAvatar,
};
