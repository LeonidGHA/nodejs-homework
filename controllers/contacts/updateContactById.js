const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const updateContactById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const updateContact = await Contact.findOneAndUpdate(
    { owner, _id: contactId },
    req.body,
    {
      new: true,
    }
  );
  if (!updateContact) {
    throw RequestError(404, "Not found");
  }
  res.json(updateContact);
};

module.exports = updateContactById;
