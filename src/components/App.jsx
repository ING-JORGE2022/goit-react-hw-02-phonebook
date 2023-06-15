import React from 'react';


import { Title } from './Title/Title';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  filter = () => {
    return this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  filterState = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  saveContacts = obj => {
    this.setState({
      contacts: [obj, ...this.state.contacts],
    });
  };

  filterContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  render() {
    const filterMass = this.filter();

    return (
      <div className="form">
        <Title text="Phonebook" />
        <ContactForm
          contacts={this.state.contacts}
          saveContacts={this.saveContacts}
        />

        {this.state.contacts[0] && (
          <>
            <Title text="Contacts" />
            <Filter filter={this.state.filter} filterState={this.filterState} />

            <ContactList
              filterMass={filterMass}
              filterContacts={this.filterContacts}
            />
          </>
        )}
      </div>
    );
  }
}
