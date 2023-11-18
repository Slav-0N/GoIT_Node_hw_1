const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

// listContacts();
// getContactById("e6ywwRe4jcqxXfCZOj_1e");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type action>", "choose action")
  .option("-i, --id <type id>", "user id")
  .option("-n, --name <type name>", "user name")
  .option("-e, --email <type email>", "user email")
  .option("-p, --phone <type phone>", "user phone");

program.parse();
const argv = program.opts();

// TODO: рефакторити
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      // ... name email phone
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
