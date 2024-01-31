import React from 'react';
import ContactItem from './ContactItem.jsx';
import css from './phonebook.module.css';
import PropTypes from 'prop-types'; 

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <div className={css['list-item']}><ContactItem key={contact.id} name={contact.name} number={contact.number} />
        <button className={css['delete-button']} onClick={ () => onDeleteContact(contact.id)}>Delete</button></div>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
  })).isRequired,
  onDeleteContact: PropTypes.func.isRequired
};

export default ContactList;