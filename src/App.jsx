import React, { useState, useEffect } from "react";
import "./App.css";
import ContactForm from "./Components/ContactForm/ContactForm";
import ContactList from "./Components/ContactList/ContactList";
import Filter from "./Components/Filter/Filter";
import { nanoid } from "nanoid";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleForm = (name, number) => {
    const findContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (findContact) {
      return alert(`${name} is already in contacts.`);
    }
    setContacts([{ name, number, id: nanoid() }, ...contacts]);
  };
  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  const filterContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = (id) => {
    const validContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(validContacts);
  };

  return (
    <div className="phonebook">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleForm} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={filterContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
