import './ContactList.css';
import PropTypes from 'prop-types';

export function ContactList({ filterMass, filterContacts }) {
  const onClickFunc = e => {
    filterContacts(e.target.closest('li').dataset.id);
  };

  return (
    <ul className="list">
      {filterMass.map(({ name, id, number }) => (
        <li key={id} data-id={id}>
          <span className="name">{name}:</span> <span>{number}</span>
          <button className="buttonList" type="button" onClick={onClickFunc}>
            delete
          </button>
        </li>
      ))}
      {!filterMass[0] && <li>Not found!</li>}
    </ul>
  );
}

ContactList.propTypes = {
  filterMass: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filterContacts: PropTypes.func.isRequired,
};
