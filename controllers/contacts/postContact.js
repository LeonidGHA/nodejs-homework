const contacts = require("../../models/contacts");
const RequestError = require("../../helpers/RequestError");
const { addSchema } = require("../../shemas/contacts");

const postContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
