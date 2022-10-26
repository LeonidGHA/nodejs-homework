const contacts = require("../../models/contacts");
const RequestError = require("../../helpers/RequestError");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      throw RequestError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getContactById;
