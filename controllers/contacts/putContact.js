const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const putContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const changedContact = await Contact.findOneAndUpdate(
      { owner, contactId },
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
