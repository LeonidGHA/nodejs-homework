const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const deleteContact = require("./deleteCotact");
const postContact = require("./postContact");
const putContact = require("./putContact");
const updateContactById = require("./updateContactById");

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact,
  updateContactById,
};
