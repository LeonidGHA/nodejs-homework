const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await Contact.find({}, "name email phone favorite");
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
