const contacts = require("../../models/contacts");
const RequestError = require("../../helpers/RequestError");
const { putSchema } = require("../../shemas/contacts");

const putContact = async (req, res, next) => {
  try {
    const { error } = putSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;
    const changedContact = await contacts.updateContact(contactId, req.body);
    if (!changedContact) {
      throw RequestError(404, "Not found");
    }
    res.json(changedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = putContact;
