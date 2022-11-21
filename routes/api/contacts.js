const express = require("express");

const router = express.Router();

const control = require("../../controllers/contacts");
const { isValidId, authentication, isValidBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authentication, control.getAllContacts);

router.get("/:contactId", authentication, isValidId, control.getContactById);

router.post(
  "/",
  authentication,
  isValidBody(schemas.addSchema),
  control.postContact
);

router.delete("/:contactId", authentication, isValidId, control.deleteContact);

router.put(
  "/:contactId",
  isValidBody(schemas.putSchema),
  authentication,
  isValidId,
  control.putContact
);

router.patch(
  "/:contactId/favorite",
  isValidBody(schemas.updateSchema),
  authentication,
  isValidId,
  control.updateContactById
);

module.exports = router;
