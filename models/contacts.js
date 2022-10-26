const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const changeContactsList = async (newCotactsList) =>
  await fs.writeFile(contactsPath, JSON.stringify(newCotactsList));

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (err) {
    console.error(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((el) => el.id === contactId);
    return result;
  } catch (err) {
    console.error(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((el) => el.id === contactId);
    console.log(index);
    if (index === -1) {
      return null;
    }
    const [delContact] = contacts.splice(index, 1);
    await changeContactsList(contacts);
    return delContact;
  } catch (err) {
    console.error(err.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(2),
      ...body,
    };

    const newCotactsList = [...contacts, newContact];
    await changeContactsList(newCotactsList);
    return newContact;
  } catch (err) {
    console.error(err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((el) => el.id === contactId);
    if (index === -1) {
      return null;
    }
    console.log(body);
    contacts[index] = { id: contactId, ...body };
    await changeContactsList(contacts);
    return contacts[index];
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
