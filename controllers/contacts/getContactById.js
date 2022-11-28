const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const contact = await Contact.findOne({ owner, contactId });
  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.json(contact);
};

module.exports = getContactById;
