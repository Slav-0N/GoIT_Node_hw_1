const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

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
      const list = async () => {
        try {
          const dbList = await listContacts();
          console.table(dbList);
        } catch (err) {
          console.log(err.message);
        }
      };
      list();
      break;

    case "get":
      const getting = async (id) => {
        try {
          const itemWasFind = await getContactById(id);
          if (itemWasFind) {
            console.log(itemWasFind);
          } else {
            console.log(null);
          }
        } catch (err) {
          console.log(err.message);
        }
      };
      getting(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      const rmv = async (id) => {
        try {
          const itemForRemove = await removeContact(id);
          // console.log(itemForRemove);
          if (itemForRemove) {
            console.log(itemForRemove);
          } else {
            console.log(null);
          }
        } catch (error) {}
      };
      rmv(id);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
