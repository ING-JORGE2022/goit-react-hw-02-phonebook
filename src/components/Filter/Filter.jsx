import './Filter.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export function Filter({ filter, filterState }) {
  const onChange = e => {
    const { name, value } = e.target;
    filterState(name, value);
  };

  const fieldIdFilter = nanoid();

  return (
    <>
      <label className="leb" htmlFor={fieldIdFilter}>
        Find contacts by name
      </label>
      <input
        className="filter"
        type="text"
        name="filter"
        value={filter}
        id={fieldIdFilter}
        onChange={onChange}
      />
    </>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  filterState: PropTypes.func.isRequired,
};
