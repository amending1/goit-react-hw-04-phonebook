import { Component } from 'react';
import css from './phonebook.module.css';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const { name, number } = this.state;

    //przekazuję dane do App.jsx (komponentu nadrzędnego)
    this.props.handleSubmit({ name, number });

    //reset state'u komponentu ContactForm
    this.setState({ name: '', number: '' });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value, //name w tym przypadku to atrybut, a nie wartość
    });
  };
  // [event.target.name] - klucz dynamiczny
  //event.target.value pobiera aktualną wartość wprowadzoną przez użytkownika w polu wejściowym

  render() {
    const { name, number } = this.props;

    return (
      <div>
        <form
          className={css['form-container']}
          onSubmit={this.handleFormSubmit}
        >
          <p>Name:</p>
          <label>
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            />
          </label>
          <button className={css['submit-button']} type="submit" method="POST">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
