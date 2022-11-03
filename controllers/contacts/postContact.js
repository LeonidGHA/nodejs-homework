const { Contact, shemas } = require("../../models/contact");
const RequestError = require("../../helpers/RequestError");

const postContact = async (req, res, next) => {
  try {
    const { error } = shemas.addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
