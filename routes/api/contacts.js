const express = require("express");

const router = express.Router();

const control = require("../../controllers/contacts");
const { cntrlWrapper } = require("../../helpers");
const { isValidId, authentication, isValidBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authentication, cntrlWrapper(control.getAllContacts));

router.get(
  "/:contactId",
  authentication,
  isValidId,
  cntrlWrapper(control.getContactById)
);

router.post(
  "/",
  authentication,
  isValidBody(schemas.addSchema),
  cntrlWrapper(control.postContact)
);

router.delete(
  "/:contactId",
  authentication,
  isValidId,
  cntrlWrapper(control.deleteContact)
);

router.put(
  "/:contactId",
  authentication,
  isValidId,
  isValidBody(schemas.putSchema),
  cntrlWrapper(control.putContact)
);

router.patch(
  "/:contactId/favorite",
  isValidBody(schemas.updateSchema),
  authentication,
  isValidId,
  cntrlWrapper(control.updateContactById)
);

module.exports = router;
