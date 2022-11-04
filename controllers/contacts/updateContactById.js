const { Contact, shemas } = require("../../models/contact");
const { RequestError } = require("../../helpers/RequestError");

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = shemas.updateSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!updateContact) {
      throw RequestError(404, "Not found");
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;
