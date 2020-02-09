import React from 'react';
import PropTypes from 'prop-types';

const Pin = ({ pin }) => {
  return (
    <div>
      <p>{pin.name}</p>
    </div>
  );
};

Pin.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Pin;
