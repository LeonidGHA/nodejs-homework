const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const deleteContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const delContact = await Contact.findOneAndDelete({
    owner,
    _id: contactId,
  });
  if (!delContact) {
    throw RequestError(400, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteContact;
