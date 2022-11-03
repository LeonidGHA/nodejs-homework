const { Contact, shemas } = require("../../models/contact");
const RequestError = require("../../helpers/RequestError");

const putContact = async (req, res, next) => {
  try {
    const { error } = shemas.putSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;
    const changedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );
    if (!changedContact) {
      throw RequestError(404, "Not found");
    }
    res.json(changedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = putContact;
