const express = require("express");

const router = express.Router();

const control = require("../../controllers/contacts");
const { isValidId } = require("../../middlewares");

router.get("/", control.getAllContacts);

router.get("/:contactId", isValidId, control.getContactById);

router.post("/", control.postContact);

router.delete("/:contactId", isValidId, control.deleteContact);

router.put("/:contactId", isValidId, control.putContact);

router.patch("/:contactId/favorite", isValidId, control.updateContactById);

module.exports = router;
