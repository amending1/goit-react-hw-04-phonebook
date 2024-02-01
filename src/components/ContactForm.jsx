import { useState } from 'react';
import css from './phonebook.module.css';
import PropTypes from 'prop-types';

function ContactForm({ handleSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleFormSubmit = event => {
    event.preventDefault();

    //przekazuję dane do App.jsx (komponentu nadrzędnego)
    handleSubmit({ name, number });

    //reset state'u komponentu ContactForm
    setName('');
    setNumber('');
  };

  const handleChange = event => {
    //destrukturyzuję właściwości obiektu event.target, aby uzyskać dostęp do name (nazwa pola) oraz value (wartość wprowadzona przez użytkownika w polu formularza), które są przesyłane przez zdarzenie onChange
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  return (
    <div>
      <form className={css['form-container']} onSubmit={handleFormSubmit}>
        <p>Name:</p>
        <label>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
          />
        </label>
        <p>Number:</p>
        <label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
          />
        </label>
        <button className={css['submit-button']} type="submit" method="POST">
          Add contact
        </button>
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
