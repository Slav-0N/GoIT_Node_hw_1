const fs = require("node:fs").promises;
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(process.cwd(), "/db/contacts.json");

async function getListContacts() {
  try {
    const listOfElementsDb = await fs.readFile(contactsPath);
    const json = await JSON.parse(listOfElementsDb);
    return json;
  } catch (err) {
    (err) => console.log(err.message);
  }
}

module.exports = getListContacts;
