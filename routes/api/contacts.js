const express = require("express");

const router = express.Router();

const control = require("../../controllers/contacts");

router.get("/", control.getAllContacts);

router.get("/:contactId", control.getContactById);

router.post("/", control.postContact);

router.delete("/:contactId", control.deleteContact);

router.put("/:contactId", control.putContact);

module.exports = router;
