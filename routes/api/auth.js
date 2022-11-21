const express = require("express");

const router = express.Router();

const control = require("../../controllers/auth");
const { isValidBody, authentication } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post("/signup", isValidBody(schemas.signUpSchema), control.signUp);
router.post("/login", isValidBody(schemas.loginSchema), control.logIn);
router.get("/logout", authentication, control.logOut);
router.get("/current", authentication, control.current);
router.patch(
  "/",
  authentication,
  isValidBody(schemas.subscriptionSchema),
  control.subscription
);

module.exports = router;
