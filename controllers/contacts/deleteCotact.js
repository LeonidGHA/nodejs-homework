const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const deleteContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const delContact = await Contact.findOneAndDelete({ owner, contactId });
    if (!delContact) {
      throw RequestError(400, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
