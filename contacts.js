const fs = require("node:fs").promises;
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(process.cwd(), "/db/contacts.json");

// console.log(contactsPath);
// console.log(process.argv);

async function listContacts() {
  try {
    const listOfElementsDb = await fs.readFile(contactsPath);
    const json = await JSON.parse(listOfElementsDb);
    console.table(json);
  } catch (err) {
    (err) => console.log(err.message);
  }
}

function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
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
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.

  const dataList = listContacts()
    .then((data) => {
      const itemForRemove = data.find((item, index) => item.id === contactId);
      console.log(itemForRemove);

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
  console.log(newItemObj);
  // ...твій код. Повертає об'єкт доданого контакту.
  const dataList = listContacts()
    .then((data) => {
      data.push(newItemObj);
      console.log(data);
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
