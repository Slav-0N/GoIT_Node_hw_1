const fs = require("node:fs").promises;
const path = require("node:path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(process.cwd(), "/db/contacts.json");
const getListContacts = require("./services/contactServices");
const { error } = require("node:console");

async function listContacts() {
  try {
    const list = await getListContacts();
    return list;
  } catch (error) {
    (error) => console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contArr = await getListContacts();
    const itemWasFind = contArr.find((item) => item.id === contactId);
    return itemWasFind;
  } catch (err) {
    (err) => console.log(err.message);
  }
}

const writeNewContactToDb = async (path, dataFile) => {
  try {
    const stringData = JSON.stringify(dataFile);
    await fs.writeFile(path, stringData);
  } catch (err) {
    (err) => console.log(err.message);
  }
};

async function removeContact(contactId) {
  try {
    const dataList = await getListContacts();
    const itemForRemove = dataList.find((item) => item.id === contactId);

    const newDb = dataList.filter((item) => item.id !== contactId);

    writeNewContactToDb(contactsPath, newDb);
    return itemForRemove;
  } catch (error) {
    (err) => console.log(err.message);
  }
}

const addContact = (name, email, phone) => {
  const idd = nanoid();
  const newItemObj = {
    id: idd,
    name: name,
    email: email,
    phone: phone,
  };
  const dataList = getListContacts()
    .then((data) => {
      data.push(newItemObj);
      writeNewContactToDb(contactsPath, data);
      console.log(newItemObj);
    })
    .catch((err) => console.log(err.message));
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
