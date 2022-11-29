const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const getFavorite = favorite !== undefined ? { owner, favorite } : { owner };
  const allContacts = await Contact.find(
    getFavorite,
    "name email phone favorite",
    { skip, limit: 10 }
  );
  res.json(allContacts);
};

module.exports = getAllContacts;
