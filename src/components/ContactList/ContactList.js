import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./ContactList.module.css";

const ContactList = ({ contacts, onRemoveContact }) => (
  <TransitionGroup component="ul" className={styles.TaskList}>
    {contacts.map((contact) => (
      <CSSTransition timeout={200} classNames={styles} key={contact.id}>
        <li className={styles.TaskList_item}>
          {contact.name + ":" + contact.number}
          {
            <button
              className={styles.TaskList_button}
              type="button"
              name="delte"
              onClick={() => onRemoveContact(contact.id)}
            >
              delete
            </button>
          }
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.propTypes = {
  onRemoveContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
export default ContactList;
