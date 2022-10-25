const contacts = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
