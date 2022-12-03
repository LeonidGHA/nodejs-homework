const express = require("express");

const router = express.Router();

const control = require("../../controllers/auth");
const { cntrlWrapper } = require("../../helpers");
const { isValidBody, authentication, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post(
  "/signup",
  isValidBody(schemas.signUpSchema),
  cntrlWrapper(control.signUp)
);

router.post(
  "/verify",
  isValidBody(schemas.verificationSchema),
  cntrlWrapper(control.resendVerifivation)
);
router.get("/verify/:verificationToken", cntrlWrapper(control.verification));

router.post(
  "/login",
  isValidBody(schemas.loginSchema),
  cntrlWrapper(control.logIn)
);

router.get("/logout", authentication, cntrlWrapper(control.logOut));

router.get("/current", authentication, cntrlWrapper(control.current));

router.patch(
  "/",
  authentication,
  isValidBody(schemas.subscriptionSchema),
  cntrlWrapper(control.subscription)
);

router.patch(
  "/avatars",
  authentication,
  upload.single("avatar"),
  cntrlWrapper(control.updateAvatar)
);

module.exports = router;
