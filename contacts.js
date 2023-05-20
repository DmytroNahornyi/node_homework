const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

/**
 * Возвращает список контактов из файла contacts.json
 */
function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

/**
 * Возвращает контакт по указанному идентификатору из файла contacts.json
 * @param {number} contactId - Идентификатор контакта
 */
function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    console.log(contact);
  });
}

/**
 * Удаляет контакт по указанному идентификатору из файла contacts.json
 * @param {number} contactId - Идентификатор контакта
 */
function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter((c) => c.id !== contactId);

    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts),
      "utf-8",
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Contact removed successfully :(");
      }
    );
  });
}

/**
 * Добавляет новый контакт в файл contacts.json
 * @param {string} name - Имя контакта
 * @param {string} email - Email контакта
 * @param {string} phone - Телефон контакта
 */
function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);

    // Проверяем наличие контакта с такими же свойствами
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

    fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8",
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Contact added successfully :)");
      }
    );
  });
}


module.exports = { listContacts, getContactById, removeContact, addContact };
