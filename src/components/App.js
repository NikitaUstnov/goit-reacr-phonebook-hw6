import React, { Component } from "react";

import store from "../redux/store";
import { addContact, testActionCreater } from "../redux/actions";
import { v4 as uuidv4 } from "uuid";
import styles from "./App.module.css";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import ContactForm from "./ContactForm/ContactForm";
import { CSSTransition } from "react-transition-group";
import Title from "./Title/Title";
import Alert from "./Alert/Alert";
// dispatch -доставляет action до reducer
// store.dispatch(testActionCreater(1));

// store.dispatch(addContact);
export default class App extends Component {
  state = {
    // contacts: [],
    // filter: "",
    error: false,
  };

  addContact = (task) => {
    const searchSameName = this.state.contacts
      .map((cont) => cont.name)
      .includes(task.name);

    if (searchSameName) {
      this.setState(() => ({
        error: true,
      }));

      setTimeout(
        () =>
          this.setState((prevStete) => ({
            error: (this.setState.error = !prevStete),
          })),
        3000
      );
    }
    // else if (task.name.length === 0) {
    //   alert("Fields must be filled!");
    // }
    else {
      const contacts = {
        ...task,
        id: uuidv4(),
      };

      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contacts],
      }));
    }
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter, contacts, error } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={styles.container}>
        {error ? <Alert title="Already exist" /> : <></>}

        <Title title="Phonebook" />

        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <CSSTransition
          in={contacts.length >= 1}
          classNames={styles}
          timeout={250}
          unmountOnExit
        >
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        </CSSTransition>
        <CSSTransition
          in={visibleContacts.length > 0}
          classNames={styles}
          timeout={250}
          unmountOnExit
        >
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        </CSSTransition>
      </div>
    );
  }
}
