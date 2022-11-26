const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const putContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  console.log(owner._id);
  const changedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
  if (!changedContact) {
    throw RequestError(404, "Not found");
  }
  res.json(changedContact);
};

module.exports = putContact;
