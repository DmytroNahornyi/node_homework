const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      console.table(contacts);
    })
    .catch((error) => {
      console.error(error);
    });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find((c) => c.id === contactId);
      console.log(contact);
    })
    .catch((error) => {
      console.error(error);
    });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const updatedContacts = contacts.filter((c) => c.id !== contactId);
      return fs.writeFile(
        contactsPath,
        JSON.stringify(updatedContacts),
        "utf-8"
      );
    })
    .then(() => {
      console.log("Contact removed successfully :(");
    })
    .catch((error) => {
      console.error(error);
    });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);

      const isDuplicateContact = contacts.some((contact) => {
        return (
          contact.name === name &&
          contact.email === email &&
          contact.phone === phone
        );
      });

      if (isDuplicateContact) {
        console.log("Contact already exists :|");
        return;
      }

      let newContactId = uuidv4();
      while (contacts.some((contact) => contact.id === newContactId)) {
        newContactId = uuidv4();
      }

      const newContact = { id: newContactId, name, email, phone };
      contacts.push(newContact);

      return fs.writeFile(
        contactsPath,
        JSON.stringify(contacts, null, 2),
        "utf-8"
      );
    })
    .then(() => {
      console.log("Contact added successfully :)");
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
