import React from 'react';
import './ContactForm.css';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  fieldIdName = nanoid();
  fieldIdNumber = nanoid();

  checkContactName = () => {
    const { contacts } = this.props;
    return contacts.some(el => el.name === this.state.name);
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { saveContacts } = this.props;

    if (this.checkContactName()) {
      Notiflix.Notify.failure(`${this.state.name} is already in contacts.`);
      return;
    }

    const obj = {
      name: this.state.name,
      number: this.state.number,
      id: nanoid(),
    };

    saveContacts(obj);

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <>
        <form className="formInput" onSubmit={this.onSubmit}>
          <div className="input">
            <label htmlFor={this.fieldIdName}>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              id={this.fieldIdName}
              onChange={this.onChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </div>
          <div className="input">
            <label htmlFor={this.fieldIdNumber}>Number</label>
            <input
              type="tel"
              name="number"
              value={this.state.number}
              id={this.fieldIdNumber}
              onChange={this.onChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </div>
          <button className="button" type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  saveContacts: PropTypes.func.isRequired,
};
