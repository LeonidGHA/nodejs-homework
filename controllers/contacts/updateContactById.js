const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const updateContactById = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const updateContact = await Contact.findOneAndUpdate(
      { owner, contactId },
      req.body,
      {
        new: true,
      }
    );
    if (!updateContact) {
      throw RequestError(404, "Not found");
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;
