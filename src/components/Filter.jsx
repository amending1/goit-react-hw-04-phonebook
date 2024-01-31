import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <p>Find contacts by name:</p>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
      ></input>
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired
};

export default Filter;
