const fs = require("node:fs").promises;
const path = require("node:path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(process.cwd(), "/db/contacts.json");
const getListContacts = require("./services/contactServices");
const { error } = require("node:console");

async function listContacts() {
  try {
    const list = await getListContacts().then((data) => console.table(data));
  } catch (error) {
    (error) => console.log(error.message);
  }
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contArr = JSON.parse(data);
      const itemWasFind = contArr.find((item) => item.id === contactId);
      if (itemWasFind) {
        console.log(itemWasFind);
      } else {
        console.log(null);
      }
    })
    .catch((err) => console.log(err.message));
}

const writeNewContactToDb = async (path, dataFile) => {
  try {
    const stringData = JSON.stringify(dataFile);
    await fs.writeFile(path, stringData);
  } catch (err) {
    (err) => console.log(err.message);
  }
};

function removeContact(contactId) {
  const dataList = getListContacts()
    .then((data) => {
      const itemForRemove = data.find((item, index) => item.id === contactId);
      if (itemForRemove) {
        console.log(itemForRemove);
      } else {
        console.log(null);
      }

      const newDb = data.filter((item) => item.id !== contactId);
      writeNewContactToDb(contactsPath, newDb);

      return;
    })

    .catch((err) => console.log(err.message));
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
      return dataList;
    })
    .catch((err) => console.log(err.message));
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
